import { PLATFORM_DEFAULT_COUNTRY } from "@/lib/platform-formatting";

/** Canonical postal address shape for UI forms across the platform. */
export type PostalAddress = {
  line1: string;
  line2: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};

export type PostalAddressField = keyof PostalAddress;

export type PostalAddressValidationOptions = {
  requireLine1?: boolean;
  requireCity?: boolean;
  requirePostalCode?: boolean;
  requireCountry?: boolean;
  requireRegion?: boolean;
};

const EIRCODE_REGEX = /^[A-Z]\d{2}\s?[A-Z0-9]{4}$/i;

export function emptyPostalAddress(country: string = PLATFORM_DEFAULT_COUNTRY): PostalAddress {
  return {
    line1: "",
    line2: "",
    city: "",
    region: "",
    postalCode: "",
    country,
  };
}

export function postalCodeLabel(country: string): string {
  return country.toUpperCase() === "IE" ? "Eircode" : "Postal code";
}

export function regionLabel(country: string): string {
  return country.toUpperCase() === "IE" ? "County" : "State / region";
}

export function normalizeEircode(value: string): string {
  const compact = value.replace(/\s+/g, "").toUpperCase();
  if (compact.length !== 7) {
    return value.trim().toUpperCase();
  }
  return `${compact.slice(0, 3)} ${compact.slice(3)}`;
}

export function normalizePostalCode(value: string, country: string): string {
  const trimmed = value.trim();
  if (country.toUpperCase() === "IE") {
    return normalizeEircode(trimmed);
  }
  return trimmed;
}

export function validatePostalCode(value: string, country: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return country.toUpperCase() === "IE" ? "Eircode is required" : "Postal code is required";
  }

  if (country.toUpperCase() === "IE" && !EIRCODE_REGEX.test(trimmed.replace(/\s+/g, " ").trim())) {
    return "Enter a valid Eircode (e.g. D02 AF30)";
  }

  return null;
}

export function validatePostalAddress(
  address: PostalAddress,
  options: PostalAddressValidationOptions = {},
): Partial<Record<PostalAddressField, string>> {
  const {
    requireLine1 = true,
    requireCity = true,
    requirePostalCode = true,
    requireCountry = true,
    requireRegion = false,
  } = options;

  const errors: Partial<Record<PostalAddressField, string>> = {};

  if (requireLine1 && !address.line1.trim()) {
    errors.line1 = "Address line 1 is required";
  }

  if (requireCity && !address.city.trim()) {
    errors.city = "City is required";
  }

  if (requireRegion && !address.region.trim()) {
    errors.region =
      address.country.toUpperCase() === "IE" ? "County is required" : "State / region is required";
  }

  if (requirePostalCode) {
    const postalError = validatePostalCode(address.postalCode, address.country);
    if (postalError) {
      errors.postalCode = postalError;
    }
  }

  if (requireCountry && !address.country.trim()) {
    errors.country = "Country is required";
  }

  return errors;
}

export function formatPostalAddress(address: PostalAddress): string {
  return [
    address.line1,
    address.line2,
    [address.city, address.region, address.postalCode].filter(Boolean).join(", "),
    address.country,
  ]
    .filter(Boolean)
    .join("\n");
}

export function toPatientAddressPayload(address: PostalAddress) {
  return {
    addressLine1: address.line1.trim(),
    addressLine2: address.line2.trim() || undefined,
    city: address.city.trim(),
    state: address.region.trim(),
    postalCode: normalizePostalCode(address.postalCode, address.country),
    country: address.country.trim(),
  };
}

export function toLocationAddressPayload(address: PostalAddress) {
  return {
    addressLine1: address.line1.trim(),
    addressLine2: address.line2.trim() || undefined,
    city: address.city.trim(),
    state: address.region.trim() || undefined,
    postalCode: normalizePostalCode(address.postalCode, address.country),
    country: address.country.trim(),
  };
}

export function toTenantBillingAddressPayload(address: PostalAddress) {
  return {
    billingAddressLine1: address.line1.trim(),
    billingAddressLine2: address.line2.trim() || null,
    billingCity: address.city.trim(),
    billingPostcode: normalizePostalCode(address.postalCode, address.country),
    billingCountry: address.country.trim(),
  };
}

export function toCheckoutBillingPayload(address: PostalAddress) {
  return {
    billingStreet: address.line1.trim(),
    billingCity: address.city.trim(),
    billingPostal: normalizePostalCode(address.postalCode, address.country),
    billingCountry: address.country.trim(),
  };
}

export function toTenantProfileAddressPayload(address: PostalAddress) {
  return {
    address: address.line1.trim(),
    city: address.city.trim(),
    postalCode: normalizePostalCode(address.postalCode, address.country),
    country: address.country.trim(),
  };
}

export function fromPatientAddress(input: {
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
}): PostalAddress {
  return {
    line1: input.addressLine1 ?? "",
    line2: input.addressLine2 ?? "",
    city: input.city ?? "",
    region: input.state ?? "",
    postalCode: input.postalCode ?? "",
    country: input.country ?? PLATFORM_DEFAULT_COUNTRY,
  };
}

export function fromLocationAddress(input: {
  addressLine1?: string;
  addressLine2?: string | null;
  city?: string;
  state?: string | null;
  postalCode?: string;
  country?: string;
}): PostalAddress {
  return {
    line1: input.addressLine1 ?? "",
    line2: input.addressLine2 ?? "",
    city: input.city ?? "",
    region: input.state ?? "",
    postalCode: input.postalCode ?? "",
    country: input.country ?? PLATFORM_DEFAULT_COUNTRY,
  };
}

export function fromTenantBillingAddress(input: {
  billingAddressLine1?: string;
  billingAddressLine2?: string | null;
  billingCity?: string;
  billingPostcode?: string;
  billingCountry?: string;
}): PostalAddress {
  return {
    line1: input.billingAddressLine1 ?? "",
    line2: input.billingAddressLine2 ?? "",
    city: input.billingCity ?? "",
    region: "",
    postalCode: input.billingPostcode ?? "",
    country: input.billingCountry ?? PLATFORM_DEFAULT_COUNTRY,
  };
}

export function fromTenantProfileAddress(input: {
  address?: string | null;
  city?: string | null;
  postalCode?: string | null;
  country?: string | null;
}): PostalAddress {
  const rawCountry = input.country?.trim() ?? "";
  const country =
    rawCountry.length === 2 ? rawCountry.toUpperCase() : resolveCountryLabelToCode(rawCountry);

  return {
    line1: input.address ?? "",
    line2: "",
    city: input.city ?? "",
    region: "",
    postalCode: input.postalCode ?? "",
    country: country || PLATFORM_DEFAULT_COUNTRY,
  };
}

function resolveCountryLabelToCode(label: string): string {
  const normalized = label.trim().toLowerCase();
  if (normalized === "ireland") {
    return "IE";
  }
  if (normalized === "united kingdom") {
    return "GB";
  }
  return label;
}

export function mapPostalErrorsToPatientKeys(
  errors: Partial<Record<PostalAddressField, string>>,
): Record<string, string> {
  const mapped: Record<string, string> = {};
  if (errors.line1) mapped.addressLine1 = errors.line1;
  if (errors.line2) mapped.addressLine2 = errors.line2;
  if (errors.city) mapped.city = errors.city;
  if (errors.region) mapped.state = errors.region;
  if (errors.postalCode) mapped.postalCode = errors.postalCode;
  if (errors.country) mapped.country = errors.country;
  return mapped;
}

export function mapPostalErrorsToLocationKeys(
  errors: Partial<Record<PostalAddressField, string>>,
): Record<string, string> {
  const mapped: Record<string, string> = {};
  if (errors.line1) mapped.addressLine1 = errors.line1;
  if (errors.line2) mapped.addressLine2 = errors.line2;
  if (errors.city) mapped.city = errors.city;
  if (errors.region) mapped.state = errors.region;
  if (errors.postalCode) mapped.postalCode = errors.postalCode;
  if (errors.country) mapped.country = errors.country;
  return mapped;
}

export function mapPostalErrorsToBillingKeys(
  errors: Partial<Record<PostalAddressField, string>>,
): Record<string, string> {
  const mapped: Record<string, string> = {};
  if (errors.line1) mapped.billingAddressLine1 = errors.line1;
  if (errors.line2) mapped.billingAddressLine2 = errors.line2;
  if (errors.city) mapped.billingCity = errors.city;
  if (errors.postalCode) mapped.billingPostcode = errors.postalCode;
  if (errors.country) mapped.billingCountry = errors.country;
  return mapped;
}

export function mapPostalErrorsToCheckoutKeys(
  errors: Partial<Record<PostalAddressField, string>>,
): Record<string, string> {
  const mapped: Record<string, string> = {};
  if (errors.line1) mapped.billingStreet = errors.line1;
  if (errors.city) mapped.billingCity = errors.city;
  if (errors.postalCode) mapped.billingPostal = errors.postalCode;
  if (errors.country) mapped.billingCountry = errors.country;
  return mapped;
}
