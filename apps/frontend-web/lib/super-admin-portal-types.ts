export type PlatformTenant = {
  id: string;
  name: string;
  code: string;
  slug: string;
  ownerUserId?: string | null;
  timezone: string;
  currency: string;
  address: string | null;
  phone: string | null;
  status?: "ACTIVE" | "SUSPENDED";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PlatformTenantListResponse = {
  data: PlatformTenant[];
  meta?: { page: number; limit: number; total: number; totalPages: number };
};

export type CreatePlatformTenantPayload = {
  name: string;
  code: string;
  slug?: string;
  ownerUserId: string;
  timezone: string;
  currency: string;
  address?: string;
  phone?: string;
};

export type CreatePlatformTenantResponse = {
  tenant: PlatformTenant;
  message: string;
};

export type UpdatePlatformTenantPayload = {
  name?: string;
  code?: string;
  timezone?: string;
  currency?: string;
  status?: "ACTIVE" | "SUSPENDED";
  address?: string;
  phone?: string;
};

export type UpdatePlatformTenantResponse = {
  tenant: PlatformTenant;
  message: string;
};

export type TenantStatusChangeResponse = {
  tenant: PlatformTenant;
  message: string;
};

export type PlatformTenantBillingSettings = {
  id: string;
  tenantId: string;
  billingEmail: string;
  billingContactName: string;
  billingAddressLine1: string;
  billingAddressLine2: string | null;
  billingCity: string;
  billingPostcode: string;
  billingCountry: string;
  taxNumber: string | null;
  invoicePrefix: string | null;
  defaultCurrency: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdatePlatformTenantBillingPayload = {
  billingEmail: string;
  billingContactName: string;
  billingAddressLine1: string;
  billingAddressLine2?: string | null;
  billingCity: string;
  billingPostcode: string;
  billingCountry: string;
  taxNumber?: string | null;
  invoicePrefix?: string | null;
  defaultCurrency: string;
};

export type UpdatePlatformTenantBillingResponse = {
  billingSettings: PlatformTenantBillingSettings;
  message: string;
};

export type PlatformTenantLocalization = {
  id: string;
  tenantId: string;
  timezone: string;
  currency: string;
  dateFormat: "YYYY-MM-DD" | "DD/MM/YYYY" | "MM/DD/YYYY";
  timeFormat: "HH:mm" | "hh:mm A";
  numberFormat: "EU" | "US";
  createdAt: string;
  updatedAt: string;
};

export type UpdatePlatformTenantLocalizationPayload = {
  timezone: string;
  currency: string;
  dateFormat: string;
  timeFormat: string;
  numberFormat: string;
};

export type UpdatePlatformTenantLocalizationResponse = {
  localization: PlatformTenantLocalization;
  message: string;
};

export type PlatformTenantDomain = {
  id: string;
  tenantId: string;
  domain: string;
  type: "PRIMARY" | "CUSTOM";
  verificationToken: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreatePlatformTenantDomainPayload = {
  domain: string;
  type: "CUSTOM";
};

export type CreatePlatformTenantDomainResponse = {
  domain: PlatformTenantDomain;
  message: string;
  verification?: {
    txtName: string;
    txtValue: string;
  };
};

export type VerifyPlatformTenantDomainResponse = {
  domain: PlatformTenantDomain;
  message: string;
};

export type PlatformTenantConfigNamespace =
  | "branding"
  | "features"
  | "integrations"
  | "preferences";

export type PlatformTenantBrandingConfig = {
  primaryColor: string;
  logoUrl?: string | null;
  darkMode: boolean;
};

export type PlatformTenantFeaturesConfig = {
  appointmentModule: boolean;
  billingModule: boolean;
  pharmacyModule: boolean;
};

export type PlatformTenantIntegrationsConfig = {
  stripePublicKey?: string | null;
  stripeSecretKey?: string | null;
};

export type PlatformTenantPreferencesConfig = {
  language: string;
  dateFormat: string;
  timeFormat: string;
};

export type PlatformTenantConfigData =
  | PlatformTenantBrandingConfig
  | PlatformTenantFeaturesConfig
  | PlatformTenantIntegrationsConfig
  | PlatformTenantPreferencesConfig
  | Record<string, unknown>;

export type PlatformTenantConfigRecord = {
  namespace: PlatformTenantConfigNamespace;
  data: PlatformTenantConfigData;
  updatedAt: string | null;
  updatedByUserId: string | null;
  isDefault: boolean;
};

export type PlatformTenantConfigNamespaceSummary = {
  namespace: PlatformTenantConfigNamespace;
  updatedAt: string | null;
  isDefault: boolean;
};

export type PlatformTenantConfigNamespacesResponse = {
  namespaces: PlatformTenantConfigNamespaceSummary[];
};

export type UpdatePlatformTenantConfigResponse = {
  config: PlatformTenantConfigRecord;
  message: string;
};

export type PlatformUser = {
  id: string;
  tenantId: string;
  email?: string;
  role: string;
  emailVerified?: boolean;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreatePlatformUserPayload = {
  tenantId: string;
  email: string;
  password: string;
  role?: "OWNER" | "ADMIN" | "THERAPIST" | "STAFF";
};

export type UpdatePlatformUserPayload = {
  email?: string;
  role?: "OWNER" | "ADMIN" | "THERAPIST" | "STAFF";
  firstName?: string;
  lastName?: string;
};

export type PlatformRole = {
  id: string;
  name: string;
  level: number;
  description: string;
  permissions: string[];
};

export type CreatePlatformRolePayload = {
  name: string;
  description?: string;
  permissions?: string[];
};

export type UpdatePlatformRolePayload = Partial<CreatePlatformRolePayload>;

export type PlatformProfile = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  tenantId: string;
  role?: string;
};

export type UpdatePlatformProfilePayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export type PlatformSettings = {
  platformName: string;
  supportEmail: string;
  defaultTimezone: string;
  defaultCurrency: string;
  maintenanceMode: boolean;
};

export type UpdatePlatformSettingsPayload = Partial<PlatformSettings>;

export type ServiceHealthStatus = {
  service: string;
  status: "ok" | "degraded" | "down" | "unknown";
  message?: string;
};

export type AuthAuditLog = {
  id: string;
  userId: string | null;
  tenantId: string | null;
  action: string;
  ipAddress: string | null;
  userAgent: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  userEmail?: string | null;
};

export type AuthAuditLogListResponse = {
  data: AuthAuditLog[];
  total: number;
  page: number;
  limit: number;
};

export type AuthAuditLogFilters = {
  userId?: string;
  tenantId?: string;
  action?: string;
  from?: string;
  to?: string;
  search?: string;
  page?: number;
  limit?: number;
};

export type PlatformOrganization = {
  id: string;
  name: string;
  code: string;
  description: string | null;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
};

export type CreatePlatformOrganizationPayload = {
  name: string;
  code: string;
  description?: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone?: string;
  tenantId?: string;
};

export type CreatePlatformOrganizationResponse = {
  organization: PlatformOrganization;
  message: string;
};

export type UpdatePlatformOrganizationPayload = {
  name?: string;
  code?: string;
  description?: string | null;
  primaryContactName?: string;
  primaryContactEmail?: string;
  primaryContactPhone?: string | null;
  status?: "ACTIVE" | "INACTIVE";
};

export type UpdatePlatformOrganizationResponse = {
  organization: PlatformOrganization;
  message: string;
};

export type OrganizationStatusChangeResponse = {
  organization: PlatformOrganization;
  message: string;
};

export type OrganizationLinkedTenant = {
  id: string;
  name: string;
  code: string;
  slug: string;
  domain: string | null;
  status: "ACTIVE" | "SUSPENDED";
  isActive: boolean;
  organizationId: string | null;
};

export type OrganizationTenantListResponse = {
  data: OrganizationLinkedTenant[];
};

export type OrganizationTenantLinkResponse = {
  tenant: OrganizationLinkedTenant;
  message: string;
};

export type PlatformOrganizationConfigNamespace =
  | "branding"
  | "features"
  | "integrations"
  | "preferences";

export type PlatformOrganizationBrandingConfig = {
  primaryColor: string;
  logoUrl?: string | null;
  darkMode: boolean;
};

export type PlatformOrganizationFeaturesConfig = {
  multiTenantSupport: boolean;
  advancedReporting: boolean;
  auditLogs: boolean;
};

export type PlatformOrganizationIntegrationsConfig = {
  stripePublicKey?: string | null;
  stripeSecretKey?: string | null;
  emailProviderApiKey?: string | null;
};

export type PlatformOrganizationPreferencesConfig = {
  timezone: string;
  language: string;
  dateFormat: string;
};

export type PlatformOrganizationConfigData =
  | PlatformOrganizationBrandingConfig
  | PlatformOrganizationFeaturesConfig
  | PlatformOrganizationIntegrationsConfig
  | PlatformOrganizationPreferencesConfig
  | Record<string, unknown>;

export type PlatformOrganizationConfigRecord = {
  namespace: PlatformOrganizationConfigNamespace;
  data: PlatformOrganizationConfigData;
  updatedAt: string | null;
  updatedByUserId: string | null;
  isDefault: boolean;
};

export type PlatformOrganizationConfigNamespaceSummary = {
  namespace: PlatformOrganizationConfigNamespace;
  updatedAt: string | null;
  isDefault: boolean;
};

export type PlatformOrganizationConfigNamespacesResponse = {
  namespaces: PlatformOrganizationConfigNamespaceSummary[];
};

export type UpdatePlatformOrganizationConfigResponse = {
  config: PlatformOrganizationConfigRecord;
  message: string;
};

export type OrganizationListFilters = {
  page?: number;
  limit?: number;
  search?: string;
  status?: "ACTIVE" | "INACTIVE";
  sortBy?: "name" | "code" | "primaryContactName" | "primaryContactEmail" | "status" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
};

export type PlatformOrganizationListResponse = {
  data: PlatformOrganization[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
