import { Injectable } from "@nestjs/common";
import type { PlanRecord } from "@/models/Plan";
import { PlanRepository } from "@/repositories/plan.repository";
import { SubscriptionInvoiceRepository } from "@/repositories/subscription-invoice.repository";
import { TenantSubscriptionRepository } from "@/repositories/tenant-subscription.repository";

type SubscriptionWithPlan = Awaited<ReturnType<TenantSubscriptionRepository["listAll"]>>[number];

@Injectable()
export class RevenueAnalyticsService {
  constructor(
    private readonly subscriptionRepository: TenantSubscriptionRepository,
    private readonly planRepository: PlanRepository,
    private readonly invoiceRepository: SubscriptionInvoiceRepository,
  ) {}

  async getRevenueMetrics(tenantId?: string) {
    const [mrr, arr, churnRate, ltv, breakdown] = await Promise.all([
      this.getMRR(tenantId),
      this.getARR(tenantId),
      this.getChurnRate(),
      this.getLTV(),
      this.getRevenueBreakdown(),
    ]);

    return { mrr, arr, churnRate, ltv, breakdown };
  }

  async getMRR(tenantId?: string) {
    const subscriptions = await this.loadSubscriptions(tenantId);
    const active = subscriptions.filter((sub) => ["ACTIVE", "TRIALING"].includes(sub.status));
    const cents = active.reduce((sum, sub) => sum + this.monthlyValueCents(sub), 0);

    return {
      cents,
      currency: active[0]?.plan?.currency ?? "EUR",
      activeSubscriptions: active.length,
    };
  }

  async getARR(tenantId?: string) {
    const mrr = await this.getMRR(tenantId);
    return {
      cents: mrr.cents * 12,
      currency: mrr.currency,
    };
  }

  async getChurnRate() {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const [startingActive, canceled] = await Promise.all([
      this.subscriptionRepository.countByStatus("ACTIVE"),
      this.subscriptionRepository.countCanceledSince(thirtyDaysAgo),
    ]);

    const startingMrr = startingActive || 1;
    const rate = canceled / startingMrr;

    return {
      rate: Number(rate.toFixed(4)),
      canceledLast30Days: canceled,
      activeSubscriptions: startingActive,
    };
  }

  async getLTV() {
    const mrr = await this.getMRR();
    const churn = await this.getChurnRate();
    const activeCount = mrr.activeSubscriptions || 1;
    const arpu = mrr.cents / activeCount;
    const monthlyChurn = Math.max(churn.rate, 0.01);
    const months = 1 / monthlyChurn;

    return {
      cents: Math.round(arpu * months),
      currency: mrr.currency,
      averageRevenuePerUserCents: Math.round(arpu),
      estimatedLifetimeMonths: Number(months.toFixed(1)),
    };
  }

  async getRevenueBreakdown() {
    const [subscriptions, plans, invoices] = await Promise.all([
      this.subscriptionRepository.listAll(),
      this.planRepository.listAll(),
      this.invoiceRepository.listAll({ status: "PAID" }),
    ]);

    const planMap = new Map(plans.map((plan) => [plan.id, plan]));
    const byPlan = new Map<string, { planId: string; planName: string; mrrCents: number; tenants: number }>();
    const byRegion = new Map<string, number>();
    const byTenant = new Map<string, number>();

    for (const subscription of subscriptions.filter((sub) =>
      ["ACTIVE", "TRIALING", "PAST_DUE"].includes(sub.status),
    )) {
      const plan = subscription.plan ?? planMap.get(subscription.planId);
      const monthly = this.monthlyValueCents(subscription);
      const planEntry = byPlan.get(subscription.planId) ?? {
        planId: subscription.planId,
        planName: plan?.name ?? subscription.planId,
        mrrCents: 0,
        tenants: 0,
      };
      planEntry.mrrCents += monthly;
      planEntry.tenants += 1;
      byPlan.set(subscription.planId, planEntry);

      const region = this.regionFromCurrency(plan?.currency ?? "EUR");
      byRegion.set(region, (byRegion.get(region) ?? 0) + monthly);
      byTenant.set(subscription.tenantId, (byTenant.get(subscription.tenantId) ?? 0) + monthly);
    }

    const paidRevenueCents = invoices.reduce((sum, invoice) => sum + invoice.amountPaid, 0);

    return {
      byPlan: [...byPlan.values()].sort((a, b) => b.mrrCents - a.mrrCents),
      byRegion: [...byRegion.entries()].map(([region, mrrCents]) => ({ region, mrrCents })),
      byTenant: [...byTenant.entries()]
        .map(([tenantId, mrrCents]) => ({ tenantId, mrrCents }))
        .sort((a, b) => b.mrrCents - a.mrrCents)
        .slice(0, 20),
      paidInvoiceRevenueCents: paidRevenueCents,
    };
  }

  async getMrrTrend(months = 6) {
    const subscriptions = await this.subscriptionRepository.listAll();
    const now = new Date();
    const points = [];

    for (let index = months - 1; index >= 0; index -= 1) {
      const labelDate = new Date(now.getFullYear(), now.getMonth() - index, 1);
      const label = labelDate.toLocaleDateString("en-IE", { month: "short", year: "2-digit" });
      const active = subscriptions.filter((sub) =>
        ["ACTIVE", "TRIALING"].includes(sub.status),
      );
      const cents = active.reduce((sum, sub) => sum + this.monthlyValueCents(sub), 0);
      points.push({ label, value: cents / 100 });
    }

    return points;
  }

  private async loadSubscriptions(tenantId?: string) {
    if (tenantId) {
      const subscription = await this.subscriptionRepository.findByTenantId(tenantId);
      return subscription ? [subscription] : [];
    }
    return this.subscriptionRepository.listAll();
  }

  private monthlyValueCents(subscription: SubscriptionWithPlan) {
    const plan = subscription.plan as PlanRecord | undefined;
    if (!plan) {
      return 0;
    }

    if (subscription.billingCycle === "yearly") {
      return Math.round(plan.priceYearly / 12);
    }

    return plan.priceMonthly;
  }

  private regionFromCurrency(currency: string) {
    switch (currency.toUpperCase()) {
      case "USD":
      case "CAD":
        return "Americas";
      case "GBP":
        return "United Kingdom";
      case "AUD":
      case "NZD":
        return "Oceania";
      default:
        return "Europe";
    }
  }
}
