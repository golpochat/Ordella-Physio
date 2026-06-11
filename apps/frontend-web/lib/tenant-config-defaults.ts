import type {
  PlatformTenantBrandingConfig,
  PlatformTenantConfigNamespace,
  PlatformTenantFeaturesConfig,
  PlatformTenantIntegrationsConfig,
  PlatformTenantPreferencesConfig,
} from "@/lib/super-admin-portal-types";

export const TENANT_CONFIG_NAMESPACE_OPTIONS: Array<{
  value: PlatformTenantConfigNamespace;
  label: string;
}> = [
  { value: "branding", label: "Branding" },
  { value: "features", label: "Features" },
  { value: "integrations", label: "Integrations" },
  { value: "preferences", label: "Preferences" },
];

export const DEFAULT_BRANDING_CONFIG: PlatformTenantBrandingConfig = {
  primaryColor: "#0f766e",
  logoUrl: null,
  darkMode: false,
};

export const DEFAULT_FEATURES_CONFIG: PlatformTenantFeaturesConfig = {
  appointmentModule: true,
  billingModule: true,
  pharmacyModule: false,
};

export const DEFAULT_INTEGRATIONS_CONFIG: PlatformTenantIntegrationsConfig = {
  stripePublicKey: null,
  stripeSecretKey: null,
};

export const DEFAULT_PREFERENCES_CONFIG: PlatformTenantPreferencesConfig = {
  language: "en",
  dateFormat: "YYYY-MM-DD",
  timeFormat: "HH:mm",
};

export const TENANT_LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "en-GB", label: "English (UK)" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "es", label: "Spanish" },
] as const;
