export const TENANT_CONFIG_NAMESPACES = [
  "branding",
  "features",
  "integrations",
  "preferences",
] as const;

export type TenantConfigNamespace = (typeof TENANT_CONFIG_NAMESPACES)[number];

export type TenantBrandingConfig = {
  primaryColor: string;
  logoUrl?: string | null;
  darkMode: boolean;
};

export type TenantFeaturesConfig = {
  appointmentModule: boolean;
  billingModule: boolean;
  pharmacyModule: boolean;
};

export type TenantIntegrationsConfig = {
  stripePublicKey?: string | null;
  stripeSecretKey?: string | null;
};

export type TenantPreferencesConfig = {
  language: string;
  dateFormat: string;
  timeFormat: string;
};

export type TenantConfigData =
  | TenantBrandingConfig
  | TenantFeaturesConfig
  | TenantIntegrationsConfig
  | TenantPreferencesConfig
  | Record<string, unknown>;

export type TenantConfigRecord = {
  namespace: TenantConfigNamespace;
  data: TenantConfigData;
  updatedAt: string | null;
  updatedByUserId: string | null;
  isDefault: boolean;
};

export type TenantConfigNamespaceSummary = {
  namespace: TenantConfigNamespace;
  updatedAt: string | null;
  isDefault: boolean;
};

export type TenantConfigValidationFieldError = {
  field: string;
  message: string;
};

export const DEFAULT_TENANT_CONFIGS: Record<TenantConfigNamespace, TenantConfigData> = {
  branding: {
    primaryColor: "#0f766e",
    logoUrl: null,
    darkMode: false,
  },
  features: {
    appointmentModule: true,
    billingModule: true,
    pharmacyModule: false,
  },
  integrations: {
    stripePublicKey: null,
    stripeSecretKey: null,
  },
  preferences: {
    language: "en",
    dateFormat: "YYYY-MM-DD",
    timeFormat: "HH:mm",
  },
};
