export const BILLING_MODELS = ["tenant-level", "organization-level"] as const;

export type BillingModel = (typeof BILLING_MODELS)[number];

export const PLATFORM_SUBSCRIPTION_STATUSES = [
  "ACTIVE",
  "TRIALING",
  "PAST_DUE",
  "CANCELED",
] as const;

export type PlatformSubscriptionStatus = (typeof PLATFORM_SUBSCRIPTION_STATUSES)[number];

export type BillingEntityType = "tenant" | "organization";

export type BillingTruthContext = {
  billingModel: BillingModel;
  billingEntity: BillingEntityType;
  organizationId: string | null;
  organizationName: string | null;
  tenantId: string;
  canManageBillingAtTenant: boolean;
  canManageBillingAtOrganization: boolean;
  billingAdmin: "tenant-owner" | "organization-contact";
  clinicBillingPath: "/clinic/billing";
  organizationBillingPath: "/organization/billing";
  upgradePath: string;
  subscriptionStatus: PlatformSubscriptionStatus | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  aiNotesUsageCount: number;
};

export function normalizePlatformSubscriptionStatus(
  status: string | null | undefined,
): PlatformSubscriptionStatus | null {
  if (!status) return null;
  const normalized = status.toUpperCase().replace(/-/g, "_");
  if (normalized === "TRIALING") return "TRIALING";
  if (normalized === "PAST_DUE" || normalized === "UNPAID") return "PAST_DUE";
  if (normalized === "CANCELED" || normalized === "CANCELLED") return "CANCELED";
  if (normalized === "ACTIVE") return "ACTIVE";
  return null;
}

export function isOrganizationLevelBilling(billingModel: BillingModel | string | null | undefined) {
  return billingModel === "organization-level";
}

export function resolveBillingEntityType(billingModel: BillingModel | string): BillingEntityType {
  return isOrganizationLevelBilling(billingModel) ? "organization" : "tenant";
}

export function buildStripeCustomerMetadata(input: {
  billingModel: BillingModel;
  organizationId: string;
  tenantId?: string;
}): Record<string, string> {
  if (isOrganizationLevelBilling(input.billingModel)) {
    return { organizationId: input.organizationId };
  }

  return {
    tenantId: input.tenantId ?? "",
    organizationId: input.organizationId,
  };
}

export function buildBillingTruthContext(input: {
  tenantId: string;
  organizationId: string | null;
  organizationName: string | null;
  billingModel: BillingModel;
  tenantSubscriptionStatus?: string | null;
  tenantStripeCustomerId?: string | null;
  tenantStripeSubscriptionId?: string | null;
  organizationSubscriptionStatus?: string | null;
  organizationStripeCustomerId?: string | null;
  organizationStripeSubscriptionId?: string | null;
  aiNotesUsageCount?: number;
}): BillingTruthContext {
  const billingEntity = resolveBillingEntityType(input.billingModel);
  const organizationLevel = billingEntity === "organization";

  const subscriptionStatus = organizationLevel
    ? normalizePlatformSubscriptionStatus(input.organizationSubscriptionStatus)
    : normalizePlatformSubscriptionStatus(input.tenantSubscriptionStatus);

  const stripeCustomerId = organizationLevel
    ? (input.organizationStripeCustomerId ?? null)
    : (input.tenantStripeCustomerId ?? null);

  const stripeSubscriptionId = organizationLevel
    ? (input.organizationStripeSubscriptionId ?? null)
    : (input.tenantStripeSubscriptionId ?? null);

  return {
    billingModel: input.billingModel,
    billingEntity,
    organizationId: input.organizationId,
    organizationName: input.organizationName,
    tenantId: input.tenantId,
    canManageBillingAtTenant: !organizationLevel,
    canManageBillingAtOrganization: organizationLevel,
    billingAdmin: organizationLevel ? "organization-contact" : "tenant-owner",
    clinicBillingPath: "/clinic/billing",
    organizationBillingPath: "/organization/billing",
    upgradePath: organizationLevel ? "/organization/billing/upgrade" : "/clinic/billing/upgrade",
    subscriptionStatus,
    stripeCustomerId,
    stripeSubscriptionId,
    aiNotesUsageCount: input.aiNotesUsageCount ?? 0,
  };
}
