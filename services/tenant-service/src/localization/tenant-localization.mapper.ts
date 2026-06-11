import type { TenantLocalization } from "@/generated/prisma";
import type { TenantLocalizationRecord } from "@/models/TenantLocalization";

export function toTenantLocalizationResponse(
  localization: TenantLocalization,
): TenantLocalizationRecord {
  return {
    id: localization.id,
    tenantId: localization.tenantId,
    timezone: localization.timezone,
    currency: localization.currency,
    dateFormat: localization.dateFormat as TenantLocalizationRecord["dateFormat"],
    timeFormat: localization.timeFormat as TenantLocalizationRecord["timeFormat"],
    numberFormat: localization.numberFormat as TenantLocalizationRecord["numberFormat"],
    createdAt: localization.createdAt.toISOString(),
    updatedAt: localization.updatedAt.toISOString(),
  };
}
