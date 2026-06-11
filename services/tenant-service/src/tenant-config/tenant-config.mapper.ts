import type { TenantConfig } from "@/generated/prisma";
import type {
  TenantConfigNamespace,
  TenantConfigRecord,
  TenantConfigNamespaceSummary,
} from "@/models/TenantConfig";
import { DEFAULT_TENANT_CONFIGS } from "@/models/TenantConfig";

export function toTenantConfigResponse(
  namespace: TenantConfigNamespace,
  config: TenantConfig | null,
): TenantConfigRecord {
  if (!config) {
    return {
      namespace,
      data: DEFAULT_TENANT_CONFIGS[namespace],
      updatedAt: null,
      updatedByUserId: null,
      isDefault: true,
    };
  }

  return {
    namespace,
    data: config.data as TenantConfigRecord["data"],
    updatedAt: config.updatedAt.toISOString(),
    updatedByUserId: config.updatedByUserId,
    isDefault: false,
  };
}

export function toTenantConfigNamespaceSummary(
  namespace: TenantConfigNamespace,
  config: TenantConfig | null,
): TenantConfigNamespaceSummary {
  if (!config) {
    return {
      namespace,
      updatedAt: null,
      isDefault: true,
    };
  }

  return {
    namespace,
    updatedAt: config.updatedAt.toISOString(),
    isDefault: false,
  };
}
