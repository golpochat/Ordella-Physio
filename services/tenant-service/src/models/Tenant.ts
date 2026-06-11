export const TENANT_STATUSES = ["ACTIVE", "SUSPENDED"] as const;

export type TenantStatus = (typeof TENANT_STATUSES)[number];

export type TenantRecord = {
  id: string;
  name: string;
  code: string;
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

export type CreateTenantPayload = {
  name?: string;
  code?: string;
  slug?: string;
  ownerUserId?: string;
  timezone?: string;
  currency?: string;
  address?: string;
  phone?: string;
  homeRegion?: string;
};

export type UpdateTenantPayload = {
  name?: string;
  code?: string;
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
