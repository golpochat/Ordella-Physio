import { Injectable, Logger } from "@nestjs/common";
import Stripe from "stripe";
import type { PlanRecord } from "@/models/Plan";
import { resolveStripeConfig } from "@/config/stripe.config";
import { stripeError } from "@/utils/subscription-errors";

type TenantCustomerInput = {
  tenantId: string;
  email?: string;
  name?: string;
};

@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  private client: Stripe | null = null;

  private getClient(): Stripe | null {
    const config = resolveStripeConfig();
    if (!config.isConfigured()) {
      return null;
    }

    if (!this.client) {
      this.client = new Stripe(config.secretKey);
    }

    return this.client;
  }

  async createCustomer(tenant: TenantCustomerInput) {
    const stripe = this.getClient();
    if (!stripe) {
      return {
        id: `cus_dev_${tenant.tenantId}`,
        email: tenant.email ?? null,
      };
    }

    try {
      const customer = await stripe.customers.create({
        email: tenant.email,
        name: tenant.name,
        metadata: { tenantId: tenant.tenantId },
      });
      return customer;
    } catch (error) {
      this.logger.warn("Stripe createCustomer failed", error);
      throw stripeError();
    }
  }

  async createSubscription(input: {
    customerId: string;
    priceId: string;
    trialDays?: number;
    tenantId: string;
    planName: string;
  }) {
    const stripe = this.getClient();
    if (!stripe) {
      const now = Math.floor(Date.now() / 1000);
      const periodEnd = now + 30 * 24 * 60 * 60;
      const trialEnd = input.trialDays ? now + input.trialDays * 24 * 60 * 60 : null;

      return {
        id: `sub_dev_${input.tenantId}_${Date.now()}`,
        status: trialEnd ? "trialing" : "active",
        current_period_start: now,
        current_period_end: periodEnd,
        trial_end: trialEnd,
        cancel_at_period_end: false,
        items: { data: [{ price: { id: input.priceId } }] },
      } as Stripe.Subscription;
    }

    try {
      return await stripe.subscriptions.create({
        customer: input.customerId,
        items: [{ price: input.priceId }],
        trial_period_days: input.trialDays && input.trialDays > 0 ? input.trialDays : undefined,
        metadata: { tenantId: input.tenantId, planName: input.planName },
        expand: ["latest_invoice.payment_intent"],
      });
    } catch (error) {
      this.logger.warn("Stripe createSubscription failed", error);
      throw stripeError();
    }
  }

  async cancelSubscription(subscriptionId: string, cancelAtPeriodEnd = true) {
    const stripe = this.getClient();
    if (!stripe) {
      return {
        id: subscriptionId,
        status: cancelAtPeriodEnd ? "active" : "canceled",
        cancel_at_period_end: cancelAtPeriodEnd,
        current_period_start: Math.floor(Date.now() / 1000),
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        trial_end: null,
      } as Stripe.Subscription;
    }

    try {
      if (cancelAtPeriodEnd) {
        return await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });
      }
      return await stripe.subscriptions.cancel(subscriptionId);
    } catch (error) {
      this.logger.warn("Stripe cancelSubscription failed", error);
      throw stripeError();
    }
  }

  async getBillingPortalUrl(customerId: string, returnUrl?: string) {
    const config = resolveStripeConfig();
    const stripe = this.getClient();
    if (!stripe) {
      return `${config.frontendUrl}/settings/billing?portal=dev`;
    }

    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl ?? `${config.frontendUrl}/settings/billing`,
      });
      return session.url;
    } catch (error) {
      this.logger.warn("Stripe billing portal failed", error);
      throw stripeError();
    }
  }

  async syncProductsAndPrices(plans: PlanRecord[]) {
    const stripe = this.getClient();
    if (!stripe) {
      return plans.map((plan) => ({
        planId: plan.id,
        stripeProductId: plan.stripeProductId ?? `prod_dev_${plan.id}`,
        stripePriceMonthlyId: plan.stripePriceMonthlyId ?? `price_dev_m_${plan.id}`,
        stripePriceYearlyId: plan.stripePriceYearlyId ?? `price_dev_y_${plan.id}`,
      }));
    }

    const results: Array<{
      planId: string;
      stripeProductId: string;
      stripePriceMonthlyId: string;
      stripePriceYearlyId: string;
    }> = [];

    for (const plan of plans) {
      try {
        const product =
          plan.stripeProductId
            ? await stripe.products.retrieve(plan.stripeProductId)
            : await stripe.products.create({
                name: plan.name,
                description: plan.description,
                metadata: { planId: plan.id },
              });

        const monthlyPrice = plan.stripePriceMonthlyId
          ? await stripe.prices.retrieve(plan.stripePriceMonthlyId)
          : await stripe.prices.create({
              product: product.id,
              unit_amount: plan.priceMonthly,
              currency: plan.currency.toLowerCase(),
              recurring: { interval: "month" },
              metadata: { planId: plan.id, interval: "month" },
            });

        const yearlyPrice = plan.stripePriceYearlyId
          ? await stripe.prices.retrieve(plan.stripePriceYearlyId)
          : await stripe.prices.create({
              product: product.id,
              unit_amount: plan.priceYearly,
              currency: plan.currency.toLowerCase(),
              recurring: { interval: "year" },
              metadata: { planId: plan.id, interval: "year" },
            });

        results.push({
          planId: plan.id,
          stripeProductId: product.id,
          stripePriceMonthlyId: monthlyPrice.id,
          stripePriceYearlyId: yearlyPrice.id,
        });
      } catch (error) {
        this.logger.warn(`Stripe sync failed for plan ${plan.id}`, error);
        throw stripeError(`Stripe sync failed for plan ${plan.name}.`);
      }
    }

    return results;
  }

  constructWebhookEvent(rawBody: Buffer, signature: string) {
    const config = resolveStripeConfig();
    const stripe = this.getClient();
    if (!stripe || !config.webhookSecret) {
      return JSON.parse(rawBody.toString("utf8")) as Stripe.Event;
    }

    return stripe.webhooks.constructEvent(rawBody, signature, config.webhookSecret);
  }

  async reportUsage(stripeSubscriptionItemId: string, quantity: number) {
    const stripe = this.getClient();
    if (!stripe) {
      return `ur_dev_${Date.now()}`;
    }

    try {
      const record = await stripe.subscriptionItems.createUsageRecord(stripeSubscriptionItemId, {
        quantity,
        timestamp: Math.floor(Date.now() / 1000),
        action: "increment",
      });
      return record.id;
    } catch (error) {
      this.logger.warn("Stripe reportUsage failed", error);
      throw stripeError("Failed to report metered usage to Stripe.");
    }
  }

  mapStripeStatus(status: Stripe.Subscription.Status) {
    switch (status) {
      case "active":
        return "ACTIVE" as const;
      case "trialing":
        return "TRIALING" as const;
      case "past_due":
        return "PAST_DUE" as const;
      case "canceled":
        return "CANCELED" as const;
      default:
        return "INCOMPLETE" as const;
    }
  }

  mapInvoiceStatus(status: Stripe.Invoice.Status | null) {
    switch (status) {
      case "draft":
        return "DRAFT" as const;
      case "open":
        return "OPEN" as const;
      case "paid":
        return "PAID" as const;
      case "uncollectible":
        return "UNCOLLECTIBLE" as const;
      case "void":
        return "VOID" as const;
      default:
        return "OPEN" as const;
    }
  }

  async listInvoices(customerId: string, limit = 24) {
    const stripe = this.getClient();
    if (!stripe) {
      return { data: [] as Stripe.Invoice[] };
    }

    try {
      return await stripe.invoices.list({ customer: customerId, limit });
    } catch (error) {
      this.logger.warn("Stripe listInvoices failed", error);
      throw stripeError("Failed to list Stripe invoices.");
    }
  }

  async retrieveInvoice(invoiceId: string) {
    const stripe = this.getClient();
    if (!stripe) {
      return null;
    }

    try {
      return await stripe.invoices.retrieve(invoiceId);
    } catch (error) {
      this.logger.warn("Stripe retrieveInvoice failed", error);
      throw stripeError("Failed to retrieve Stripe invoice.");
    }
  }

  async retrieveUpcomingInvoice(input: {
    customerId: string;
    subscriptionId: string;
    subscriptionItemId: string;
    newPriceId: string;
  }) {
    const stripe = this.getClient();
    if (!stripe) {
      const amount = 2500;
      return {
        amount_due: amount,
        lines: {
          data: [
            { amount: amount, description: "Prorated upgrade charge" },
            { amount: -500, description: "Unused time credit" },
          ],
        },
        currency: "eur",
      } as Stripe.UpcomingInvoice;
    }

    try {
      return await stripe.invoices.retrieveUpcoming({
        customer: input.customerId,
        subscription: input.subscriptionId,
        subscription_items: [
          {
            id: input.subscriptionItemId,
            price: input.newPriceId,
          },
        ],
        subscription_proration_behavior: "create_prorations",
      });
    } catch (error) {
      this.logger.warn("Stripe retrieveUpcomingInvoice failed", error);
      throw stripeError("Failed to preview proration.");
    }
  }

  async updateSubscriptionPlan(input: {
    subscriptionId: string;
    subscriptionItemId: string;
    newPriceId: string;
    prorationBehavior?: Stripe.SubscriptionUpdateParams.ProrationBehavior;
  }) {
    const stripe = this.getClient();
    if (!stripe) {
      const now = Math.floor(Date.now() / 1000);
      return {
        id: input.subscriptionId,
        status: "active",
        current_period_start: now,
        current_period_end: now + 30 * 24 * 60 * 60,
        cancel_at_period_end: false,
        trial_end: null,
        items: { data: [{ id: input.subscriptionItemId, price: { id: input.newPriceId } }] },
      } as Stripe.Subscription;
    }

    try {
      return await stripe.subscriptions.update(input.subscriptionId, {
        items: [{ id: input.subscriptionItemId, price: input.newPriceId }],
        proration_behavior: input.prorationBehavior ?? "create_prorations",
        expand: ["latest_invoice.payment_intent"],
      });
    } catch (error) {
      this.logger.warn("Stripe updateSubscriptionPlan failed", error);
      throw stripeError("Failed to update subscription plan.");
    }
  }

  async retryInvoicePayment(invoiceId: string) {
    const stripe = this.getClient();
    if (!stripe) {
      return { id: invoiceId, status: "paid" } as Stripe.Invoice;
    }

    try {
      return await stripe.invoices.pay(invoiceId);
    } catch (error) {
      this.logger.warn("Stripe retryInvoicePayment failed", error);
      throw stripeError("Failed to retry invoice payment.");
    }
  }

  extractSubscriptionItemId(subscription: Stripe.Subscription) {
    return subscription.items?.data?.[0]?.id ?? null;
  }
}
