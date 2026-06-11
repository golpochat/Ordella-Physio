import type { OrganizationConfig } from "@/generated/prisma";
import type {
  OrganizationConfigNamespace,
  OrganizationConfigNamespaceSummary,
  OrganizationConfigRecord,
} from "@/models/OrganizationConfig";
import { DEFAULT_ORGANIZATION_CONFIGS } from "@/models/OrganizationConfig";

export function toOrganizationConfigResponse(
  namespace: OrganizationConfigNamespace,
  config: OrganizationConfig | null,
): OrganizationConfigRecord {
  if (!config) {
    return {
      namespace,
      data: DEFAULT_ORGANIZATION_CONFIGS[namespace],
      updatedAt: null,
      updatedByUserId: null,
      isDefault: true,
    };
  }

  return {
    namespace,
    data: config.data as OrganizationConfigRecord["data"],
    updatedAt: config.updatedAt.toISOString(),
    updatedByUserId: config.updatedByUserId,
    isDefault: false,
  };
}

export function toOrganizationConfigNamespaceSummary(
  namespace: OrganizationConfigNamespace,
  config: OrganizationConfig | null,
): OrganizationConfigNamespaceSummary {
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
