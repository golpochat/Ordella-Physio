import { Injectable, Logger } from "@nestjs/common";
import { billingConfig } from "@ordella/config";
import type Stripe from "stripe";
import { PlatformMetricsCacheService } from "@/stripe/platform-metrics-cache.service";
import { StripeClient } from "@/stripe/stripe.client";
import {
  classifyBillingEntity,
  classifyStripeCustomer,
  computeChurnRatePercent,
  isActiveMrrSubscription,
  isAiNotesPrice,
  isBasePlanPrice,
  monthlyAmountCents,
  subscriptionStatusBucket,
  type BillingEntityKind,
  type ClassifiedCustomer,
} from "@/stripe/stripe-platform-metrics.utils";

export type StripeLivePlatformMetrics = {
  mrrStripeLive: number;
  arrStripeLive: number;
  activeSubscriptions: number;
  trialingSubscriptions: number;
  pastDueSubscriptions: number;
  canceledSubscriptions: number;
  churnRate: number;
  usageRevenue: number;
  tenantRevenue: number;
  organizationRevenue: number;
  aiNotesUsage: number;
  aiNotesRevenue: number;
  lastUpdatedAt: string;
};

type RevenueAccumulator = {
  tenant: number;
  organization: number;
  usage: number;
};

type AiNotesAccumulator = {
  usage: number;
  revenueCents: number;
};

@Injectable()
export class StripePlatformMetricsService {
  private readonly logger = new Logger(StripePlatformMetricsService.name);

  constructor(
    private readonly stripeClient: StripeClient,
    private readonly platformMetricsCache: PlatformMetricsCacheService,
  ) {}

  async getStripeLivePlatformMetrics(): Promise<StripeLivePlatformMetrics> {
    const cached = this.platformMetricsCache.get();
    if (cached) {
      return cached;
    }

    const metrics = await this.computeStripeLivePlatformMetrics();
    this.platformMetricsCache.set(metrics);
    return metrics;
  }

  invalidateCache(): void {
    this.platformMetricsCache.invalidate();
  }

  private async computeStripeLivePlatformMetrics(): Promise<StripeLivePlatformMetrics> {
    const stripe = this.stripeClient.getClient();
    const aiNotesPriceId = billingConfig.stripePriceAiNotes ?? process.env.STRIPE_PRICE_AI_NOTES;
    const basePlanPriceIds = new Set(
      [
        billingConfig.stripePriceStarter ?? process.env.STRIPE_PRICE_STARTER,
        billingConfig.stripePricePro ?? process.env.STRIPE_PRICE_PRO,
        billingConfig.stripePriceEnterprise ?? process.env.STRIPE_PRICE_ENTERPRISE,
      ].filter((value): value is string => Boolean(value)),
    );

    const [customers, subscriptions, invoices] = await Promise.all([
      this.listAllCustomers(stripe),
      this.listAllSubscriptions(stripe),
      this.listRecentPaidInvoices(stripe),
    ]);

    const customerIndex = new Map<string, ClassifiedCustomer>();
    for (const customer of customers) {
      const classified = classifyStripeCustomer(customer);
      if (classified) {
        customerIndex.set(classified.customerId, classified);
      }
    }

    const subscriptionItemsBySubscription = await this.listAllSubscriptionItems(
      stripe,
      subscriptions,
    );

    let activeSubscriptions = 0;
    let trialingSubscriptions = 0;
    let pastDueSubscriptions = 0;
    let canceledSubscriptions = 0;

    const mrrAccumulator: RevenueAccumulator = { tenant: 0, organization: 0, usage: 0 };
    const aiNotesAccumulator: AiNotesAccumulator = { usage: 0, revenueCents: 0 };

    for (const subscription of subscriptions) {
      const customerId = this.resolveCustomerId(subscription.customer);
      const customer = customerIndex.get(customerId);
      const entity = classifyBillingEntity(subscription, customer);
      if (!entity) {
        continue;
      }

      const bucket = subscriptionStatusBucket(subscription.status);

      if (bucket === "active") activeSubscriptions += 1;
      if (bucket === "trialing") trialingSubscriptions += 1;
      if (bucket === "past_due") pastDueSubscriptions += 1;
      if (bucket === "canceled") canceledSubscriptions += 1;

      if (!isActiveMrrSubscription(subscription.status)) {
        continue;
      }

      const subscriptionItems =
        subscriptionItemsBySubscription.get(subscription.id) ?? subscription.items.data;

      for (const item of subscriptionItems) {
        const price = item.price;
        if (!price) continue;

        const monthly = monthlyAmountCents(price.unit_amount, price.recurring, item.quantity ?? 1);

        if (isAiNotesPrice(price.id, aiNotesPriceId) || price.recurring?.usage_type === "metered") {
          const metered = await this.sumMeteredUsageMonthlyCents(
            stripe,
            item,
            price,
            aiNotesPriceId,
          );
          mrrAccumulator.usage += metered;

          if (isAiNotesPrice(price.id, aiNotesPriceId)) {
            const usage = await this.sumUsageRecordQuantity(stripe, item.id);
            aiNotesAccumulator.usage += usage;
            aiNotesAccumulator.revenueCents += metered;
          }
          continue;
        }

        if (isBasePlanPrice(price.id, basePlanPriceIds)) {
          this.addEntityRevenue(mrrAccumulator, entity.entity, monthly);
          continue;
        }

        this.addEntityRevenue(mrrAccumulator, entity.entity, monthly);
      }
    }

    const invoiceAiNotes = this.collectInvoiceAiNotesMetrics(
      invoices,
      aiNotesPriceId,
      customerIndex,
    );

    if (aiNotesAccumulator.usage <= 0) {
      aiNotesAccumulator.usage = invoiceAiNotes.usage;
    }
    if (aiNotesAccumulator.revenueCents <= 0) {
      aiNotesAccumulator.revenueCents = invoiceAiNotes.revenueCents;
    }

    const tenantRevenue = mrrAccumulator.tenant;
    const organizationRevenue = mrrAccumulator.organization;
    const usageRevenue = mrrAccumulator.usage;
    const mrrStripeLive = tenantRevenue + organizationRevenue + usageRevenue;

    return {
      mrrStripeLive,
      arrStripeLive: mrrStripeLive * 12,
      activeSubscriptions,
      trialingSubscriptions,
      pastDueSubscriptions,
      canceledSubscriptions,
      churnRate: computeChurnRatePercent({
        activeSubscriptions,
        trialingSubscriptions,
        pastDueSubscriptions,
        canceledSubscriptions,
      }),
      usageRevenue,
      tenantRevenue,
      organizationRevenue,
      aiNotesUsage: aiNotesAccumulator.usage,
      aiNotesRevenue: aiNotesAccumulator.revenueCents,
      lastUpdatedAt: new Date().toISOString(),
    };
  }

  private addEntityRevenue(
    accumulator: RevenueAccumulator,
    entity: Exclude<BillingEntityKind, "unknown">,
    amount: number,
  ) {
    if (entity === "tenant") {
      accumulator.tenant += amount;
    } else {
      accumulator.organization += amount;
    }
  }

  private async listAllCustomers(stripe: Stripe): Promise<Stripe.Customer[]> {
    const customers: Stripe.Customer[] = [];
    for await (const customer of stripe.customers.list({ limit: 100 })) {
      if ("deleted" in customer && customer.deleted) {
        continue;
      }
      const classified = classifyStripeCustomer(customer as Stripe.Customer);
      if (classified) {
        customers.push(customer as Stripe.Customer);
      }
    }
    return customers;
  }

  private async listAllSubscriptions(stripe: Stripe): Promise<Stripe.Subscription[]> {
    const subscriptions: Stripe.Subscription[] = [];
    for await (const subscription of stripe.subscriptions.list({
      limit: 100,
      status: "all",
      expand: ["data.items.data.price"],
    })) {
      subscriptions.push(subscription);
    }
    return subscriptions;
  }

  private async listAllSubscriptionItems(
    stripe: Stripe,
    subscriptions: Stripe.Subscription[],
  ): Promise<Map<string, Stripe.SubscriptionItem[]>> {
    const itemsBySubscription = new Map<string, Stripe.SubscriptionItem[]>();

    await Promise.all(
      subscriptions.map(async (subscription) => {
        const items: Stripe.SubscriptionItem[] = [];
        for await (const item of stripe.subscriptionItems.list({
          subscription: subscription.id,
          limit: 100,
          expand: ["data.price"],
        })) {
          items.push(item);
        }
        itemsBySubscription.set(subscription.id, items);
      }),
    );

    return itemsBySubscription;
  }

  private async listRecentPaidInvoices(stripe: Stripe): Promise<Stripe.Invoice[]> {
    const startOfMonth = Math.floor(
      new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1).getTime() / 1000,
    );
    const invoices: Stripe.Invoice[] = [];
    for await (const invoice of stripe.invoices.list({
      limit: 100,
      status: "paid",
      created: { gte: startOfMonth },
      expand: ["data.lines.data.price"],
    })) {
      invoices.push(invoice);
    }
    return invoices;
  }

  private async sumUsageRecordQuantity(stripe: Stripe, subscriptionItemId: string): Promise<number> {
    let totalUsage = 0;

    try {
      for await (const summary of stripe.subscriptionItems.listUsageRecordSummaries(
        subscriptionItemId,
        { limit: 100 },
      )) {
        totalUsage += summary.total_usage ?? 0;
      }
    } catch (error) {
      this.logger.warn(
        `Unable to read usage record summaries for subscription item ${subscriptionItemId}: ${String(error)}`,
      );
    }

    return totalUsage;
  }

  private async sumMeteredUsageMonthlyCents(
    stripe: Stripe,
    item: Stripe.SubscriptionItem,
    price: Stripe.Price,
    aiNotesPriceId: string | undefined,
  ): Promise<number> {
    if (!isAiNotesPrice(price.id, aiNotesPriceId) && price.recurring?.usage_type !== "metered") {
      return 0;
    }

    const unitAmount = price.unit_amount ?? 0;
    if (unitAmount <= 0) {
      return 0;
    }

    const totalUsage = await this.sumUsageRecordQuantity(stripe, item.id);
    return totalUsage * unitAmount;
  }

  private collectInvoiceAiNotesMetrics(
    invoices: Stripe.Invoice[],
    aiNotesPriceId: string | undefined,
    customerIndex: Map<string, ClassifiedCustomer>,
  ): AiNotesAccumulator {
    const accumulator: AiNotesAccumulator = { usage: 0, revenueCents: 0 };

    for (const invoice of invoices) {
      const customerId = this.resolveCustomerId(invoice.customer);
      const classified = customerIndex.get(customerId);
      if (!classified || classified.entity === "unknown") {
        continue;
      }

      for (const line of invoice.lines?.data ?? []) {
        const priceId =
          typeof line.price === "string" ? line.price : (line.price as Stripe.Price | null)?.id;
        const metadata = line.metadata ?? {};
        const isAiNotesLine =
          metadata.usageType === "ai_notes" || isAiNotesPrice(priceId, aiNotesPriceId);

        if (!isAiNotesLine) {
          continue;
        }

        accumulator.revenueCents += line.amount ?? 0;
        accumulator.usage += line.quantity ?? 0;
      }
    }

    return accumulator;
  }

  private resolveCustomerId(
    customer: string | Stripe.Customer | Stripe.DeletedCustomer | null | undefined,
  ): string {
    if (!customer) return "";
    return typeof customer === "string" ? customer : customer.id;
  }
}
