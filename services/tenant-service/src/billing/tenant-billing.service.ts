import { Injectable } from "@nestjs/common";
import type { UpdateTenantBillingSettingsPayload } from "@/models/TenantBillingSettings";
import { TenantsRepository } from "@/tenants/tenants.repository";
import { TenantBillingRepository } from "@/billing/tenant-billing.repository";
import { toTenantBillingSettingsResponse } from "@/billing/tenant-billing.mapper";
import {
  normalizeBillingSettingsPayload,
  validateBillingSettings,
} from "@/validators/tenant-billing.validator";
import { tenantNotFoundError, tenantValidationError } from "@/utils/tenant-errors";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

@Injectable()
export class TenantBillingService {
  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly tenantBillingRepository: TenantBillingRepository,
  ) {}

  async getBillingSettings(tenantId: string) {
    const tenant = await this.tenantsRepository.findById(tenantId);
    if (!tenant) {
      throw tenantNotFoundError();
    }

    const settings = await this.tenantBillingRepository.findByTenantId(tenantId);
    return settings ? toTenantBillingSettingsResponse(settings) : null;
  }

  async updateBillingSettings(
    tenantId: string,
    payload: UpdateTenantBillingSettingsPayload,
    updatedByUser?: AuthenticatedTenantUser,
  ) {
    void updatedByUser;

    const tenant = await this.tenantsRepository.findById(tenantId);
    if (!tenant) {
      throw tenantNotFoundError();
    }

    const validationErrors = validateBillingSettings(payload);
    if (validationErrors.length > 0) {
      throw tenantValidationError(validationErrors);
    }

    const normalized = normalizeBillingSettingsPayload(payload);

    const updated = await this.tenantBillingRepository.upsert(tenantId, {
      billingEmail: normalized.billingEmail,
      billingContactName: normalized.billingContactName,
      billingAddressLine1: normalized.billingAddressLine1,
      billingAddressLine2: normalized.billingAddressLine2,
      billingCity: normalized.billingCity,
      billingPostcode: normalized.billingPostcode,
      billingCountry: normalized.billingCountry,
      taxNumber: normalized.taxNumber,
      invoicePrefix: normalized.invoicePrefix,
      defaultCurrency: normalized.defaultCurrency,
    });

    return {
      billingSettings: toTenantBillingSettingsResponse(updated),
      message: "Billing settings updated successfully.",
    };
  }
}
