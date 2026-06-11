import type {
  TenantBillingValidationFieldError,
  UpdateTenantBillingSettingsPayload,
} from "@/models/TenantBillingSettings";

const ISO_CURRENCY_REGEX = /^[A-Z]{3}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INVOICE_PREFIX_REGEX = /^[A-Z0-9]*$/;

export const ISO_COUNTRY_CODES = [
  "GB",
  "US",
  "CA",
  "AU",
  "IE",
  "DE",
  "FR",
  "NL",
  "BE",
  "ES",
  "IT",
  "SE",
  "NO",
  "DK",
  "FI",
  "CH",
  "AT",
  "NZ",
  "SG",
  "AE",
] as const;

const ISO_COUNTRY_SET = new Set<string>(ISO_COUNTRY_CODES);

function isValidCountryCode(value: string): boolean {
  return ISO_COUNTRY_SET.has(value.toUpperCase());
}

export function validateBillingSettings(
  payload: UpdateTenantBillingSettingsPayload,
): TenantBillingValidationFieldError[] {
  const errors: TenantBillingValidationFieldError[] = [];

  const billingEmail = payload.billingEmail?.trim() ?? "";
  const billingContactName = payload.billingContactName?.trim() ?? "";
  const billingAddressLine1 = payload.billingAddressLine1?.trim() ?? "";
  const billingCity = payload.billingCity?.trim() ?? "";
  const billingPostcode = payload.billingPostcode?.trim() ?? "";
  const billingCountry = payload.billingCountry?.trim().toUpperCase() ?? "";
  const defaultCurrency = payload.defaultCurrency?.trim().toUpperCase() ?? "";
  const invoicePrefix = payload.invoicePrefix?.trim().toUpperCase() ?? "";

  if (!billingEmail) {
    errors.push({ field: "billingEmail", message: "Billing email is required." });
  } else if (!EMAIL_REGEX.test(billingEmail)) {
    errors.push({ field: "billingEmail", message: "Enter a valid email address." });
  }

  if (!billingContactName) {
    errors.push({ field: "billingContactName", message: "Billing contact name is required." });
  } else if (billingContactName.length < 3) {
    errors.push({
      field: "billingContactName",
      message: "Billing contact name must be at least 3 characters.",
    });
  }

  if (!billingAddressLine1) {
    errors.push({ field: "billingAddressLine1", message: "Address is required." });
  }

  if (!billingCity) {
    errors.push({ field: "billingCity", message: "City is required." });
  }

  if (!billingPostcode) {
    errors.push({ field: "billingPostcode", message: "Postcode is required." });
  }

  if (!billingCountry) {
    errors.push({ field: "billingCountry", message: "Country is required." });
  } else if (!isValidCountryCode(billingCountry)) {
    errors.push({ field: "billingCountry", message: "Country must be a valid ISO country code." });
  }

  if (!defaultCurrency) {
    errors.push({ field: "defaultCurrency", message: "Default currency is required." });
  } else if (!ISO_CURRENCY_REGEX.test(defaultCurrency)) {
    errors.push({
      field: "defaultCurrency",
      message: "Default currency must be a valid ISO currency code.",
    });
  }

  if (invoicePrefix && !INVOICE_PREFIX_REGEX.test(invoicePrefix)) {
    errors.push({
      field: "invoicePrefix",
      message: "Invoice prefix can only contain letters and numbers and max 10 characters.",
    });
  } else if (invoicePrefix.length > 10) {
    errors.push({
      field: "invoicePrefix",
      message: "Invoice prefix can only contain letters and numbers and max 10 characters.",
    });
  }

  return errors;
}

export function normalizeBillingSettingsPayload(
  payload: UpdateTenantBillingSettingsPayload,
): Required<
  Pick<
    UpdateTenantBillingSettingsPayload,
    | "billingEmail"
    | "billingContactName"
    | "billingAddressLine1"
    | "billingCity"
    | "billingPostcode"
    | "billingCountry"
    | "defaultCurrency"
  >
> &
  Pick<UpdateTenantBillingSettingsPayload, "billingAddressLine2" | "taxNumber" | "invoicePrefix"> {
  return {
    billingEmail: payload.billingEmail?.trim() ?? "",
    billingContactName: payload.billingContactName?.trim() ?? "",
    billingAddressLine1: payload.billingAddressLine1?.trim() ?? "",
    billingAddressLine2: payload.billingAddressLine2?.trim() || null,
    billingCity: payload.billingCity?.trim() ?? "",
    billingPostcode: payload.billingPostcode?.trim() ?? "",
    billingCountry: payload.billingCountry?.trim().toUpperCase() ?? "",
    taxNumber: payload.taxNumber?.trim() || null,
    invoicePrefix: payload.invoicePrefix?.trim().toUpperCase() || null,
    defaultCurrency: payload.defaultCurrency?.trim().toUpperCase() ?? "",
  };
}
