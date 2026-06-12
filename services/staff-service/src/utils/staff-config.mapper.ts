import type { StaffConfig } from "@/generated/prisma";
import type {
  StaffConfigNamespace,
  StaffConfigNamespaceSummary,
  StaffConfigRecord,
} from "@/models/StaffConfig";
import { DEFAULT_STAFF_CONFIGS } from "@/models/StaffConfig";

export function toStaffConfigResponse(
  namespace: StaffConfigNamespace,
  config: StaffConfig | null,
): StaffConfigRecord {
  if (!config) {
    return {
      namespace,
      data: DEFAULT_STAFF_CONFIGS[namespace],
      updatedAt: null,
      updatedByUserId: null,
      isDefault: true,
    };
  }

  return {
    namespace,
    data: config.data as StaffConfigRecord["data"],
    updatedAt: config.updatedAt.toISOString(),
    updatedByUserId: config.updatedByUserId,
    isDefault: false,
  };
}

export function toStaffConfigNamespaceSummary(
  namespace: StaffConfigNamespace,
  config: StaffConfig | null,
): StaffConfigNamespaceSummary {
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
