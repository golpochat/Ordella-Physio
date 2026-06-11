import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import type Stripe from "stripe";
import type {
  CancelStripeSubscriptionInput,
  CreateCustomerPortalInput,
  CreateStripeCustomerInput,
  CreateStripeSubscriptionInput,
  UpdateStripePaymentMethodInput,
} from "@ordella/validation";
import { StripeClient } from "@/stripe/stripe.client";
import { StripeBillingRepository } from "@/stripe/stripe-billing.repository";
import { TenantSyncClient } from "@/stripe/tenant-sync.client";

@Injectable()
export class StripeBillingService {
  constructor(
    private readonly stripeClient: StripeClient,
    private readonly repository: StripeBillingRepository,
    private readonly tenantSync: TenantSyncClient,
  ) {}

  async createCustomer(dto: CreateStripeCustomerInput) {
    const existing = await this.repository.findAccountByTenantId(dto.tenantId);
    if (existing) {
      return this.toCustomerResponse(existing);
    }

    const stripe = this.stripeClient.getClient();
    const customer = await stripe.customers.create({
      email: dto.email,
      name: dto.name,
      metadata: { tenantId: dto.tenantId },
    });

    const account = await this.repository.createAccount({
      tenantId: dto.tenantId,
      stripeCustomerId: customer.id,
      email: dto.email ?? customer.email ?? null,
    });

    await this.tenantSync.syncBilling({
      tenantId: dto.tenantId,
      stripeCustomerId: customer.id,
    });

    return this.toCustomerResponse(account);
  }

  async createSubscription(tenantId: string, dto: CreateStripeSubscriptionInput) {
    const account = await this.requireAccount(tenantId);
    const stripe = this.stripeClient.getClient();
    const priceId = this.stripeClient.getPriceIdForPlan(dto.plan);

    if (dto.paymentMethodId) {
      await stripe.paymentMethods.attach(dto.paymentMethodId, {
        customer: account.stripeCustomerId,
      });
      await stripe.customers.update(account.stripeCustomerId, {
        invoice_settings: { default_payment_method: dto.paymentMethodId },
      });
      await this.repository.updateAccount(tenantId, {
        defaultPaymentMethodId: dto.paymentMethodId,
      });
    }

    let subscription: Stripe.Subscription;
    if (account.subscription) {
      const existing = await stripe.subscriptions.retrieve(account.subscription.stripeSubscriptionId);
      const itemId = existing.items.data[0]?.id;
      if (!itemId) {
        throw new BadRequestException("Stripe subscription has no billable items");
      }
      subscription = await stripe.subscriptions.update(account.subscription.stripeSubscriptionId, {
        items: [{ id: itemId, price: priceId }],
        proration_behavior: "create_prorations",
        cancel_at_period_end: false,
      });
    } else {
      subscription = await stripe.subscriptions.create({
        customer: account.stripeCustomerId,
        items: [{ price: priceId }],
        metadata: { tenantId, plan: dto.plan },
        expand: ["latest_invoice.payment_intent"],
      });
    }

    const record = await this.repository.upsertSubscription(account.id, {
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      plan: dto.plan,
      status: this.repository.mapStripeStatus(subscription.status),
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
    });

    await this.tenantSync.syncBilling({
      tenantId,
      stripeCustomerId: account.stripeCustomerId,
      stripeSubscriptionId: subscription.id,
      plan: dto.plan,
      subscriptionStatus: subscription.status,
    });

    return this.toSubscriptionResponse(account, record);
  }

  async getSubscription(tenantId: string) {
    const account = await this.repository.findAccountByTenantId(tenantId);
    if (!account) {
      return { tenantId, status: "none", plan: null, subscription: null };
    }
    return this.toSubscriptionResponse(account, account.subscription);
  }

  async listStripeInvoices(tenantId: string) {
    const account = await this.repository.findAccountByTenantId(tenantId);
    if (!account) {
      return [];
    }
    const stripe = this.stripeClient.getClient();
    const invoices = await stripe.invoices.list({
      customer: account.stripeCustomerId,
      limit: 24,
    });

    return invoices.data.map((invoice) => ({
      id: invoice.id,
      number: invoice.number,
      status: invoice.status,
      amountDue: invoice.amount_due,
      amountPaid: invoice.amount_paid,
      currency: invoice.currency,
      hostedInvoiceUrl: invoice.hosted_invoice_url,
      invoicePdf: invoice.invoice_pdf,
      createdAt: new Date(invoice.created * 1000).toISOString(),
      periodStart: invoice.period_start
        ? new Date(invoice.period_start * 1000).toISOString()
        : null,
      periodEnd: invoice.period_end ? new Date(invoice.period_end * 1000).toISOString() : null,
    }));
  }

  async updatePaymentMethod(tenantId: string, dto: UpdateStripePaymentMethodInput) {
    const account = await this.requireAccount(tenantId);
    const stripe = this.stripeClient.getClient();

    await stripe.paymentMethods.attach(dto.paymentMethodId, {
      customer: account.stripeCustomerId,
    });
    await stripe.customers.update(account.stripeCustomerId, {
      invoice_settings: { default_payment_method: dto.paymentMethodId },
    });

    await this.repository.updateAccount(tenantId, {
      defaultPaymentMethodId: dto.paymentMethodId,
    });

    return { tenantId, paymentMethodId: dto.paymentMethodId, updated: true };
  }

  async cancelSubscription(tenantId: string, dto: CancelStripeSubscriptionInput) {
    const account = await this.requireAccount(tenantId);
    if (!account.subscription) {
      throw new NotFoundException("No active subscription found");
    }

    const stripe = this.stripeClient.getClient();
    const subscription = dto.immediately
      ? await stripe.subscriptions.cancel(account.subscription.stripeSubscriptionId)
      : await stripe.subscriptions.update(account.subscription.stripeSubscriptionId, {
          cancel_at_period_end: true,
        });

    await this.repository.upsertSubscription(account.id, {
      stripeSubscriptionId: subscription.id,
      stripePriceId: account.subscription.stripePriceId,
      plan: account.subscription.plan,
      status: this.repository.mapStripeStatus(subscription.status),
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
    });

    await this.tenantSync.syncBilling({
      tenantId,
      stripeCustomerId: account.stripeCustomerId,
      stripeSubscriptionId: subscription.id,
      plan: account.subscription.plan,
      subscriptionStatus: subscription.status,
    });

    return this.toSubscriptionResponse(account, account.subscription);
  }

  async createCustomerPortalSession(tenantId: string, dto: CreateCustomerPortalInput) {
    const account = await this.requireAccount(tenantId);
    const stripe = this.stripeClient.getClient();
    const returnUrl = dto.returnUrl ?? `${this.stripeClient.getFrontendUrl()}/clinic/billing`;

    const session = await stripe.billingPortal.sessions.create({
      customer: account.stripeCustomerId,
      return_url: returnUrl,
    });

    return { url: session.url };
  }

  async handleTenantCreated(payload: { tenantId: string; name: string; slug: string }) {
    return this.createCustomer({
      tenantId: payload.tenantId,
      name: payload.name,
    });
  }

  async handleWebhookEvent(event: Stripe.Event) {
    const processed = await this.repository.hasWebhookEvent(event.id);
    if (processed) {
      return { received: true, duplicate: true };
    }

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await this.handleSubscriptionChange(event.data.object as Stripe.Subscription);
        break;
      case "customer.subscription.deleted":
        await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      case "invoice.paid":
        await this.handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;
      case "invoice.payment_failed":
        await this.handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      default:
        break;
    }

    await this.repository.recordWebhookEvent(event.id, event.type);
    return { received: true };
  }

  private async handleSubscriptionChange(subscription: Stripe.Subscription) {
    const customerId =
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.id;
    const account = await this.repository.findAccountByStripeCustomerId(customerId);
    if (!account) return;

    const plan =
      (subscription.metadata.plan as string | undefined) ??
      account.subscription?.plan ??
      "STARTER";
    const priceId = subscription.items.data[0]?.price.id ?? account.subscription?.stripePriceId ?? "";

    await this.repository.upsertSubscription(account.id, {
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      plan,
      status: this.repository.mapStripeStatus(subscription.status),
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
    });

    await this.tenantSync.syncBilling({
      tenantId: account.tenantId,
      stripeCustomerId: account.stripeCustomerId,
      stripeSubscriptionId: subscription.id,
      plan,
      subscriptionStatus: subscription.status,
    });
  }

  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const customerId =
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.id;
    const account = await this.repository.findAccountByStripeCustomerId(customerId);
    if (!account) return;

    await this.repository.upsertSubscription(account.id, {
      stripeSubscriptionId: subscription.id,
      stripePriceId: account.subscription?.stripePriceId ?? "",
      plan: account.subscription?.plan ?? "STARTER",
      status: "CANCELED",
      currentPeriodStart: account.subscription?.currentPeriodStart ?? null,
      currentPeriodEnd: account.subscription?.currentPeriodEnd ?? null,
      cancelAtPeriodEnd: true,
      canceledAt: new Date(),
    });

    await this.tenantSync.syncBilling({
      tenantId: account.tenantId,
      stripeCustomerId: account.stripeCustomerId,
      stripeSubscriptionId: subscription.id,
      plan: account.subscription?.plan ?? "STARTER",
      subscriptionStatus: "canceled",
    });
  }

  private async handleInvoicePaid(invoice: Stripe.Invoice) {
    const customerId =
      typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
    if (!customerId) return;
    const account = await this.repository.findAccountByStripeCustomerId(customerId);
    if (!account?.subscription) return;

    await this.tenantSync.syncBilling({
      tenantId: account.tenantId,
      stripeCustomerId: account.stripeCustomerId,
      stripeSubscriptionId: account.subscription.stripeSubscriptionId,
      plan: account.subscription.plan,
      subscriptionStatus: "active",
    });
  }

  private async handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
    const customerId =
      typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
    if (!customerId) return;
    const account = await this.repository.findAccountByStripeCustomerId(customerId);
    if (!account?.subscription) return;

    await this.repository.upsertSubscription(account.id, {
      stripeSubscriptionId: account.subscription.stripeSubscriptionId,
      stripePriceId: account.subscription.stripePriceId,
      plan: account.subscription.plan,
      status: "PAST_DUE",
      currentPeriodStart: account.subscription.currentPeriodStart,
      currentPeriodEnd: account.subscription.currentPeriodEnd,
      cancelAtPeriodEnd: account.subscription.cancelAtPeriodEnd,
      canceledAt: account.subscription.canceledAt,
    });

    await this.tenantSync.syncBilling({
      tenantId: account.tenantId,
      stripeCustomerId: account.stripeCustomerId,
      stripeSubscriptionId: account.subscription.stripeSubscriptionId,
      plan: account.subscription.plan,
      subscriptionStatus: "past_due",
    });
  }

  private async requireAccount(tenantId: string) {
    const account = await this.repository.findAccountByTenantId(tenantId);
    if (!account) {
      throw new NotFoundException(
        "Stripe customer not found for tenant. Create a customer first.",
      );
    }
    return account;
  }

  private toCustomerResponse(account: {
    tenantId: string;
    stripeCustomerId: string;
    email: string | null;
    defaultPaymentMethodId: string | null;
  }) {
    return {
      tenantId: account.tenantId,
      stripeCustomerId: account.stripeCustomerId,
      email: account.email,
      defaultPaymentMethodId: account.defaultPaymentMethodId,
    };
  }

  private toSubscriptionResponse(
    account: { tenantId: string; stripeCustomerId: string; defaultPaymentMethodId: string | null },
    subscription: {
      plan: string;
      status: string;
      stripeSubscriptionId: string;
      stripePriceId: string;
      currentPeriodEnd: Date | null;
      cancelAtPeriodEnd: boolean;
      canceledAt: Date | null;
    } | null,
  ) {
    return {
      tenantId: account.tenantId,
      stripeCustomerId: account.stripeCustomerId,
      defaultPaymentMethodId: account.defaultPaymentMethodId,
      status: subscription?.status ?? "none",
      plan: subscription?.plan ?? null,
      subscription: subscription
        ? {
            id: subscription.stripeSubscriptionId,
            priceId: subscription.stripePriceId,
            status: subscription.status,
            plan: subscription.plan,
            currentPeriodEnd: subscription.currentPeriodEnd?.toISOString() ?? null,
            cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
            canceledAt: subscription.canceledAt?.toISOString() ?? null,
          }
        : null,
    };
  }
}
