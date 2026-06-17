import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import type { OrganizationSsoConfig } from "@/generated/prisma";
import type { UpsertOrganizationSsoConfigInput } from "@ordella/validation";
import { SSO_AUDIT_EVENTS, SSO_BLOCKED_ROLES, SSO_METADATA_MAX_AGE_MS } from "@ordella/shared";
import { AuditLogClient } from "@/integrations/audit-log.client";
import { OrganizationSsoRepository } from "@/repositories/organization-sso.repository";
import { decryptSsoSecret, encryptSsoSecret, maskSsoSecret } from "@/utils/sso-crypto";
import {
  fetchSamlMetadata,
  parseAndValidateSamlMetadata,
  validateX509Certificate,
} from "@/utils/sso-metadata.validator";

const ALLOWED_MAPPED_ROLES = new Set([
  "OWNER",
  "TENANT_OWNER",
  "ADMIN",
  "THERAPIST",
  "STAFF",
  "BILLING_ADMIN",
  "READ_ONLY",
  "ORG_ADMIN",
  "ORG_BILLING_ADMIN",
  "PATIENT",
  "PHARMACY",
]);

@Injectable()
export class OrganizationSsoService {
  constructor(
    private readonly repository: OrganizationSsoRepository,
    private readonly auditLogClient: AuditLogClient,
  ) {}

  async getConfigForOrganization(organizationId: string, options?: { includeSecrets?: boolean }) {
    const config = await this.repository.findByOrganizationId(organizationId);
    if (!config) {
      return null;
    }

    return this.toResponse(config, options?.includeSecrets ?? false);
  }

  async getConfigForTenant(tenantId: string, options?: { includeSecrets?: boolean }) {
    const organizationId = await this.repository.findOrganizationIdByTenantId(tenantId);
    if (!organizationId) {
      throw new NotFoundException("Organization not found for tenant.");
    }

    return this.getConfigForOrganization(organizationId, options);
  }

  async getInternalConfigForTenant(tenantId: string) {
    const organizationId = await this.repository.findOrganizationIdByTenantId(tenantId);
    if (!organizationId) {
      throw new NotFoundException("Organization not found for tenant.");
    }

    const config = await this.repository.findByOrganizationId(organizationId);
    if (!config) {
      throw new NotFoundException("SSO is not configured for this organization.");
    }

    return this.toInternalResponse(config, organizationId);
  }

  async upsertConfig(
    organizationId: string,
    input: UpsertOrganizationSsoConfigInput,
    actor?: { userId?: string; ipAddress?: string },
  ) {
    this.validateRoleMappings(input.roleMappings);

    const existing = await this.repository.findByOrganizationId(organizationId);
    const merged = this.mergeInput(existing, input);

    if (merged.ssoEnabled) {
      await this.validateAndHydrateMetadata(merged, existing);
    }

    const saved = await this.repository.upsert({
      organizationId,
      ssoEnabled: merged.ssoEnabled,
      ssoProtocol: merged.ssoProtocol,
      ssoMetadataUrl: merged.ssoMetadataUrl,
      ssoEntityId: merged.ssoEntityId,
      ssoAcsUrl: merged.ssoAcsUrl,
      ssoCertificate: merged.ssoCertificate,
      ssoClientId: merged.ssoClientId,
      ssoClientSecret: merged.ssoClientSecret,
      ssoIssuer: merged.ssoIssuer,
      ssoRedirectUri: merged.ssoRedirectUri,
      ssoLogoutUrl: merged.ssoLogoutUrl,
      ssoJwksUrl: merged.ssoJwksUrl,
      roleMappings: merged.roleMappings,
      previousCertificates: merged.previousCertificates,
      metadataCache: merged.metadataCache,
      metadataFetchedAt: merged.metadataFetchedAt,
      metadataValidatedAt: merged.metadataValidatedAt,
      allowSelfSignedCerts: merged.allowSelfSignedCerts,
    });

    void this.auditLogClient.logAction({
      tenantId: organizationId,
      actorUserId: actor?.userId ?? "system",
      entityType: "ORGANIZATION_SSO",
      entityId: organizationId,
      action: input.roleMappings
        ? SSO_AUDIT_EVENTS.ROLE_MAPPING_CHANGE
        : SSO_AUDIT_EVENTS.CONFIG_UPDATE,
      metadata: {
        organizationId,
        protocol: saved.ssoProtocol,
        ssoEnabled: saved.ssoEnabled,
        ipAddress: actor?.ipAddress ?? null,
        timestamp: new Date().toISOString(),
      },
    });

    return this.toResponse(saved, false);
  }

  async refreshMetadata(organizationId: string, actor?: { userId?: string; ipAddress?: string }) {
    const existing = await this.repository.findByOrganizationId(organizationId);
    if (!existing?.ssoMetadataUrl) {
      throw new BadRequestException("ssoMetadataUrl is not configured.");
    }

    const merged = { ...existing, ssoEnabled: true };
    await this.validateAndHydrateMetadata(merged, existing, true);

    const saved = await this.repository.upsert({
      organizationId,
      ssoMetadataUrl: merged.ssoMetadataUrl,
      ssoEntityId: merged.ssoEntityId,
      ssoAcsUrl: merged.ssoAcsUrl,
      ssoCertificate: merged.ssoCertificate,
      ssoLogoutUrl: merged.ssoLogoutUrl,
      previousCertificates: merged.previousCertificates,
      metadataCache: merged.metadataCache,
      metadataFetchedAt: merged.metadataFetchedAt,
      metadataValidatedAt: merged.metadataValidatedAt,
    });

    void this.auditLogClient.logAction({
      tenantId: organizationId,
      actorUserId: actor?.userId ?? "system",
      entityType: "ORGANIZATION_SSO",
      entityId: organizationId,
      action: SSO_AUDIT_EVENTS.METADATA_UPDATE,
      metadata: {
        organizationId,
        protocol: saved.ssoProtocol,
        ipAddress: actor?.ipAddress ?? null,
        timestamp: new Date().toISOString(),
      },
    });

    return this.toResponse(saved, false);
  }

  private validateRoleMappings(roleMappings?: Record<string, string>) {
    if (!roleMappings) {
      return;
    }

    for (const role of Object.values(roleMappings)) {
      if (SSO_BLOCKED_ROLES.includes(role as (typeof SSO_BLOCKED_ROLES)[number])) {
        throw new BadRequestException(`Role ${role} cannot be assigned via SSO mapping.`);
      }

      if (!ALLOWED_MAPPED_ROLES.has(role)) {
        throw new BadRequestException(`Mapped role ${role} does not exist.`);
      }
    }
  }

  private mergeInput(
    existing: OrganizationSsoConfig | null,
    input: UpsertOrganizationSsoConfigInput,
  ) {
    const certificate =
      input.ssoCertificate !== undefined
        ? input.ssoCertificate
          ? encryptSsoSecret(input.ssoCertificate)
          : null
        : (existing?.ssoCertificate ?? null);

    const clientSecret =
      input.ssoClientSecret !== undefined
        ? input.ssoClientSecret
          ? encryptSsoSecret(input.ssoClientSecret)
          : null
        : (existing?.ssoClientSecret ?? null);

    if (input.ssoCertificate) {
      validateX509Certificate(input.ssoCertificate, {
        allowSelfSigned: input.allowSelfSignedCerts ?? existing?.allowSelfSignedCerts ?? false,
      });
    }

    return {
      ssoEnabled: input.ssoEnabled ?? existing?.ssoEnabled ?? false,
      ssoProtocol: input.ssoProtocol ?? existing?.ssoProtocol ?? null,
      ssoMetadataUrl: input.ssoMetadataUrl ?? existing?.ssoMetadataUrl ?? null,
      ssoEntityId: input.ssoEntityId ?? existing?.ssoEntityId ?? null,
      ssoAcsUrl: input.ssoAcsUrl ?? existing?.ssoAcsUrl ?? null,
      ssoCertificate: certificate,
      ssoClientId: input.ssoClientId ?? existing?.ssoClientId ?? null,
      ssoClientSecret: clientSecret,
      ssoIssuer: input.ssoIssuer ?? existing?.ssoIssuer ?? null,
      ssoRedirectUri: input.ssoRedirectUri ?? existing?.ssoRedirectUri ?? null,
      ssoLogoutUrl: input.ssoLogoutUrl ?? existing?.ssoLogoutUrl ?? null,
      ssoJwksUrl: input.ssoJwksUrl ?? existing?.ssoJwksUrl ?? null,
      roleMappings: input.roleMappings ?? (existing?.roleMappings as Record<string, string> | null),
      previousCertificates: existing?.previousCertificates ?? null,
      metadataCache: existing?.metadataCache ?? null,
      metadataFetchedAt: existing?.metadataFetchedAt ?? null,
      metadataValidatedAt: existing?.metadataValidatedAt ?? null,
      allowSelfSignedCerts:
        input.allowSelfSignedCerts ?? existing?.allowSelfSignedCerts ?? false,
    };
  }

  private async validateAndHydrateMetadata(
    merged: {
      ssoMetadataUrl?: string | null;
      ssoEntityId?: string | null;
      ssoAcsUrl?: string | null;
      ssoCertificate?: string | null;
      ssoLogoutUrl?: string | null;
      ssoProtocol?: string | null;
      allowSelfSignedCerts?: boolean;
      previousCertificates?: unknown;
      metadataCache?: unknown;
      metadataFetchedAt?: Date | null;
      metadataValidatedAt?: Date | null;
    },
    existing: OrganizationSsoConfig | null,
    force = false,
  ) {
    if (!merged.ssoMetadataUrl) {
      if (merged.ssoProtocol === "SAML" && !merged.ssoCertificate) {
        throw new BadRequestException("SAML requires metadata URL or certificate.");
      }
      return;
    }

    const fetchedAt = existing?.metadataFetchedAt?.getTime() ?? 0;
    const cacheFresh = Date.now() - fetchedAt < SSO_METADATA_MAX_AGE_MS;
    if (!force && cacheFresh && existing?.metadataValidatedAt) {
      return;
    }

    const metadataXml = await fetchSamlMetadata(merged.ssoMetadataUrl);
    const parsed = parseAndValidateSamlMetadata({
      metadataXml,
      expectedEntityId: merged.ssoEntityId ?? undefined,
      expectedAcsUrl: merged.ssoAcsUrl ?? undefined,
      allowSelfSignedCerts: merged.allowSelfSignedCerts,
    });

    const previousCertificates = Array.isArray(existing?.previousCertificates)
      ? [...(existing?.previousCertificates as string[])]
      : [];

    if (existing?.ssoCertificate && existing.ssoCertificate !== encryptSsoSecret(parsed.certificate!)) {
      previousCertificates.push(existing.ssoCertificate);
      void this.auditLogClient.logAction({
        tenantId: existing.organizationId,
        actorUserId: "system",
        entityType: "ORGANIZATION_SSO",
        entityId: existing.organizationId,
        action: SSO_AUDIT_EVENTS.CERTIFICATE_ROTATION,
        metadata: {
          organizationId: existing.organizationId,
          timestamp: new Date().toISOString(),
        },
      });
    }

    merged.ssoEntityId = merged.ssoEntityId ?? parsed.entityId;
    merged.ssoAcsUrl = merged.ssoAcsUrl ?? parsed.acsUrl;
    merged.ssoLogoutUrl = merged.ssoLogoutUrl ?? parsed.logoutUrl;
    merged.ssoCertificate = encryptSsoSecret(parsed.certificate!);
    merged.previousCertificates = previousCertificates.slice(-5);
    merged.metadataCache = { entityId: parsed.entityId, acsUrl: parsed.acsUrl };
    merged.metadataFetchedAt = new Date();
    merged.metadataValidatedAt = new Date();
  }

  private toResponse(config: OrganizationSsoConfig, includeSecrets: boolean) {
    return {
      organizationId: config.organizationId,
      ssoEnabled: config.ssoEnabled,
      ssoProtocol: config.ssoProtocol,
      ssoMetadataUrl: config.ssoMetadataUrl,
      ssoEntityId: config.ssoEntityId,
      ssoAcsUrl: config.ssoAcsUrl,
      ssoCertificate: includeSecrets ? this.tryDecrypt(config.ssoCertificate) : maskSsoSecret("set"),
      ssoClientId: config.ssoClientId,
      ssoClientSecret: includeSecrets
        ? this.tryDecrypt(config.ssoClientSecret)
        : maskSsoSecret(config.ssoClientSecret),
      ssoIssuer: config.ssoIssuer,
      ssoRedirectUri: config.ssoRedirectUri,
      ssoLogoutUrl: config.ssoLogoutUrl,
      ssoJwksUrl: config.ssoJwksUrl,
      roleMappings: config.roleMappings,
      metadataValidatedAt: config.metadataValidatedAt?.toISOString() ?? null,
      metadataFetchedAt: config.metadataFetchedAt?.toISOString() ?? null,
      allowSelfSignedCerts: config.allowSelfSignedCerts,
      updatedAt: config.updatedAt.toISOString(),
    };
  }

  private toInternalResponse(config: OrganizationSsoConfig, organizationId: string) {
    const previousCertificates = Array.isArray(config.previousCertificates)
      ? (config.previousCertificates as string[]).map((entry) => this.tryDecrypt(entry))
      : [];

    return {
      organizationId,
      tenantScoped: true,
      ssoEnabled: config.ssoEnabled,
      ssoProtocol: config.ssoProtocol,
      ssoMetadataUrl: config.ssoMetadataUrl,
      ssoEntityId: config.ssoEntityId,
      ssoAcsUrl: config.ssoAcsUrl,
      ssoCertificate: this.tryDecrypt(config.ssoCertificate),
      previousCertificates,
      ssoClientId: config.ssoClientId,
      ssoClientSecret: this.tryDecrypt(config.ssoClientSecret),
      ssoIssuer: config.ssoIssuer,
      ssoRedirectUri: config.ssoRedirectUri,
      ssoLogoutUrl: config.ssoLogoutUrl,
      ssoJwksUrl: config.ssoJwksUrl,
      roleMappings: (config.roleMappings as Record<string, string> | null) ?? {},
      metadataFetchedAt: config.metadataFetchedAt,
      metadataValidatedAt: config.metadataValidatedAt,
      allowSelfSignedCerts: config.allowSelfSignedCerts,
    };
  }

  private tryDecrypt(value: string | null | undefined): string | null {
    if (!value) {
      return null;
    }

    try {
      return decryptSsoSecret(value);
    } catch {
      return value;
    }
  }
}
