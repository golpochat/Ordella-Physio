import type { SubscriptionStatus, TenantSubscription as TenantSubscriptionRecord } from "@/generated/prisma";
import type { PlanResponse } from "@/models/Plan";
import { toPlanResponse, type PlanRecord } from "@/models/Plan";

export type { TenantSubscriptionRecord, SubscriptionStatus };

export type TenantSubscriptionResponse = {
  id: string;
  tenantId: string;
  planId: string;
  plan?: PlanResponse;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  status: SubscriptionStatus;
  trialEndsAt: string | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
};

export function toTenantSubscriptionResponse(
  record: TenantSubscriptionRecord & { plan?: PlanRecord },
): TenantSubscriptionResponse {
  return {
    id: record.id,
    tenantId: record.tenantId,
    planId: record.planId,
    plan: record.plan ? toPlanResponse(record.plan) : undefined,
    stripeCustomerId: record.stripeCustomerId,
    stripeSubscriptionId: record.stripeSubscriptionId,
    status: record.status,
    trialEndsAt: record.trialEndsAt?.toISOString() ?? null,
    currentPeriodStart: record.currentPeriodStart?.toISOString() ?? null,
    currentPeriodEnd: record.currentPeriodEnd?.toISOString() ?? null,
    cancelAtPeriodEnd: record.cancelAtPeriodEnd,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}
