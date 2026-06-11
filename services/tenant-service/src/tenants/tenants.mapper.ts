import type { Location, Staff, Tenant, TenantBranding, TenantSubscription } from "@/generated/prisma";

export type TenantResponse = {
  id: string;
  name: string;
  code: string;
  slug: string;
  ownerUserId: string | null;
  timezone: string;
  currency: string;
  address: string | null;
  phone: string | null;
  stripeCustomerId: string | null;
  homeRegion: string;
  status: "ACTIVE" | "SUSPENDED";
  isActive: boolean;
  organizationId: string | null;
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
  const status = tenant.status ?? (tenant.isActive ? "ACTIVE" : "SUSPENDED");

  return {
    id: tenant.id,
    name: tenant.name,
    code: tenant.code ?? tenant.slug,
    slug: tenant.slug,
    ownerUserId: tenant.ownerUserId ?? null,
    timezone: tenant.timezone,
    currency: tenant.currency,
    address: tenant.address,
    phone: tenant.phone,
    stripeCustomerId: tenant.stripeCustomerId,
    homeRegion: tenant.homeRegion,
    status,
    isActive: tenant.isActive,
    organizationId: tenant.organizationId ?? null,
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
    stripeSubscriptionId: subscription.stripeSubscriptionId,
    subscriptionStatus: subscription.subscriptionStatus,
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
    code: location.code,
    addressLine1: location.addressLine1,
    addressLine2: location.addressLine2,
    city: location.city,
    state: location.state,
    postalCode: location.postalCode,
    country: location.country,
    phone: location.phone,
    email: location.email,
    timezone: location.timezone,
    status: location.status,
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
