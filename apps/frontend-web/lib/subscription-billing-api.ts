import type { createApiClient } from "@/lib/api-client";
import type {
  BillingPortalResponse,
  FeatureFlag,
  MrrTrendPoint,
  RevenueMetrics,
  SubscriptionInvoice,
  SubscriptionPlan,
  SubscriptionStatusResponse,
  TenantSubscription,
  UsageRecord,
  UsageSummary,
} from "@/lib/subscription-billing-types";

export function createSubscriptionBillingApi(api: ReturnType<typeof createApiClient>) {
  return {
    listPlans() {
      return api.get<SubscriptionPlan[]>("subscriptionBilling", "/plans");
    },

    getSubscription() {
      return api.get<SubscriptionStatusResponse>("subscriptionBilling", "/subscription");
    },

    subscribe(input: { planId: string; billingCycle?: "monthly" | "yearly" }) {
      return api.post<{ message: string; subscription: TenantSubscription }>(
        "subscriptionBilling",
        "/subscription/subscribe",
        input,
      );
    },

    cancel(input: { immediately?: boolean } = {}) {
      return api.post<{ message: string; subscription: TenantSubscription }>(
        "subscriptionBilling",
        "/subscription/cancel",
        input,
      );
    },

    getBillingPortal(returnUrl?: string) {
      return api.get<BillingPortalResponse>("subscriptionBilling", "/subscription/billing-portal", {
        params: returnUrl ? { returnUrl } : undefined,
      });
    },

    getUsageSummary() {
      return api.get<UsageSummary>("subscriptionBilling", "/usage");
    },

    getUsageHistory() {
      return api.get<UsageRecord[]>("subscriptionBilling", "/usage/history");
    },

    listFeatures() {
      return api.get<FeatureFlag[]>("subscriptionBilling", "/features");
    },

    listInvoices() {
      return api.get<SubscriptionInvoice[]>("subscriptionBilling", "/invoices");
    },

    syncInvoices() {
      return api.post<SubscriptionInvoice[]>("subscriptionBilling", "/invoices/sync", {});
    },

    getBillingPortalStandalone(returnUrl?: string) {
      return api.get<BillingPortalResponse>("subscriptionBilling", "/billing-portal", {
        params: returnUrl ? { returnUrl } : undefined,
      });
    },

    updatePaymentMethod(returnUrl?: string) {
      return api.post<BillingPortalResponse>("subscriptionBilling", "/subscription/update-payment-method", {
        returnUrl,
      });
    },

    getRevenueMetrics(tenantId?: string) {
      return api.get<RevenueMetrics>("subscriptionBilling", "/analytics/revenue", {
        params: tenantId ? { tenantId } : undefined,
      });
    },

    getRevenueTrend(months = 6) {
      return api.get<MrrTrendPoint[]>("subscriptionBilling", "/analytics/revenue/trend", {
        params: { months },
      });
    },
  };
}
