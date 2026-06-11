import type {
  PlatformOrganizationBrandingConfig,
  PlatformOrganizationConfigNamespace,
  PlatformOrganizationFeaturesConfig,
  PlatformOrganizationIntegrationsConfig,
  PlatformOrganizationPreferencesConfig,
} from "@/lib/super-admin-portal-types";
import { TENANT_TIMEZONE_OPTIONS } from "@/lib/tenant-form-options";
import { TENANT_DATE_FORMAT_OPTIONS } from "@/lib/tenant-localization-form-options";

export const ORGANIZATION_CONFIG_NAMESPACE_OPTIONS: Array<{
  value: PlatformOrganizationConfigNamespace;
  label: string;
}> = [
  { value: "branding", label: "Branding" },
  { value: "features", label: "Features" },
  { value: "integrations", label: "Integrations" },
  { value: "preferences", label: "Preferences" },
];

export const DEFAULT_ORGANIZATION_BRANDING_CONFIG: PlatformOrganizationBrandingConfig = {
  primaryColor: "#0f766e",
  logoUrl: null,
  darkMode: false,
};

export const DEFAULT_ORGANIZATION_FEATURES_CONFIG: PlatformOrganizationFeaturesConfig = {
  multiTenantSupport: true,
  advancedReporting: false,
  auditLogs: true,
};

export const DEFAULT_ORGANIZATION_INTEGRATIONS_CONFIG: PlatformOrganizationIntegrationsConfig = {
  stripePublicKey: null,
  stripeSecretKey: null,
  emailProviderApiKey: null,
};

export const DEFAULT_ORGANIZATION_PREFERENCES_CONFIG: PlatformOrganizationPreferencesConfig = {
  timezone: "UTC",
  language: "en",
  dateFormat: "YYYY-MM-DD",
};

export const ORGANIZATION_LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "en-GB", label: "English (UK)" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "es", label: "Spanish" },
] as const;

export const ORGANIZATION_TIMEZONE_OPTIONS = TENANT_TIMEZONE_OPTIONS.map((timezone) => ({
  value: timezone,
  label: timezone,
}));

export const ORGANIZATION_DATE_FORMAT_OPTIONS = TENANT_DATE_FORMAT_OPTIONS;
