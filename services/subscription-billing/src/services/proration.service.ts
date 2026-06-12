import { Injectable } from "@nestjs/common";
import type { PlanRecord } from "@/models/Plan";
import { TenantSubscriptionRepository } from "@/repositories/tenant-subscription.repository";
import { PlanService } from "@/services/plan.service";
import { StripeService } from "@/services/stripe.service";
import { planNotFoundError, subscriptionNotFoundError } from "@/utils/subscription-errors";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

@Injectable()
export class ProrationService {
  constructor(
    private readonly subscriptionRepository: TenantSubscriptionRepository,
    private readonly planService: PlanService,
    private readonly stripeService: StripeService,
  ) {}

  calculateProration(
    tenantId: string,
    oldPlan: PlanRecord,
    newPlan: PlanRecord,
    billingCycle: "monthly" | "yearly" = "monthly",
  ) {
    const oldPrice = billingCycle === "yearly" ? oldPlan.priceYearly : oldPlan.priceMonthly;
    const newPrice = billingCycle === "yearly" ? newPlan.priceYearly : newPlan.priceMonthly;
    const periodDays = billingCycle === "yearly" ? 365 : 30;
    const remainingDays = periodDays / 2;
    const credit = Math.round((oldPrice * remainingDays) / periodDays);
    const charge = Math.round((newPrice * remainingDays) / periodDays);

    return {
      tenantId,
      credit,
      charge,
      net: charge - credit,
      currency: newPlan.currency,
      billingCycle,
    };
  }

  async previewUpgrade(tenantId: string, newPlanId: string, billingCycle: "monthly" | "yearly" = "monthly") {
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);
    if (!subscription?.stripeSubscriptionId || !subscription.stripeSubscriptionItemId) {
      throw subscriptionNotFoundError("Paid subscription required for proration preview.");
    }

    const oldPlan = subscription.plan ?? (await this.planService.requirePlan(subscription.planId));
    const newPlan = await this.planService.requirePlan(newPlanId);
    const newPriceId =
      billingCycle === "yearly" ? newPlan.stripePriceYearlyId : newPlan.stripePriceMonthlyId;

    if (!newPriceId) {
      throw planNotFoundError("Target plan is missing Stripe price configuration.");
    }

    const upcoming = await this.stripeService.retrieveUpcomingInvoice({
      customerId: subscription.stripeCustomerId!,
      subscriptionId: subscription.stripeSubscriptionId,
      subscriptionItemId: subscription.stripeSubscriptionItemId,
      newPriceId,
    });

    const credit = upcoming.lines.data
      .filter((line) => (line.amount ?? 0) < 0)
      .reduce((sum, line) => sum + Math.abs(line.amount ?? 0), 0);
    const charge = upcoming.lines.data
      .filter((line) => (line.amount ?? 0) > 0)
      .reduce((sum, line) => sum + (line.amount ?? 0), 0);

    return {
      preview: {
        credit,
        charge,
        net: upcoming.amount_due ?? charge - credit,
        currency: (upcoming.currency ?? newPlan.currency).toUpperCase(),
      },
      fallback: this.calculateProration(tenantId, oldPlan, newPlan, billingCycle),
      newPlan: { id: newPlan.id, name: newPlan.name },
      currentPlan: { id: oldPlan.id, name: oldPlan.name },
    };
  }

  async confirmUpgrade(
    tenantId: string,
    newPlanId: string,
    billingCycle: "monthly" | "yearly" = "monthly",
  ) {
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);
    if (!subscription?.stripeSubscriptionId || !subscription.stripeSubscriptionItemId) {
      throw subscriptionNotFoundError("Paid subscription required for upgrade.");
    }

    const newPlan = await this.planService.requirePlan(newPlanId);
    const newPriceId =
      billingCycle === "yearly" ? newPlan.stripePriceYearlyId : newPlan.stripePriceMonthlyId;

    if (!newPriceId) {
      throw planNotFoundError("Target plan is missing Stripe price configuration.");
    }

    const stripeSubscription = await this.stripeService.updateSubscriptionPlan({
      subscriptionId: subscription.stripeSubscriptionId,
      subscriptionItemId: subscription.stripeSubscriptionItemId,
      newPriceId,
      prorationBehavior: "create_prorations",
    });

    const itemId = this.stripeService.extractSubscriptionItemId(stripeSubscription);

    const updated = await this.subscriptionRepository.update(tenantId, {
      plan: { connect: { id: newPlan.id } },
      status: this.stripeService.mapStripeStatus(stripeSubscription.status),
      stripeSubscriptionItemId: itemId,
      billingCycle,
      scheduledPlanId: null,
      scheduledChangeAt: null,
      currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
      currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
      cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
    });

    return {
      message: "Subscription upgraded.",
      proration: await this.previewUpgrade(tenantId, newPlanId, billingCycle),
      subscription: updated,
    };
  }

  scheduleDowngrade(tenantId: string, newPlanId: string) {
    return this.subscriptionRepository.findByTenantId(tenantId).then(async (subscription) => {
      if (!subscription) {
        throw subscriptionNotFoundError();
      }

      await this.planService.requirePlan(newPlanId);
      const changeAt = subscription.currentPeriodEnd ?? new Date(Date.now() + 30 * MS_PER_DAY);

      const updated = await this.subscriptionRepository.update(tenantId, {
        scheduledPlanId: newPlanId,
        scheduledChangeAt: changeAt,
        cancelAtPeriodEnd: false,
      });

      return {
        message: "Downgrade scheduled for end of billing period.",
        scheduledPlanId: newPlanId,
        scheduledChangeAt: changeAt.toISOString(),
        subscription: updated,
      };
    });
  }
}
