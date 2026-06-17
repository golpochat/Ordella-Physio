import type Stripe from "stripe";

export type BillingEntityKind = "tenant" | "organization" | "unknown";

export type ClassifiedCustomer = {
  customerId: string;
  entity: BillingEntityKind;
  tenantId?: string;
  organizationId?: string;
};

export type ClassifiedBillingEntity = {
  entity: Exclude<BillingEntityKind, "unknown">;
  tenantId?: string;
  organizationId?: string;
};

export function classifyStripeCustomer(customer: Stripe.Customer): ClassifiedCustomer | null {
  const tenantId = customer.metadata?.tenantId?.trim();
  const organizationId = customer.metadata?.organizationId?.trim();

  if (tenantId) {
    return {
      customerId: customer.id,
      entity: "tenant",
      tenantId,
      organizationId: organizationId || undefined,
    };
  }

  if (organizationId) {
    return {
      customerId: customer.id,
      entity: "organization",
      organizationId,
    };
  }

  return null;
}

export function classifyBillingEntity(
  subscription: Stripe.Subscription,
  customer?: ClassifiedCustomer | null,
): ClassifiedBillingEntity | null {
  const tenantId = subscription.metadata?.tenantId?.trim() || customer?.tenantId;
  const organizationId =
    subscription.metadata?.organizationId?.trim() || customer?.organizationId;

  if (tenantId) {
    return {
      entity: "tenant",
      tenantId,
      organizationId: organizationId || undefined,
    };
  }

  if (organizationId) {
    return {
      entity: "organization",
      organizationId,
    };
  }

  if (customer && customer.entity !== "unknown") {
    return {
      entity: customer.entity,
      tenantId: customer.tenantId,
      organizationId: customer.organizationId,
    };
  }

  return null;
}

export function monthlyAmountCents(
  unitAmount: number | null | undefined,
  recurring: Stripe.Price.Recurring | null | undefined,
  quantity = 1,
): number {
  if (!unitAmount || unitAmount <= 0) {
    return 0;
  }

  const qty = Math.max(1, quantity);
  const amount = unitAmount * qty;
  const interval = recurring?.interval ?? "month";
  const intervalCount = recurring?.interval_count ?? 1;

  switch (interval) {
    case "year":
      return Math.round(amount / (12 * intervalCount));
    case "month":
      return Math.round(amount / intervalCount);
    case "week":
      return Math.round((amount * 52) / (12 * intervalCount));
    case "day":
      return Math.round((amount * 365) / (12 * intervalCount));
    default:
      return Math.round(amount / intervalCount);
  }
}

export function isActiveMrrSubscription(status: Stripe.Subscription.Status): boolean {
  return status === "active";
}

export function subscriptionStatusBucket(status: Stripe.Subscription.Status):
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "other" {
  if (status === "active") return "active";
  if (status === "trialing") return "trialing";
  if (status === "past_due" || status === "unpaid") return "past_due";
  if (status === "canceled" || status === "incomplete_expired") return "canceled";
  return "other";
}

export function computeChurnRatePercent(input: {
  activeSubscriptions: number;
  trialingSubscriptions: number;
  pastDueSubscriptions: number;
  canceledSubscriptions: number;
}): number {
  const denominator =
    input.activeSubscriptions +
    input.trialingSubscriptions +
    input.pastDueSubscriptions +
    input.canceledSubscriptions;

  if (denominator <= 0) {
    return 0;
  }

  return Math.round((input.canceledSubscriptions / denominator) * 10_000) / 100;
}

export function isAiNotesPrice(priceId: string | undefined, aiNotesPriceId: string | undefined): boolean {
  return Boolean(priceId && aiNotesPriceId && priceId === aiNotesPriceId);
}

export function isBasePlanPrice(
  priceId: string | undefined,
  basePlanPriceIds: ReadonlySet<string>,
): boolean {
  return Boolean(priceId && basePlanPriceIds.has(priceId));
}
