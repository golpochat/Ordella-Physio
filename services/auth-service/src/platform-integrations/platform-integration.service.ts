import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { encrypt, decrypt } from "@ordella/security";
import type { Prisma } from "@/generated/prisma";
import { AuditService } from "@/services/audit.service";
import { PlatformIntegrationRepository } from "@/platform-integrations/platform-integration.repository";
import { probeAddressLookupVendor } from "@/platform-integrations/address-lookup-vendor-probe";
import {
  ADDRESS_LOOKUP_VENDORS,
  type AddressLookupConnectionTestInput,
  type AddressLookupConnectionTestResult,
  type AddressLookupCredentials,
  type AddressLookupRuntimeConfig,
  type AddressLookupVendor,
  type CreateAddressLookupIntegrationInput,
  type PlatformIntegrationPublic,
  type UpdateAddressLookupIntegrationInput,
} from "@/platform-integrations/platform-integration.types";

function runtimeEnv(name: string): string {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

function lastFour(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.length < 4) {
    return null;
  }
  return trimmed.slice(-4);
}

function parseVendor(value: string): AddressLookupVendor {
  const normalized = value.trim().toLowerCase();
  if ((ADDRESS_LOOKUP_VENDORS as readonly string[]).includes(normalized)) {
    return normalized as AddressLookupVendor;
  }

  throw new BadRequestException(`Unsupported address lookup vendor: ${value}`);
}

function normalizeMetadata(value: Prisma.JsonValue | null | undefined): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

@Injectable()
export class PlatformIntegrationService {
  constructor(
    private readonly repository: PlatformIntegrationRepository,
    private readonly auditService: AuditService,
  ) {}

  private getEncryptionKey(): string {
    const key =
      runtimeEnv("PLATFORM_SECRETS_ENCRYPTION_KEY") ||
      runtimeEnv("MFA_ENCRYPTION_KEY") ||
      runtimeEnv("JWT_SECRET");

    if (!key || key.length < 32) {
      throw new UnprocessableEntityException(
        "PLATFORM_SECRETS_ENCRYPTION_KEY (min 32 chars) is required to store integration credentials.",
      );
    }

    return key;
  }

  private encryptCredentials(credentials: AddressLookupCredentials): string {
    return encrypt(JSON.stringify(credentials), this.getEncryptionKey());
  }

  private decryptCredentials(payload: string): AddressLookupCredentials {
    const parsed = JSON.parse(decrypt(payload, this.getEncryptionKey())) as AddressLookupCredentials;
    if (!parsed?.apiKey?.trim()) {
      throw new UnprocessableEntityException("Stored integration credentials are invalid.");
    }

    return { apiKey: parsed.apiKey.trim() };
  }

  private toPublic(
    row: {
      id: string;
      vendor: string;
      label: string;
      apiKeyLast4: string | null;
      metadata: Prisma.JsonValue;
      createdAt: Date;
      updatedAt: Date;
      updatedByUserId: string | null;
    },
    activeId: string | null,
  ): PlatformIntegrationPublic {
    return {
      id: row.id,
      category: "ADDRESS_LOOKUP",
      vendor: parseVendor(row.vendor),
      label: row.label,
      apiKeyLast4: row.apiKeyLast4,
      metadata: normalizeMetadata(row.metadata),
      isActive: row.id === activeId,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      updatedByUserId: row.updatedByUserId,
    };
  }

  async listAddressLookupIntegrations(): Promise<PlatformIntegrationPublic[]> {
    const [rows, runtime] = await Promise.all([
      this.repository.listAddressLookupIntegrations(),
      this.repository.ensureRuntimeState(),
    ]);

    const activeId = runtime.activeAddressLookupIntegrationId;
    return rows.map((row) => this.toPublic(row, activeId));
  }

  async createAddressLookupIntegration(
    input: CreateAddressLookupIntegrationInput,
    actor: { userId: string; ipAddress?: string | null; userAgent?: string | null },
  ): Promise<PlatformIntegrationPublic> {
    const vendor = parseVendor(input.vendor);
    const label = input.label.trim();
    const apiKey = input.apiKey.trim();

    if (!label) {
      throw new BadRequestException("Label is required.");
    }

    if (!apiKey) {
      throw new BadRequestException("API key is required.");
    }

    const row = await this.repository.createAddressLookupIntegration({
      vendor,
      label,
      credentialsEncrypted: this.encryptCredentials({ apiKey }),
      apiKeyLast4: lastFour(apiKey),
      metadata: (input.metadata ?? {}) as Prisma.InputJsonValue,
      updatedByUserId: actor.userId,
    });

    await this.auditService.logEvent({
      userId: actor.userId,
      action: "platform.integration.address_lookup.created",
      ipAddress: actor.ipAddress,
      userAgent: actor.userAgent,
      metadata: { integrationId: row.id, vendor, label },
    });

    const runtime = await this.repository.ensureRuntimeState();
    return this.toPublic(row, runtime.activeAddressLookupIntegrationId);
  }

  async updateAddressLookupIntegration(
    id: string,
    input: UpdateAddressLookupIntegrationInput,
    actor: { userId: string; ipAddress?: string | null; userAgent?: string | null },
  ): Promise<PlatformIntegrationPublic> {
    const existing = await this.repository.findAddressLookupIntegrationById(id);
    if (!existing) {
      throw new NotFoundException("Address lookup integration not found.");
    }

    const label = input.label?.trim();
    if (input.label !== undefined && !label) {
      throw new BadRequestException("Label cannot be empty.");
    }

    const apiKey = input.apiKey?.trim();
    if (input.apiKey !== undefined && !apiKey) {
      throw new BadRequestException("API key cannot be empty.");
    }

    const row = await this.repository.updateAddressLookupIntegration(id, {
      ...(label ? { label } : {}),
      ...(apiKey
        ? {
            credentialsEncrypted: this.encryptCredentials({ apiKey }),
            apiKeyLast4: lastFour(apiKey),
          }
        : {}),
      ...(input.metadata !== undefined
        ? { metadata: input.metadata as Prisma.InputJsonValue }
        : {}),
      updatedByUserId: actor.userId,
    });

    await this.auditService.logEvent({
      userId: actor.userId,
      action: "platform.integration.address_lookup.updated",
      ipAddress: actor.ipAddress,
      userAgent: actor.userAgent,
      metadata: { integrationId: id, vendor: row.vendor },
    });

    const runtime = await this.repository.ensureRuntimeState();
    return this.toPublic(row, runtime.activeAddressLookupIntegrationId);
  }

  async deleteAddressLookupIntegration(
    id: string,
    actor: { userId: string; ipAddress?: string | null; userAgent?: string | null },
  ): Promise<{ deleted: true }> {
    const existing = await this.repository.findAddressLookupIntegrationById(id);
    if (!existing) {
      throw new NotFoundException("Address lookup integration not found.");
    }

    const runtime = await this.repository.ensureRuntimeState();
    if (runtime.activeAddressLookupIntegrationId === id) {
      throw new BadRequestException(
        "Cannot delete the active address lookup integration. Deactivate it first.",
      );
    }

    await this.repository.deleteAddressLookupIntegration(id);

    await this.auditService.logEvent({
      userId: actor.userId,
      action: "platform.integration.address_lookup.deleted",
      ipAddress: actor.ipAddress,
      userAgent: actor.userAgent,
      metadata: { integrationId: id, vendor: existing.vendor, label: existing.label },
    });

    return { deleted: true };
  }

  async setActiveAddressLookupIntegration(
    integrationId: string | null,
    actor: { userId: string; ipAddress?: string | null; userAgent?: string | null },
  ): Promise<{ activeIntegrationId: string | null }> {
    if (integrationId) {
      const existing = await this.repository.findAddressLookupIntegrationById(integrationId);
      if (!existing) {
        throw new NotFoundException("Address lookup integration not found.");
      }
    }

    const runtime = await this.repository.setActiveAddressLookupIntegration(
      integrationId,
      actor.userId,
    );

    await this.auditService.logEvent({
      userId: actor.userId,
      action: integrationId
        ? "platform.integration.address_lookup.activated"
        : "platform.integration.address_lookup.deactivated",
      ipAddress: actor.ipAddress,
      userAgent: actor.userAgent,
      metadata: { integrationId },
    });

    return { activeIntegrationId: runtime.activeAddressLookupIntegrationId };
  }

  async testAddressLookupCredentials(
    input: AddressLookupConnectionTestInput,
    actor: { userId: string; ipAddress?: string | null; userAgent?: string | null },
  ): Promise<AddressLookupConnectionTestResult> {
    const vendor = parseVendor(input.vendor);
    const apiKey = input.apiKey.trim();

    if (!apiKey) {
      throw new BadRequestException("API key is required.");
    }

    const result = await probeAddressLookupVendor(vendor, apiKey);

    await this.auditService.logEvent({
      userId: actor.userId,
      action: "platform.integration.address_lookup.tested",
      ipAddress: actor.ipAddress,
      userAgent: actor.userAgent,
      metadata: { vendor, connected: result.connected, mode: "credentials" },
    });

    return result;
  }

  async testAddressLookupIntegration(
    id: string,
    actor: { userId: string; ipAddress?: string | null; userAgent?: string | null },
  ): Promise<AddressLookupConnectionTestResult> {
    const existing = await this.repository.findAddressLookupIntegrationById(id);
    if (!existing) {
      throw new NotFoundException("Address lookup integration not found.");
    }

    const vendor = parseVendor(existing.vendor);
    const credentials = this.decryptCredentials(existing.credentialsEncrypted);
    const result = await probeAddressLookupVendor(vendor, credentials.apiKey);

    await this.auditService.logEvent({
      userId: actor.userId,
      action: "platform.integration.address_lookup.tested",
      ipAddress: actor.ipAddress,
      userAgent: actor.userAgent,
      metadata: {
        integrationId: id,
        vendor,
        connected: result.connected,
        mode: "profile",
      },
    });

    return result;
  }

  async getAddressLookupRuntimeConfig(): Promise<AddressLookupRuntimeConfig> {
    const runtime = await this.repository.ensureRuntimeState();
    const active = runtime.activeAddressLookupIntegration;

    if (!active) {
      return {
        enabled: false,
        provider: "none",
        integrationId: null,
        apiKey: null,
        metadata: {},
      };
    }

    const credentials = this.decryptCredentials(active.credentialsEncrypted);

    return {
      enabled: true,
      provider: parseVendor(active.vendor),
      integrationId: active.id,
      apiKey: credentials.apiKey,
      metadata: normalizeMetadata(active.metadata),
    };
  }
}
