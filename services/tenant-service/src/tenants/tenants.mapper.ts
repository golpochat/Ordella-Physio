import type { Location, Staff, Tenant, TenantBranding, TenantSubscription } from "@/generated/prisma";

export type TenantResponse = {
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

export type TenantDetailResponse = TenantResponse & {
  branding?: ReturnType<typeof toBrandingResponse>;
  subscription?: ReturnType<typeof toSubscriptionResponse>;
  locations?: ReturnType<typeof toLocationResponse>[];
  staff?: ReturnType<typeof toStaffResponse>[];
};

export function toTenantResponse(tenant: Tenant): TenantResponse {
  return {
    id: tenant.id,
    name: tenant.name,
    slug: tenant.slug,
    timezone: tenant.timezone,
    currency: tenant.currency,
    address: tenant.address,
    phone: tenant.phone,
    isActive: tenant.isActive,
    createdAt: tenant.createdAt.toISOString(),
    updatedAt: tenant.updatedAt.toISOString(),
  };
}

export function toBrandingResponse(branding: TenantBranding) {
  return {
    logoUrl: branding.logoUrl,
    primaryColor: branding.primaryColor,
    secondaryColor: branding.secondaryColor,
    theme: branding.theme,
    emailTemplateKey: branding.emailTemplateKey,
    metadata: branding.metadata,
    updatedAt: branding.updatedAt.toISOString(),
  };
}

export function toSubscriptionResponse(subscription: TenantSubscription) {
  return {
    plan: subscription.plan,
    usageLimit: subscription.usageLimit,
    usageCurrent: subscription.usageCurrent,
    renewsAt: subscription.renewsAt?.toISOString() ?? null,
    updatedAt: subscription.updatedAt.toISOString(),
  };
}

export function toLocationResponse(location: Location) {
  return {
    id: location.id,
    tenantId: location.tenantId,
    name: location.name,
    address: location.address,
    phone: location.phone,
    isArchived: location.isArchived,
    createdAt: location.createdAt.toISOString(),
    updatedAt: location.updatedAt.toISOString(),
  };
}

export function toStaffResponse(staff: Staff) {
  return {
    id: staff.id,
    tenantId: staff.tenantId,
    userId: staff.userId,
    role: staff.role,
    createdAt: staff.createdAt.toISOString(),
    updatedAt: staff.updatedAt.toISOString(),
  };
}
