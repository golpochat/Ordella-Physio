import { Injectable } from "@nestjs/common";
import type { UpdateTenantLocalizationPayload } from "@/models/TenantLocalization";
import { TenantsRepository } from "@/tenants/tenants.repository";
import { TenantLocalizationRepository } from "@/localization/tenant-localization.repository";
import { toTenantLocalizationResponse } from "@/localization/tenant-localization.mapper";
import {
  normalizeLocalizationPayload,
  validateLocalization,
} from "@/validators/tenant-localization.validator";
import {
  invalidCurrencyError,
  invalidTimezoneError,
  tenantNotFoundError,
  tenantValidationError,
} from "@/utils/tenant-errors";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

const DEFAULT_LOCALIZATION = {
  timezone: "UTC",
  currency: "USD",
  dateFormat: "YYYY-MM-DD",
  timeFormat: "HH:mm",
  numberFormat: "US" as const,
};

@Injectable()
export class TenantLocalizationService {
  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly tenantLocalizationRepository: TenantLocalizationRepository,
  ) {}

  async getLocalization(tenantId: string) {
    const tenant = await this.tenantsRepository.findById(tenantId);
    if (!tenant) {
      throw tenantNotFoundError();
    }

    const existing = await this.tenantLocalizationRepository.findByTenantId(tenantId);
    if (existing) {
      return toTenantLocalizationResponse(existing);
    }

    const created = await this.tenantLocalizationRepository.create(tenantId, {
      timezone: tenant.timezone || DEFAULT_LOCALIZATION.timezone,
      currency: tenant.currency || DEFAULT_LOCALIZATION.currency,
      dateFormat: DEFAULT_LOCALIZATION.dateFormat,
      timeFormat: DEFAULT_LOCALIZATION.timeFormat,
      numberFormat: DEFAULT_LOCALIZATION.numberFormat,
    });

    return toTenantLocalizationResponse(created);
  }

  async updateLocalization(
    tenantId: string,
    payload: UpdateTenantLocalizationPayload,
    updatedByUser?: AuthenticatedTenantUser,
  ) {
    void updatedByUser;

    const tenant = await this.tenantsRepository.findById(tenantId);
    if (!tenant) {
      throw tenantNotFoundError();
    }

    const validationErrors = validateLocalization(payload);
    if (validationErrors.length > 0) {
      const timezoneError = validationErrors.find((error) => error.field === "timezone");
      if (timezoneError && validationErrors.length === 1) {
        throw invalidTimezoneError(timezoneError.message);
      }

      const currencyError = validationErrors.find((error) => error.field === "currency");
      if (currencyError && validationErrors.length === 1) {
        throw invalidCurrencyError(currencyError.message);
      }

      throw tenantValidationError(validationErrors);
    }

    const normalized = normalizeLocalizationPayload(payload);

    const updated = await this.tenantLocalizationRepository.upsert(tenantId, {
      timezone: normalized.timezone,
      currency: normalized.currency,
      dateFormat: normalized.dateFormat,
      timeFormat: normalized.timeFormat,
      numberFormat: normalized.numberFormat,
    });

    await this.tenantsRepository.update(tenantId, {
      timezone: normalized.timezone,
      currency: normalized.currency,
    });

    return {
      localization: toTenantLocalizationResponse(updated),
      message: "Localization settings updated successfully.",
    };
  }

  async getLocalizationForInternal(tenantId: string) {
    const localization = await this.tenantLocalizationRepository.findByTenantId(tenantId);
    if (!localization) {
      const tenant = await this.tenantsRepository.findById(tenantId);
      if (!tenant) {
        return null;
      }

      return {
        tenantId: tenant.id,
        timezone: tenant.timezone || DEFAULT_LOCALIZATION.timezone,
        currency: tenant.currency || DEFAULT_LOCALIZATION.currency,
        dateFormat: DEFAULT_LOCALIZATION.dateFormat,
        timeFormat: DEFAULT_LOCALIZATION.timeFormat,
        numberFormat: DEFAULT_LOCALIZATION.numberFormat,
      };
    }

    return toTenantLocalizationResponse(localization);
  }
}
