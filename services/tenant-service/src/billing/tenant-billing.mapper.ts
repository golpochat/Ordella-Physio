import type { TenantBillingSettings } from "@/generated/prisma";
import type { TenantBillingSettingsRecord } from "@/models/TenantBillingSettings";

export function toTenantBillingSettingsResponse(
  settings: TenantBillingSettings,
): TenantBillingSettingsRecord {
  return {
    id: settings.id,
    tenantId: settings.tenantId,
    billingEmail: settings.billingEmail,
    billingContactName: settings.billingContactName,
    billingAddressLine1: settings.billingAddressLine1,
    billingAddressLine2: settings.billingAddressLine2,
    billingCity: settings.billingCity,
    billingPostcode: settings.billingPostcode,
    billingCountry: settings.billingCountry,
    taxNumber: settings.taxNumber,
    invoicePrefix: settings.invoicePrefix,
    defaultCurrency: settings.defaultCurrency,
    createdAt: settings.createdAt.toISOString(),
    updatedAt: settings.updatedAt.toISOString(),
  };
}
