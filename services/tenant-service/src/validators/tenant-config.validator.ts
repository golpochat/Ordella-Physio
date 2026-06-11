import type {
  TenantConfigNamespace,
  TenantConfigValidationFieldError,
} from "@/models/TenantConfig";
import {
  DEFAULT_TENANT_CONFIGS,
  TENANT_CONFIG_NAMESPACES,
} from "@/models/TenantConfig";

const HEX_COLOR_REGEX = /^#([0-9A-Fa-f]{6})$/;
const ISO_LANGUAGE_REGEX = /^[a-z]{2}(-[A-Z]{2})?$/;
const ALLOWED_DATE_FORMATS = ["YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"] as const;
const ALLOWED_TIME_FORMATS = ["HH:mm", "hh:mm A"] as const;

export function isTenantConfigNamespace(value: string): value is TenantConfigNamespace {
  return (TENANT_CONFIG_NAMESPACES as readonly string[]).includes(value);
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validateBrandingConfig(data: Record<string, unknown>): TenantConfigValidationFieldError[] {
  const errors: TenantConfigValidationFieldError[] = [];
  const primaryColor = typeof data.primaryColor === "string" ? data.primaryColor.trim() : "";

  if (!primaryColor) {
    errors.push({
      field: "primaryColor",
      message: "Primary color must be a valid hex code.",
    });
  } else if (!HEX_COLOR_REGEX.test(primaryColor)) {
    errors.push({
      field: "primaryColor",
      message: "Primary color must be a valid hex code.",
    });
  }

  if (data.logoUrl !== undefined && data.logoUrl !== null && data.logoUrl !== "") {
    if (typeof data.logoUrl !== "string" || !isValidUrl(data.logoUrl.trim())) {
      errors.push({ field: "logoUrl", message: "Logo URL must be a valid URL." });
    }
  }

  if (typeof data.darkMode !== "boolean") {
    errors.push({ field: "darkMode", message: "Dark mode must be true or false." });
  }

  return errors;
}

function validateFeaturesConfig(data: Record<string, unknown>): TenantConfigValidationFieldError[] {
  const errors: TenantConfigValidationFieldError[] = [];
  const fields = ["appointmentModule", "billingModule", "pharmacyModule"] as const;

  for (const field of fields) {
    if (typeof data[field] !== "boolean") {
      errors.push({ field, message: `${field} must be true or false.` });
    }
  }

  return errors;
}

function validateIntegrationsConfig(data: Record<string, unknown>): TenantConfigValidationFieldError[] {
  const errors: TenantConfigValidationFieldError[] = [];

  if (
    data.stripePublicKey !== undefined &&
    data.stripePublicKey !== null &&
    data.stripePublicKey !== "" &&
    typeof data.stripePublicKey !== "string"
  ) {
    errors.push({ field: "stripePublicKey", message: "Stripe public key must be a string." });
  }

  if (
    data.stripeSecretKey !== undefined &&
    data.stripeSecretKey !== null &&
    data.stripeSecretKey !== "" &&
    typeof data.stripeSecretKey !== "string"
  ) {
    errors.push({ field: "stripeSecretKey", message: "Stripe secret key must be a string." });
  }

  return errors;
}

function validatePreferencesConfig(data: Record<string, unknown>): TenantConfigValidationFieldError[] {
  const errors: TenantConfigValidationFieldError[] = [];
  const language = typeof data.language === "string" ? data.language.trim() : "";
  const dateFormat = typeof data.dateFormat === "string" ? data.dateFormat.trim() : "";
  const timeFormat = typeof data.timeFormat === "string" ? data.timeFormat.trim() : "";

  if (!language) {
    errors.push({ field: "language", message: "Language is required." });
  } else if (!ISO_LANGUAGE_REGEX.test(language)) {
    errors.push({ field: "language", message: "Language must be a valid ISO code." });
  }

  if (!dateFormat) {
    errors.push({ field: "dateFormat", message: "Date format is required." });
  } else if (!(ALLOWED_DATE_FORMATS as readonly string[]).includes(dateFormat)) {
    errors.push({ field: "dateFormat", message: "Date format is required." });
  }

  if (!timeFormat) {
    errors.push({ field: "timeFormat", message: "Time format is required." });
  } else if (!(ALLOWED_TIME_FORMATS as readonly string[]).includes(timeFormat)) {
    errors.push({ field: "timeFormat", message: "Time format is required." });
  }

  return errors;
}

export function validateConfig(
  namespace: TenantConfigNamespace,
  data: unknown,
): TenantConfigValidationFieldError[] {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return [{ field: "data", message: "Configuration data must be a JSON object." }];
  }

  const record = data as Record<string, unknown>;

  switch (namespace) {
    case "branding":
      return validateBrandingConfig(record);
    case "features":
      return validateFeaturesConfig(record);
    case "integrations":
      return validateIntegrationsConfig(record);
    case "preferences":
      return validatePreferencesConfig(record);
    default:
      return [];
  }
}

export function normalizeConfigData(
  namespace: TenantConfigNamespace,
  data: Record<string, unknown>,
): Record<string, unknown> {
  const defaults = DEFAULT_TENANT_CONFIGS[namespace] as Record<string, unknown>;
  const merged = { ...defaults, ...data };

  if (namespace === "branding") {
    return {
      primaryColor:
        typeof merged.primaryColor === "string" ? merged.primaryColor.trim() : defaults.primaryColor,
      logoUrl:
        merged.logoUrl === undefined || merged.logoUrl === ""
          ? null
          : typeof merged.logoUrl === "string"
            ? merged.logoUrl.trim()
            : null,
      darkMode: Boolean(merged.darkMode),
    };
  }

  if (namespace === "features") {
    return {
      appointmentModule: Boolean(merged.appointmentModule),
      billingModule: Boolean(merged.billingModule),
      pharmacyModule: Boolean(merged.pharmacyModule),
    };
  }

  if (namespace === "integrations") {
    return {
      stripePublicKey:
        merged.stripePublicKey === undefined || merged.stripePublicKey === ""
          ? null
          : typeof merged.stripePublicKey === "string"
            ? merged.stripePublicKey.trim()
            : null,
      stripeSecretKey:
        merged.stripeSecretKey === undefined || merged.stripeSecretKey === ""
          ? null
          : typeof merged.stripeSecretKey === "string"
            ? merged.stripeSecretKey.trim()
            : null,
    };
  }

  return {
    language: typeof merged.language === "string" ? merged.language.trim() : defaults.language,
    dateFormat:
      typeof merged.dateFormat === "string" ? merged.dateFormat.trim() : defaults.dateFormat,
    timeFormat:
      typeof merged.timeFormat === "string" ? merged.timeFormat.trim() : defaults.timeFormat,
  };
}
