export const ORGANIZATION_CONFIG_NAMESPACES = [
  "branding",
  "features",
  "integrations",
  "preferences",
] as const;

export type OrganizationConfigNamespace = (typeof ORGANIZATION_CONFIG_NAMESPACES)[number];

export type OrganizationBrandingConfig = {
  primaryColor: string;
  logoUrl?: string | null;
  darkMode: boolean;
};

export type OrganizationFeaturesConfig = {
  multiTenantSupport: boolean;
  advancedReporting: boolean;
  auditLogs: boolean;
};

export type OrganizationIntegrationsConfig = {
  stripePublicKey?: string | null;
  stripeSecretKey?: string | null;
  emailProviderApiKey?: string | null;
};

export type OrganizationPreferencesConfig = {
  timezone: string;
  language: string;
  dateFormat: string;
};

export type OrganizationConfigData =
  | OrganizationBrandingConfig
  | OrganizationFeaturesConfig
  | OrganizationIntegrationsConfig
  | OrganizationPreferencesConfig
  | Record<string, unknown>;

export type OrganizationConfigRecord = {
  namespace: OrganizationConfigNamespace;
  data: OrganizationConfigData;
  updatedAt: string | null;
  updatedByUserId: string | null;
  isDefault: boolean;
};

export type OrganizationConfigNamespaceSummary = {
  namespace: OrganizationConfigNamespace;
  updatedAt: string | null;
  isDefault: boolean;
};

export type OrganizationConfigValidationFieldError = {
  field: string;
  message: string;
};

export const DEFAULT_ORGANIZATION_CONFIGS: Record<OrganizationConfigNamespace, OrganizationConfigData> = {
  branding: {
    primaryColor: "#0f766e",
    logoUrl: null,
    darkMode: false,
  },
  features: {
    multiTenantSupport: true,
    advancedReporting: false,
    auditLogs: true,
  },
  integrations: {
    stripePublicKey: null,
    stripeSecretKey: null,
    emailProviderApiKey: null,
  },
  preferences: {
    timezone: "UTC",
    language: "en",
    dateFormat: "YYYY-MM-DD",
  },
};
