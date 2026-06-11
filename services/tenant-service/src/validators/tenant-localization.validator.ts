import type {
  LocalizationDateFormat,
  LocalizationNumberFormat,
  LocalizationTimeFormat,
  TenantLocalizationValidationFieldError,
  UpdateTenantLocalizationPayload,
} from "@/models/TenantLocalization";
import {
  LOCALIZATION_DATE_FORMATS,
  LOCALIZATION_NUMBER_FORMATS,
  LOCALIZATION_TIME_FORMATS,
} from "@/models/TenantLocalization";

const ISO_CURRENCY_REGEX = /^[A-Z]{3}$/;

function isValidTimezone(value: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

function isAllowedDateFormat(value: string): value is LocalizationDateFormat {
  return (LOCALIZATION_DATE_FORMATS as readonly string[]).includes(value);
}

function isAllowedTimeFormat(value: string): value is LocalizationTimeFormat {
  return (LOCALIZATION_TIME_FORMATS as readonly string[]).includes(value);
}

function isAllowedNumberFormat(value: string): value is LocalizationNumberFormat {
  return (LOCALIZATION_NUMBER_FORMATS as readonly string[]).includes(value);
}

export function validateLocalization(
  payload: UpdateTenantLocalizationPayload,
): TenantLocalizationValidationFieldError[] {
  const errors: TenantLocalizationValidationFieldError[] = [];

  const timezone = payload.timezone?.trim() ?? "";
  const currency = payload.currency?.trim().toUpperCase() ?? "";
  const dateFormat = payload.dateFormat?.trim() ?? "";
  const timeFormat = payload.timeFormat?.trim() ?? "";
  const numberFormat = payload.numberFormat?.trim().toUpperCase() ?? "";

  if (!timezone) {
    errors.push({ field: "timezone", message: "Timezone is required." });
  } else if (!isValidTimezone(timezone)) {
    errors.push({ field: "timezone", message: "Invalid timezone." });
  }

  if (!currency) {
    errors.push({ field: "currency", message: "Currency is required." });
  } else if (!ISO_CURRENCY_REGEX.test(currency)) {
    errors.push({ field: "currency", message: "Currency must be a valid ISO 4217 code." });
  }

  if (!dateFormat) {
    errors.push({ field: "dateFormat", message: "Date format is required." });
  } else if (!isAllowedDateFormat(dateFormat)) {
    errors.push({ field: "dateFormat", message: "Date format is required." });
  }

  if (!timeFormat) {
    errors.push({ field: "timeFormat", message: "Time format is required." });
  } else if (!isAllowedTimeFormat(timeFormat)) {
    errors.push({ field: "timeFormat", message: "Time format is required." });
  }

  if (!numberFormat) {
    errors.push({ field: "numberFormat", message: "Number format is required." });
  } else if (!isAllowedNumberFormat(numberFormat)) {
    errors.push({ field: "numberFormat", message: "Number format is required." });
  }

  return errors;
}

export function normalizeLocalizationPayload(payload: UpdateTenantLocalizationPayload) {
  return {
    timezone: payload.timezone?.trim() ?? "",
    currency: payload.currency?.trim().toUpperCase() ?? "",
    dateFormat: payload.dateFormat?.trim() as LocalizationDateFormat,
    timeFormat: payload.timeFormat?.trim() as LocalizationTimeFormat,
    numberFormat: payload.numberFormat?.trim().toUpperCase() as LocalizationNumberFormat,
  };
}
