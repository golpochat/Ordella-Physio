import type { Organization, OrganizationSubscriptionStatus } from "@/generated/prisma";
import type { OrganizationRecord, OrganizationSubscriptionStatus as ApiSubscriptionStatus } from "@/models/Organization";
import { billingModelFromDb } from "@/validators/organization.validator";

export function subscriptionStatusFromDb(
  status: OrganizationSubscriptionStatus | null,
): ApiSubscriptionStatus | null {
  if (!status) return null;
  return status as ApiSubscriptionStatus;
}

export function subscriptionStatusToDb(
  status: string,
): OrganizationSubscriptionStatus | null {
  const normalized = status.toUpperCase().replace(/-/g, "_");
  if (normalized === "TRIALING") return "TRIALING";
  if (normalized === "PAST_DUE" || normalized === "UNPAID") return "PAST_DUE";
  if (normalized === "CANCELED" || normalized === "CANCELLED") return "CANCELED";
  if (normalized === "ACTIVE") return "ACTIVE";
  return null;
}

export type AuthenticatedOrganizationUser = {
  userId: string;
  tenantId: string;
  role: string;
  email?: string;
  permissions?: string[];
};

export function toOrganizationResponse(organization: Organization): OrganizationRecord {
  return {
    id: organization.id,
    name: organization.name,
    code: organization.code,
    organizationCode: organization.code,
    description: organization.description,
    primaryContactName: organization.primaryContactName,
    primaryContactEmail: organization.primaryContactEmail,
    primaryContactPhone: organization.primaryContactPhone,
    billingModel: billingModelFromDb(organization.billingModel),
    stripeCustomerId: organization.stripeCustomerId,
    stripeSubscriptionId: organization.stripeSubscriptionId,
    subscriptionStatus: subscriptionStatusFromDb(organization.subscriptionStatus),
    status: organization.status,
    createdAt: organization.createdAt.toISOString(),
    updatedAt: organization.updatedAt.toISOString(),
  };
}
