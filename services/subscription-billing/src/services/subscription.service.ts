import { Injectable } from "@nestjs/common";
import type Stripe from "stripe";
import { resolveStripeConfig } from "@/config/stripe.config";
import { toTenantSubscriptionResponse } from "@/models/TenantSubscription";
import { TenantSubscriptionRepository } from "@/repositories/tenant-subscription.repository";
import { BillingNotificationClient } from "@/integrations/billing-notification.client";
import { PlanService } from "@/services/plan.service";
import { ProrationService } from "@/services/proration.service";
import { StripeService } from "@/services/stripe.service";
import { planNotFoundError, subscriptionNotFoundError } from "@/utils/subscription-errors";
import {
  validateCancelBody,
  validatePlanChangeBody,
  validateSubscribeBody,
} from "@/validators/subscription.validator";

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: TenantSubscriptionRepository,
    private readonly planService: PlanService,
    private readonly stripeService: StripeService,
    private readonly prorationService: ProrationService,
    private readonly billingNotificationClient: BillingNotificationClient,
  ) {}

  async getSubscriptionStatus(tenantId: string) {
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);
    if (!subscription) {
      const freePlan = await this.planService.requirePlan("plan_free").catch(() => null);
      return {
        tenantId,
        status: "none" as const,
        subscription: null,
        plan: freePlan ? { id: freePlan.id, name: freePlan.name } : null,
      };
    }

    return {
      tenantId,
      status: subscription.status.toLowerCase(),
      subscription: toTenantSubscriptionResponse(subscription),
      plan: subscription.plan
        ? { id: subscription.plan.id, name: subscription.plan.name }
        : null,
    };
  }

  async subscribeTenant(
    tenantId: string,
    body: Record<string, unknown>,
    tenantContact?: { email?: string; name?: string },
  ) {
    const input = validateSubscribeBody(body);
    const plan = await this.planService.requirePlan(input.planId);
    const isFreePlan = plan.priceMonthly === 0 && plan.priceYearly === 0;
    const existing = await this.subscriptionRepository.findByTenantId(tenantId);
    let customerId = existing?.stripeCustomerId ?? null;

    if (isFreePlan) {
      const record = await this.subscriptionRepository.upsertByTenant(tenantId, {
        planId: plan.id,
        stripeCustomerId: customerId,
        stripeSubscriptionId: null,
        stripeSubscriptionItemId: null,
        status: "ACTIVE",
        trialEndsAt: null,
        currentPeriodStart: new Date(),
        currentPeriodEnd: null,
        cancelAtPeriodEnd: false,
        billingCycle: input.billingCycle,
        scheduledPlanId: null,
        scheduledChangeAt: null,
      });

      return {
        message: "Subscription created.",
        subscription: toTenantSubscriptionResponse(record),
      };
    }

    const priceId =
      input.billingCycle === "yearly" ? plan.stripePriceYearlyId : plan.stripePriceMonthlyId;

    if (!priceId) {
      throw planNotFoundError("Plan is missing Stripe price configuration.");
    }

    if (!customerId) {
      const customer = await this.stripeService.createCustomer({
        tenantId,
        email: tenantContact?.email,
        name: tenantContact?.name,
      });
      customerId = customer.id;
    }

    const config = resolveStripeConfig();
    const trialDays = plan.trialDays > 0 ? plan.trialDays : config.defaultTrialDays;

    const stripeSubscription = await this.stripeService.createSubscription({
      customerId,
      priceId,
      trialDays,
      tenantId,
      planName: plan.name,
    });

    const record = await this.subscriptionRepository.upsertByTenant(tenantId, {
      planId: plan.id,
      stripeCustomerId: customerId,
      stripeSubscriptionId: stripeSubscription.id,
      stripeSubscriptionItemId: this.stripeService.extractSubscriptionItemId(stripeSubscription),
      status: this.stripeService.mapStripeStatus(stripeSubscription.status),
      trialEndsAt: stripeSubscription.trial_end
        ? new Date(stripeSubscription.trial_end * 1000)
        : null,
      currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
      currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
      cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
      billingCycle: input.billingCycle,
      scheduledPlanId: null,
      scheduledChangeAt: null,
    });

    return {
      message: "Subscription created.",
      subscription: toTenantSubscriptionResponse(record),
    };
  }

  async upgradeSubscription(tenantId: string, body: Record<string, unknown>) {
    const input = validatePlanChangeBody(body);
    const preview = await this.prorationService.previewUpgrade(
      tenantId,
      input.planId,
      input.billingCycle,
    );

    if (body.confirm !== true) {
      return {
        message: "Upgrade preview ready.",
        preview,
      };
    }

    return this.prorationService.confirmUpgrade(tenantId, input.planId, input.billingCycle);
  }

  async downgradeSubscription(tenantId: string, body: Record<string, unknown>) {
    const input = validatePlanChangeBody(body);
    return this.prorationService.scheduleDowngrade(tenantId, input.planId);
  }

  async updatePaymentMethod(tenantId: string, returnUrl?: string) {
    const config = resolveStripeConfig();
    return this.getBillingPortalUrl(
      tenantId,
      returnUrl ?? `${config.frontendUrl}/settings/billing/portal`,
    );
  }

  async cancelSubscription(tenantId: string, body: Record<string, unknown> = {}) {
    const { immediately } = validateCancelBody(body);
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);
    if (!subscription?.stripeSubscriptionId) {
      throw subscriptionNotFoundError();
    }

    const stripeSubscription = await this.stripeService.cancelSubscription(
      subscription.stripeSubscriptionId,
      !immediately,
    );

    const updated = await this.subscriptionRepository.update(tenantId, {
      status: this.stripeService.mapStripeStatus(stripeSubscription.status),
      cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
      ...(immediately ? { currentPeriodEnd: new Date(), scheduledPlanId: null, scheduledChangeAt: null } : {}),
    });

    if (immediately) {
      void this.billingNotificationClient.notifySubscriptionCanceled(tenantId, {
        email: "billing@tenant.local",
      });
    }

    return {
      message: immediately
        ? "Subscription canceled immediately."
        : "Subscription will cancel at period end.",
      subscription: toTenantSubscriptionResponse(updated),
    };
  }

  async getBillingPortalUrl(tenantId: string, returnUrl?: string) {
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);
    if (!subscription?.stripeCustomerId) {
      throw subscriptionNotFoundError("Tenant has no Stripe customer.");
    }

    const url = await this.stripeService.getBillingPortalUrl(
      subscription.stripeCustomerId,
      returnUrl,
    );

    return { url };
  }

  async handleSubscriptionStripeEvent(event: Stripe.Event) {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        return this.handleSubscriptionEvent(event);
      default:
        return { received: true, ignored: event.type };
    }
  }

  private async handleSubscriptionEvent(event: Stripe.Event) {
    const subscription = event.data.object as Stripe.Subscription;
    const tenantId = subscription.metadata?.tenantId;
    if (!tenantId) {
      return { received: true, skipped: "missing tenantId metadata" };
    }

    const existing = await this.subscriptionRepository.findByTenantId(tenantId);
    let planId = existing?.planId ?? "plan_free";

    if (
      existing?.scheduledPlanId &&
      existing.scheduledChangeAt &&
      new Date() >= existing.scheduledChangeAt
    ) {
      planId = existing.scheduledPlanId;
    }

    const record = await this.subscriptionRepository.upsertByTenant(tenantId, {
      planId,
      stripeCustomerId:
        typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id,
      stripeSubscriptionId: subscription.id,
      stripeSubscriptionItemId: this.stripeService.extractSubscriptionItemId(subscription),
      status: this.stripeService.mapStripeStatus(subscription.status),
      trialEndsAt: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      scheduledPlanId:
        existing?.scheduledPlanId &&
        existing.scheduledChangeAt &&
        new Date() >= existing.scheduledChangeAt
          ? null
          : existing?.scheduledPlanId,
      scheduledChangeAt:
        existing?.scheduledPlanId &&
        existing.scheduledChangeAt &&
        new Date() >= existing.scheduledChangeAt
          ? null
          : existing?.scheduledChangeAt,
    });

    if (event.type === "customer.subscription.deleted") {
      void this.billingNotificationClient.notifySubscriptionCanceled(tenantId, {
        email: "billing@tenant.local",
      });
    }

    return { received: true, subscription: toTenantSubscriptionResponse(record) };
  }
}
