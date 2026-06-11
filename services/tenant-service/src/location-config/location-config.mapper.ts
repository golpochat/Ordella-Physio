import type { LocationConfig } from "@/generated/prisma";
import type {
  LocationConfigNamespace,
  LocationConfigRecord,
  LocationConfigNamespaceSummary,
} from "@/models/LocationConfig";
import { DEFAULT_LOCATION_CONFIGS } from "@/models/LocationConfig";

export function toLocationConfigResponse(
  namespace: LocationConfigNamespace,
  config: LocationConfig | null,
): LocationConfigRecord {
  if (!config) {
    return {
      namespace,
      data: DEFAULT_LOCATION_CONFIGS[namespace],
      updatedAt: null,
      updatedByUserId: null,
      isDefault: true,
    };
  }

  return {
    namespace,
    data: config.data as LocationConfigRecord["data"],
    updatedAt: config.updatedAt.toISOString(),
    updatedByUserId: config.updatedByUserId,
    isDefault: false,
  };
}

export function toLocationConfigNamespaceSummary(
  namespace: LocationConfigNamespace,
  config: LocationConfig | null,
): LocationConfigNamespaceSummary {
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
