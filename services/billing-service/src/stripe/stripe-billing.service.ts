import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import type Stripe from "stripe";
import {
  buildStripeCustomerMetadata,
  isOrganizationLevelBilling,
  type BillingTruthContext,
} from "@ordella/shared";
import type {
  CancelStripeSubscriptionInput,
  CreateCustomerPortalInput,
  CreatePlatformCheckoutSessionInput,
  CreateStripeCustomerInput,
  CreateStripeSubscriptionInput,
  UpdateStripePaymentMethodInput,
} from "@ordella/validation";
import { BillingTruthClient } from "@/stripe/billing-truth.client";
import { OrganizationSyncClient } from "@/stripe/organization-sync.client";
import { StripeClient } from "@/stripe/stripe.client";
import { StripeBillingRepository } from "@/stripe/stripe-billing.repository";
import { TenantSyncClient } from "@/stripe/tenant-sync.client";

type TenantBillingAccount = NonNullable<
  Awaited<ReturnType<StripeBillingRepository["findAccountByTenantId"]>>
>;
type OrganizationBillingAccount = NonNullable<
  Awaited<ReturnType<StripeBillingRepository["findOrganizationAccountByOrganizationId"]>>
>;

type ResolvedBillingAccount =
  | { entity: "tenant"; tenantId: string; account: TenantBillingAccount }
  | { entity: "organization"; organizationId: string; tenantId: string; account: OrganizationBillingAccount };

@Injectable()
export class StripeBillingService {
  constructor(
    private readonly stripeClient: StripeClient,
    private readonly repository: StripeBillingRepository,
    private readonly tenantSync: TenantSyncClient,
    private readonly organizationSync: OrganizationSyncClient,
    private readonly billingTruthClient: BillingTruthClient,
  ) {}

  async getBillingContext(tenantId: string) {
    const context = await this.requireBillingContext(tenantId);
    return context;
  }

  async getPlatformMetrics() {
    const planMrrCents: Record<string, number> = {
      STARTER: 4_900,
      PROFESSIONAL: 14_900,
      ENTERPRISE: 49_900,
    };

    const [tenantSubs, orgSubs, paidInvoices, issuedInvoices] = await Promise.all([
      this.repository.listActiveTenantSubscriptions(),
      this.repository.listActiveOrganizationSubscriptions(),
      this.repository.countPaidInvoices(),
      this.repository.countIssuedInvoices(),
    ]);

    const subscriptions = [...tenantSubs, ...orgSubs];
    const mrrCents = subscriptions.reduce((total, sub) => {
      return total + (planMrrCents[sub.plan] ?? 0);
    }, 0);

    const collectionsRate =
      issuedInvoices > 0 ? Math.round((paidInvoices / issuedInvoices) * 100) : null;

    return {
      mrrCents,
      activeSubscriptions: subscriptions.length,
      activeTenantSubscriptions: tenantSubs.length,
      activeOrganizationSubscriptions: orgSubs.length,
      paidInvoiceCount: paidInvoices,
      issuedInvoiceCount: issuedInvoices,
      collectionsRatePercent: collectionsRate,
      currency: "USD",
      source: "billing-service" as const,
    };
  }

  async createCustomer(dto: CreateStripeCustomerInput) {
    const context = await this.requireBillingContext(dto.tenantId);

    if (isOrganizationLevelBilling(context.billingModel)) {
      return this.createOrganizationCustomer(context, dto);
    }

    return this.createTenantCustomer(context, dto);
  }

  async createSubscription(tenantId: string, dto: CreateStripeSubscriptionInput) {
    const resolved = await this.requireBillingAccount(tenantId);
    if (resolved.entity === "organization") {
      return this.createOrganizationSubscription(resolved, dto);
    }

    return this.createTenantSubscription(resolved, dto);
  }

  async getSubscription(tenantId: string) {
    const context = await this.billingTruthClient.getContext(tenantId);
    if (!context) {
      return { tenantId, status: "none", plan: null, subscription: null, billingEntity: "tenant" };
    }

    if (isOrganizationLevelBilling(context.billingModel) && context.organizationId) {
      const account = await this.repository.findOrganizationAccountByOrganizationId(
        context.organizationId,
      );
      if (!account) {
        return {
          tenantId,
          organizationId: context.organizationId,
          billingEntity: "organization",
          status: "none",
          plan: null,
          subscription: null,
        };
      }

      return this.toSubscriptionResponse(
        {
          tenantId,
          organizationId: context.organizationId,
          stripeCustomerId: account.stripeCustomerId,
          defaultPaymentMethodId: account.defaultPaymentMethodId,
          billingEntity: "organization",
        },
        account.subscription,
      );
    }

    const account = await this.repository.findAccountByTenantId(tenantId);
    if (!account) {
      return { tenantId, billingEntity: "tenant", status: "none", plan: null, subscription: null };
    }

    return this.toSubscriptionResponse(
      {
        tenantId,
        stripeCustomerId: account.stripeCustomerId,
        defaultPaymentMethodId: account.defaultPaymentMethodId,
        billingEntity: "tenant",
      },
      account.subscription,
    );
  }

  async listStripeInvoices(tenantId: string) {
    const context = await this.requireBillingContext(tenantId);

    if (isOrganizationLevelBilling(context.billingModel)) {
      if (!context.organizationId) return [];
      const account = await this.repository.findOrganizationAccountByOrganizationId(
        context.organizationId,
      );
      if (!account) return [];
      return this.fetchStripeInvoices(account.stripeCustomerId);
    }

    const account = await this.repository.findAccountByTenantId(tenantId);
    if (!account) return [];
    return this.fetchStripeInvoices(account.stripeCustomerId);
  }

  async updatePaymentMethod(tenantId: string, dto: UpdateStripePaymentMethodInput) {
    const resolved = await this.requireBillingAccount(tenantId);
    const stripe = this.stripeClient.getClient();
    const customerId = resolved.account.stripeCustomerId;

    await stripe.paymentMethods.attach(dto.paymentMethodId, { customer: customerId });
    await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: dto.paymentMethodId },
    });

    if (resolved.entity === "organization") {
      await this.repository.updateOrganizationAccount(resolved.organizationId, {
        defaultPaymentMethodId: dto.paymentMethodId,
      });
      return { organizationId: resolved.organizationId, paymentMethodId: dto.paymentMethodId, updated: true };
    }

    await this.repository.updateAccount(tenantId, {
      defaultPaymentMethodId: dto.paymentMethodId,
    });

    return { tenantId, paymentMethodId: dto.paymentMethodId, updated: true };
  }

  async cancelSubscription(tenantId: string, dto: CancelStripeSubscriptionInput) {
    const resolved = await this.requireBillingAccount(tenantId);
    if (!resolved.account.subscription) {
      throw new NotFoundException("No active subscription found");
    }

    const stripe = this.stripeClient.getClient();
    const subscription = dto.immediately
      ? await stripe.subscriptions.cancel(resolved.account.subscription.stripeSubscriptionId)
      : await stripe.subscriptions.update(resolved.account.subscription.stripeSubscriptionId, {
          cancel_at_period_end: true,
        });

    if (resolved.entity === "organization") {
      await this.repository.upsertOrganizationSubscription(resolved.account.id, {
        stripeSubscriptionId: subscription.id,
        stripePriceId: resolved.account.subscription.stripePriceId,
        plan: resolved.account.subscription.plan,
        status: this.repository.mapStripeStatus(subscription.status),
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
      });

      await this.organizationSync.syncBilling({
        organizationId: resolved.organizationId,
        stripeCustomerId: resolved.account.stripeCustomerId,
        stripeSubscriptionId: subscription.id,
        subscriptionStatus: subscription.status,
      });

      return this.toSubscriptionResponse(
        {
          tenantId,
          organizationId: resolved.organizationId,
          stripeCustomerId: resolved.account.stripeCustomerId,
          defaultPaymentMethodId: resolved.account.defaultPaymentMethodId,
          billingEntity: "organization",
        },
        resolved.account.subscription,
      );
    }

    await this.repository.upsertSubscription(resolved.account.id, {
      stripeSubscriptionId: subscription.id,
      stripePriceId: resolved.account.subscription.stripePriceId,
      plan: resolved.account.subscription.plan,
      status: this.repository.mapStripeStatus(subscription.status),
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
    });

    await this.tenantSync.syncBilling({
      tenantId,
      stripeCustomerId: resolved.account.stripeCustomerId,
      stripeSubscriptionId: subscription.id,
      plan: resolved.account.subscription.plan,
      subscriptionStatus: subscription.status,
    });

    return this.toSubscriptionResponse(
      {
        tenantId,
        stripeCustomerId: resolved.account.stripeCustomerId,
        defaultPaymentMethodId: resolved.account.defaultPaymentMethodId,
        billingEntity: "tenant",
      },
      resolved.account.subscription,
    );
  }

  async createCustomerPortalSession(tenantId: string, dto: CreateCustomerPortalInput) {
    const resolved = await this.requireBillingAccount(tenantId);
    const stripe = this.stripeClient.getClient();
    const context = await this.requireBillingContext(tenantId);
    const defaultReturn = isOrganizationLevelBilling(context.billingModel)
      ? `${this.stripeClient.getFrontendUrl()}/organization/billing`
      : `${this.stripeClient.getFrontendUrl()}/clinic/billing`;
    const returnUrl = dto.returnUrl ?? defaultReturn;

    const session = await stripe.billingPortal.sessions.create({
      customer: resolved.account.stripeCustomerId,
      return_url: returnUrl,
    });

    return { url: session.url };
  }

  async createPlatformCheckoutSession(
    tenantId: string,
    dto: CreatePlatformCheckoutSessionInput,
  ) {
    const context = await this.requireBillingContext(tenantId);
    const plan = this.normalizeCheckoutPlan(dto.plan);

    await this.createCustomer({
      tenantId,
      email: dto.email,
      name: dto.name,
    });

    const resolved = await this.requireBillingAccount(tenantId);
    const stripe = this.stripeClient.getClient();
    const priceId = this.stripeClient.getPriceIdForPlan(plan);
    const frontend = this.stripeClient.getFrontendUrl();
    const successUrl =
      dto.successUrl ?? `${frontend}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl =
      dto.cancelUrl ??
      `${frontend}/checkout?intent=checkout&plan=${encodeURIComponent(dto.plan)}&cycle=${dto.billingCycle ?? "yearly"}`;

    const metadata: Record<string, string> = {
      plan,
      tenantId,
    };
    if (context.organizationId) {
      metadata.organizationId = context.organizationId;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: resolved.account.stripeCustomerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: tenantId,
      metadata,
      subscription_data: { metadata },
    });

    if (!session.url) {
      throw new BadRequestException("Stripe checkout session URL was not returned.");
    }

    return { url: session.url, sessionId: session.id };
  }

  async handleTenantCreated(payload: { tenantId: string; name: string; slug: string }) {
    const context = await this.billingTruthClient.getContext(payload.tenantId);
    if (!context) {
      return this.createCustomer({ tenantId: payload.tenantId, name: payload.name });
    }

    if (isOrganizationLevelBilling(context.billingModel) && context.organizationId) {
      const existing = await this.repository.findOrganizationAccountByOrganizationId(
        context.organizationId,
      );
      if (existing) {
        return {
          organizationId: context.organizationId,
          stripeCustomerId: existing.stripeCustomerId,
        };
      }

      return this.createOrganizationCustomer(context, {
        tenantId: payload.tenantId,
        name: payload.name,
      });
    }

    return this.createTenantCustomer(context, {
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
      case "checkout.session.completed":
        await this.handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
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

  private async createTenantCustomer(
    context: BillingTruthContext,
    dto: CreateStripeCustomerInput,
  ) {
    const existing = await this.repository.findAccountByTenantId(dto.tenantId);
    if (existing) {
      return this.toCustomerResponse(existing, "tenant");
    }

    if (!context.organizationId) {
      throw new BadRequestException("Tenant must be linked to an organization before billing setup.");
    }

    const stripe = this.stripeClient.getClient();
    const customer = await stripe.customers.create({
      email: dto.email,
      name: dto.name,
      metadata: buildStripeCustomerMetadata({
        billingModel: context.billingModel,
        organizationId: context.organizationId,
        tenantId: dto.tenantId,
      }),
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

    return this.toCustomerResponse(account, "tenant");
  }

  private async createOrganizationCustomer(
    context: BillingTruthContext,
    dto: CreateStripeCustomerInput,
  ) {
    if (!context.organizationId) {
      throw new BadRequestException("Organization is required for organization-level billing.");
    }

    const existing = await this.repository.findOrganizationAccountByOrganizationId(
      context.organizationId,
    );
    if (existing) {
      return {
        organizationId: context.organizationId,
        stripeCustomerId: existing.stripeCustomerId,
        billingEntity: "organization",
      };
    }

    const stripe = this.stripeClient.getClient();
    const customer = await stripe.customers.create({
      email: dto.email,
      name: dto.name,
      metadata: buildStripeCustomerMetadata({
        billingModel: context.billingModel,
        organizationId: context.organizationId,
      }),
    });

    const account = await this.repository.createOrganizationAccount({
      organizationId: context.organizationId,
      stripeCustomerId: customer.id,
      email: dto.email ?? customer.email ?? null,
    });

    await this.organizationSync.syncBilling({
      organizationId: context.organizationId,
      stripeCustomerId: customer.id,
    });

    return {
      organizationId: context.organizationId,
      stripeCustomerId: account.stripeCustomerId,
      billingEntity: "organization",
    };
  }

  private async createTenantSubscription(
    resolved: Extract<ResolvedBillingAccount, { entity: "tenant" }>,
    dto: CreateStripeSubscriptionInput,
  ) {
    const { account, tenantId } = resolved;
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

    const subscription = await this.upsertStripeSubscription({
      customerId: account.stripeCustomerId,
      existingSubscriptionId: account.subscription?.stripeSubscriptionId,
      priceId,
      metadata: {
        tenantId,
        organizationId: "",
        plan: dto.plan,
      },
    });

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

    return this.toSubscriptionResponse(
      {
        tenantId,
        stripeCustomerId: account.stripeCustomerId,
        defaultPaymentMethodId: account.defaultPaymentMethodId,
        billingEntity: "tenant",
      },
      record,
    );
  }

  private async createOrganizationSubscription(
    resolved: Extract<ResolvedBillingAccount, { entity: "organization" }>,
    dto: CreateStripeSubscriptionInput,
  ) {
    const { account, organizationId, tenantId } = resolved;
    const stripe = this.stripeClient.getClient();
    const priceId = this.stripeClient.getPriceIdForPlan(dto.plan);

    if (dto.paymentMethodId) {
      await stripe.paymentMethods.attach(dto.paymentMethodId, {
        customer: account.stripeCustomerId,
      });
      await stripe.customers.update(account.stripeCustomerId, {
        invoice_settings: { default_payment_method: dto.paymentMethodId },
      });
      await this.repository.updateOrganizationAccount(organizationId, {
        defaultPaymentMethodId: dto.paymentMethodId,
      });
    }

    const subscription = await this.upsertStripeSubscription({
      customerId: account.stripeCustomerId,
      existingSubscriptionId: account.subscription?.stripeSubscriptionId,
      priceId,
      metadata: {
        organizationId,
        plan: dto.plan,
      },
    });

    const record = await this.repository.upsertOrganizationSubscription(account.id, {
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      plan: dto.plan,
      status: this.repository.mapStripeStatus(subscription.status),
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
    });

    await this.organizationSync.syncBilling({
      organizationId,
      stripeCustomerId: account.stripeCustomerId,
      stripeSubscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
    });

    return this.toSubscriptionResponse(
      {
        tenantId,
        organizationId,
        stripeCustomerId: account.stripeCustomerId,
        defaultPaymentMethodId: account.defaultPaymentMethodId,
        billingEntity: "organization",
      },
      record,
    );
  }

  private async upsertStripeSubscription(input: {
    customerId: string;
    existingSubscriptionId?: string;
    priceId: string;
    metadata: Record<string, string>;
  }) {
    const stripe = this.stripeClient.getClient();

    if (input.existingSubscriptionId) {
      const existing = await stripe.subscriptions.retrieve(input.existingSubscriptionId);
      const itemId = existing.items.data[0]?.id;
      if (!itemId) {
        throw new BadRequestException("Stripe subscription has no billable items");
      }

      return stripe.subscriptions.update(input.existingSubscriptionId, {
        items: [{ id: itemId, price: input.priceId }],
        proration_behavior: "create_prorations",
        cancel_at_period_end: false,
        metadata: input.metadata,
      });
    }

    return stripe.subscriptions.create({
      customer: input.customerId,
      items: [{ price: input.priceId }],
      metadata: input.metadata,
      expand: ["latest_invoice.payment_intent"],
    });
  }

  private async handleSubscriptionChange(subscription: Stripe.Subscription) {
    const customerId = this.resolveCustomerId(subscription.customer);
    const orgAccount = await this.repository.findOrganizationAccountByStripeCustomerId(customerId);
    if (orgAccount) {
      await this.applyOrganizationSubscriptionChange(orgAccount, subscription);
      return;
    }

    const tenantAccount = await this.repository.findAccountByStripeCustomerId(customerId);
    if (!tenantAccount) return;

    await this.applyTenantSubscriptionChange(tenantAccount, subscription);
  }

  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const customerId = this.resolveCustomerId(subscription.customer);
    const orgAccount = await this.repository.findOrganizationAccountByStripeCustomerId(customerId);
    if (orgAccount) {
      await this.repository.upsertOrganizationSubscription(orgAccount.id, {
        stripeSubscriptionId: subscription.id,
        stripePriceId: orgAccount.subscription?.stripePriceId ?? "",
        plan: orgAccount.subscription?.plan ?? "STARTER",
        status: "CANCELED",
        currentPeriodStart: orgAccount.subscription?.currentPeriodStart ?? null,
        currentPeriodEnd: orgAccount.subscription?.currentPeriodEnd ?? null,
        cancelAtPeriodEnd: true,
        canceledAt: new Date(),
      });

      await this.organizationSync.syncBilling({
        organizationId: orgAccount.organizationId,
        stripeCustomerId: orgAccount.stripeCustomerId,
        stripeSubscriptionId: subscription.id,
        subscriptionStatus: "canceled",
      });
      return;
    }

    const tenantAccount = await this.repository.findAccountByStripeCustomerId(customerId);
    if (!tenantAccount) return;

    await this.repository.upsertSubscription(tenantAccount.id, {
      stripeSubscriptionId: subscription.id,
      stripePriceId: tenantAccount.subscription?.stripePriceId ?? "",
      plan: tenantAccount.subscription?.plan ?? "STARTER",
      status: "CANCELED",
      currentPeriodStart: tenantAccount.subscription?.currentPeriodStart ?? null,
      currentPeriodEnd: tenantAccount.subscription?.currentPeriodEnd ?? null,
      cancelAtPeriodEnd: true,
      canceledAt: new Date(),
    });

    await this.tenantSync.syncBilling({
      tenantId: tenantAccount.tenantId,
      stripeCustomerId: tenantAccount.stripeCustomerId,
      stripeSubscriptionId: subscription.id,
      plan: tenantAccount.subscription?.plan ?? "STARTER",
      subscriptionStatus: "canceled",
    });

    const context = await this.billingTruthClient.getContext(tenantAccount.tenantId);
    await this.syncTenantLifecycleFromStripe(
      tenantAccount.tenantId,
      "canceled",
      context?.billingModel ?? "tenant-level",
    );
  }

  private async handleInvoicePaid(invoice: Stripe.Invoice) {
    const customerId = this.resolveCustomerId(invoice.customer);
    if (!customerId) return;

    const orgAccount = await this.repository.findOrganizationAccountByStripeCustomerId(customerId);
    if (orgAccount?.subscription) {
      await this.organizationSync.syncBilling({
        organizationId: orgAccount.organizationId,
        stripeCustomerId: orgAccount.stripeCustomerId,
        stripeSubscriptionId: orgAccount.subscription.stripeSubscriptionId,
        subscriptionStatus: "active",
      });
      return;
    }

    const tenantAccount = await this.repository.findAccountByStripeCustomerId(customerId);
    if (!tenantAccount?.subscription) return;

    await this.tenantSync.syncBilling({
      tenantId: tenantAccount.tenantId,
      stripeCustomerId: tenantAccount.stripeCustomerId,
      stripeSubscriptionId: tenantAccount.subscription.stripeSubscriptionId,
      plan: tenantAccount.subscription.plan,
      subscriptionStatus: "active",
    });

    const context = await this.billingTruthClient.getContext(tenantAccount.tenantId);
    await this.syncTenantLifecycleFromStripe(
      tenantAccount.tenantId,
      "active",
      context?.billingModel ?? "tenant-level",
    );
  }

  private async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    const tenantId = session.client_reference_id ?? session.metadata?.tenantId;
    if (!tenantId) {
      return;
    }

    const context = await this.billingTruthClient.getContext(tenantId);
    if (context && !isOrganizationLevelBilling(context.billingModel)) {
      await this.tenantSync.syncLifecycle({ tenantId, status: "ACTIVE" });
    }
  }

  private normalizeCheckoutPlan(plan: string): "STARTER" | "PROFESSIONAL" | "ENTERPRISE" {
    const normalized = plan.toUpperCase();
    if (normalized === "STARTER" || plan === "starter") {
      return "STARTER";
    }
    if (normalized === "PRO" || normalized === "PROFESSIONAL" || plan === "pro") {
      return "PROFESSIONAL";
    }
    if (normalized === "ENTERPRISE") {
      return "ENTERPRISE";
    }
    throw new BadRequestException("Invalid checkout plan.");
  }

  private async syncTenantLifecycleFromStripe(
    tenantId: string,
    stripeStatus: string,
    billingModel: BillingTruthContext["billingModel"] | string,
  ) {
    if (isOrganizationLevelBilling(billingModel)) {
      return;
    }

    const normalized = stripeStatus.toLowerCase();
    if (normalized === "active" || normalized === "trialing") {
      await this.tenantSync.syncLifecycle({ tenantId, status: "ACTIVE" });
      return;
    }

    if (
      normalized === "past_due" ||
      normalized === "canceled" ||
      normalized === "unpaid" ||
      normalized === "incomplete_expired"
    ) {
      await this.tenantSync.syncLifecycle({ tenantId, status: "SUSPENDED" });
    }
  }

  private async handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
    const customerId = this.resolveCustomerId(invoice.customer);
    if (!customerId) return;

    const orgAccount = await this.repository.findOrganizationAccountByStripeCustomerId(customerId);
    if (orgAccount?.subscription) {
      await this.repository.upsertOrganizationSubscription(orgAccount.id, {
        stripeSubscriptionId: orgAccount.subscription.stripeSubscriptionId,
        stripePriceId: orgAccount.subscription.stripePriceId,
        plan: orgAccount.subscription.plan,
        status: "PAST_DUE",
        currentPeriodStart: orgAccount.subscription.currentPeriodStart,
        currentPeriodEnd: orgAccount.subscription.currentPeriodEnd,
        cancelAtPeriodEnd: orgAccount.subscription.cancelAtPeriodEnd,
        canceledAt: orgAccount.subscription.canceledAt,
      });

      await this.organizationSync.syncBilling({
        organizationId: orgAccount.organizationId,
        stripeCustomerId: orgAccount.stripeCustomerId,
        stripeSubscriptionId: orgAccount.subscription.stripeSubscriptionId,
        subscriptionStatus: "past_due",
      });
      return;
    }

    const tenantAccount = await this.repository.findAccountByStripeCustomerId(customerId);
    if (!tenantAccount?.subscription) return;

    await this.repository.upsertSubscription(tenantAccount.id, {
      stripeSubscriptionId: tenantAccount.subscription.stripeSubscriptionId,
      stripePriceId: tenantAccount.subscription.stripePriceId,
      plan: tenantAccount.subscription.plan,
      status: "PAST_DUE",
      currentPeriodStart: tenantAccount.subscription.currentPeriodStart,
      currentPeriodEnd: tenantAccount.subscription.currentPeriodEnd,
      cancelAtPeriodEnd: tenantAccount.subscription.cancelAtPeriodEnd,
      canceledAt: tenantAccount.subscription.canceledAt,
    });

    await this.tenantSync.syncBilling({
      tenantId: tenantAccount.tenantId,
      stripeCustomerId: tenantAccount.stripeCustomerId,
      stripeSubscriptionId: tenantAccount.subscription.stripeSubscriptionId,
      plan: tenantAccount.subscription.plan,
      subscriptionStatus: "past_due",
    });

    const context = await this.billingTruthClient.getContext(tenantAccount.tenantId);
    await this.syncTenantLifecycleFromStripe(
      tenantAccount.tenantId,
      "past_due",
      context?.billingModel ?? "tenant-level",
    );
  }

  private async applyOrganizationSubscriptionChange(
    account: OrganizationBillingAccount,
    subscription: Stripe.Subscription,
  ) {
    const plan =
      (subscription.metadata.plan as string | undefined) ?? account.subscription?.plan ?? "STARTER";
    const priceId = subscription.items.data[0]?.price.id ?? account.subscription?.stripePriceId ?? "";

    await this.repository.upsertOrganizationSubscription(account.id, {
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      plan,
      status: this.repository.mapStripeStatus(subscription.status),
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
    });

    await this.organizationSync.syncBilling({
      organizationId: account.organizationId,
      stripeCustomerId: account.stripeCustomerId,
      stripeSubscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
    });
  }

  private async applyTenantSubscriptionChange(
    account: TenantBillingAccount,
    subscription: Stripe.Subscription,
  ) {
    const plan =
      (subscription.metadata.plan as string | undefined) ?? account.subscription?.plan ?? "STARTER";
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

    const context = await this.billingTruthClient.getContext(account.tenantId);
    await this.syncTenantLifecycleFromStripe(
      account.tenantId,
      subscription.status,
      context?.billingModel ?? "tenant-level",
    );
  }

  private async requireBillingContext(tenantId: string): Promise<BillingTruthContext> {
    const context = await this.billingTruthClient.getContext(tenantId);
    if (!context) {
      throw new NotFoundException("Billing context not found for tenant.");
    }
    return context;
  }

  private async requireBillingAccount(tenantId: string): Promise<ResolvedBillingAccount> {
    const context = await this.requireBillingContext(tenantId);

    if (isOrganizationLevelBilling(context.billingModel)) {
      if (!context.organizationId) {
        throw new BadRequestException("Organization is required for organization-level billing.");
      }

      const account = await this.repository.findOrganizationAccountByOrganizationId(
        context.organizationId,
      );
      if (!account) {
        throw new NotFoundException(
          "Stripe customer not found for organization. Create a customer first.",
        );
      }

      return {
        entity: "organization",
        organizationId: context.organizationId,
        tenantId,
        account,
      };
    }

    const account = await this.repository.findAccountByTenantId(tenantId);
    if (!account) {
      throw new NotFoundException("Stripe customer not found for tenant. Create a customer first.");
    }

    return { entity: "tenant", tenantId, account };
  }

  private async fetchStripeInvoices(customerId: string) {
    const stripe = this.stripeClient.getClient();
    const invoices = await stripe.invoices.list({
      customer: customerId,
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

  private resolveCustomerId(
    customer: string | Stripe.Customer | Stripe.DeletedCustomer | null | undefined,
  ) {
    if (!customer) return "";
    return typeof customer === "string" ? customer : customer.id;
  }

  private toCustomerResponse(
    account: {
      tenantId: string;
      stripeCustomerId: string;
      email: string | null;
      defaultPaymentMethodId: string | null;
    },
    billingEntity: "tenant" | "organization",
  ) {
    return {
      tenantId: account.tenantId,
      stripeCustomerId: account.stripeCustomerId,
      email: account.email,
      defaultPaymentMethodId: account.defaultPaymentMethodId,
      billingEntity,
    };
  }

  private toSubscriptionResponse(
    account: {
      tenantId: string;
      organizationId?: string;
      stripeCustomerId: string;
      defaultPaymentMethodId: string | null;
      billingEntity: "tenant" | "organization";
    },
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
      organizationId: account.organizationId,
      billingEntity: account.billingEntity,
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
