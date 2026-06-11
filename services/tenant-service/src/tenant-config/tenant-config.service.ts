import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type { TenantConfigNamespace } from "@/models/TenantConfig";
import { TENANT_CONFIG_NAMESPACES } from "@/models/TenantConfig";
import { TenantsRepository } from "@/tenants/tenants.repository";
import { TenantConfigRepository } from "@/tenant-config/tenant-config.repository";
import {
  toTenantConfigNamespaceSummary,
  toTenantConfigResponse,
} from "@/tenant-config/tenant-config.mapper";
import {
  isTenantConfigNamespace,
  normalizeConfigData,
  validateConfig,
} from "@/validators/tenant-config.validator";
import {
  invalidNamespaceError,
  tenantNotFoundError,
  tenantValidationError,
} from "@/utils/tenant-errors";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

@Injectable()
export class TenantConfigService {
  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly tenantConfigRepository: TenantConfigRepository,
  ) {}

  private assertNamespace(namespace: string): TenantConfigNamespace {
    if (!isTenantConfigNamespace(namespace)) {
      throw invalidNamespaceError();
    }

    return namespace;
  }

  async listNamespaces(tenantId: string) {
    const tenant = await this.tenantsRepository.findById(tenantId);
    if (!tenant) {
      throw tenantNotFoundError();
    }

    const stored = await this.tenantConfigRepository.findAllByTenantId(tenantId);
    const storedByNamespace = new Map(stored.map((entry) => [entry.namespace, entry]));

    return {
      namespaces: TENANT_CONFIG_NAMESPACES.map((namespace) =>
        toTenantConfigNamespaceSummary(namespace, storedByNamespace.get(namespace) ?? null),
      ),
    };
  }

  async getConfig(tenantId: string, namespaceInput: string) {
    const namespace = this.assertNamespace(namespaceInput);

    const tenant = await this.tenantsRepository.findById(tenantId);
    if (!tenant) {
      throw tenantNotFoundError();
    }

    const config = await this.tenantConfigRepository.findByTenantAndNamespace(tenantId, namespace);
    return toTenantConfigResponse(namespace, config);
  }

  async updateConfig(
    tenantId: string,
    namespaceInput: string,
    data: unknown,
    updatedByUser?: AuthenticatedTenantUser,
  ) {
    const namespace = this.assertNamespace(namespaceInput);

    const tenant = await this.tenantsRepository.findById(tenantId);
    if (!tenant) {
      throw tenantNotFoundError();
    }

    const validationErrors = validateConfig(namespace, data);
    if (validationErrors.length > 0) {
      throw tenantValidationError(validationErrors);
    }

    const normalized = normalizeConfigData(namespace, data as Record<string, unknown>);

    const updated = await this.tenantConfigRepository.upsert(
      tenantId,
      namespace,
      normalized as Prisma.InputJsonValue,
      updatedByUser?.userId,
    );

    return {
      config: toTenantConfigResponse(namespace, updated),
      message: "Configuration updated successfully.",
    };
  }
}
