export type PlatformTenant = {
  id: string;
  name: string;
  slug: string;
  timezone: string;
  currency: string;
  address: string | null;
  phone: string | null;
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
  slug: string;
  timezone?: string;
  currency?: string;
  address?: string;
  phone?: string;
};

export type UpdatePlatformTenantPayload = Partial<
  Omit<CreatePlatformTenantPayload, "slug">
>;

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
