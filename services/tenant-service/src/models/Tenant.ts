export const TENANT_STATUSES = ["ACTIVE", "SUSPENDED"] as const;

export type TenantStatus = (typeof TENANT_STATUSES)[number];

export type TenantRecord = {
  id: string;
  name: string;
  code: string;
  tenantCode: string;
  slug: string;
  ownerUserId: string | null;
  timezone: string;
  currency: string;
  status: TenantStatus;
  address: string | null;
  phone: string | null;
  stripeCustomerId: string | null;
  homeRegion: string;
  isActive: boolean;
  organizationId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SuperAdminCreateTenantPayload = {
  tenantName?: string;
  organizationId?: string;
  timezone?: string;
  currency?: string;
  ownerUserId?: string;
  ownerEmail?: string;
};

export type CreateTenantPayload = SuperAdminCreateTenantPayload;

export type NormalizedCreateTenantPayload = {
  name: string;
  organizationId: string;
  timezone: string;
  currency: string;
  ownerUserId?: string;
  ownerEmail?: string;
};

export type UpdateTenantPayload = {
  name?: string;
  timezone?: string;
  currency?: string;
  status?: TenantStatus | string;
  address?: string;
  phone?: string;
};

export type TenantValidationFieldError = {
  field: string;
  message: string;
};

export type ProvisionTenantSuccess = {
  tenantId: string;
  tenantName: string;
  ownerUserId: string;
  ownerEmail: string;
  organizationId: string;
  organizationName: string;
  tenant: TenantRecord;
  message: string;
};
