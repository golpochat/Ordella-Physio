import { Injectable } from "@nestjs/common";
import { toPlanResponse } from "@/models/Plan";
import { PlanRepository } from "@/repositories/plan.repository";
import { StripeService } from "@/services/stripe.service";
import { planNotFoundError } from "@/utils/subscription-errors";
import { validateCreatePlan, validateUpdatePlan } from "@/validators/plan.validator";

@Injectable()
export class PlanService {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly stripeService: StripeService,
  ) {}

  async listPlans(activeOnly = true) {
    const plans = activeOnly
      ? await this.planRepository.listActive()
      : await this.planRepository.listAll();
    return plans.map(toPlanResponse);
  }

  async createPlan(payload: Record<string, unknown>) {
    const input = validateCreatePlan(payload);
    const plan = await this.planRepository.create({
      name: input.name,
      description: input.description ?? "",
      priceMonthly: input.priceMonthly,
      priceYearly: input.priceYearly,
      currency: input.currency ?? "EUR",
      limits: input.limits,
      trialDays: input.trialDays ?? 0,
      isActive: input.isActive ?? true,
    });

    const synced = await this.stripeService.syncProductsAndPrices([plan]);
    const stripeIds = synced[0];
    if (stripeIds) {
      const updated = await this.planRepository.update(plan.id, {
        stripeProductId: stripeIds.stripeProductId,
        stripePriceMonthlyId: stripeIds.stripePriceMonthlyId,
        stripePriceYearlyId: stripeIds.stripePriceYearlyId,
      });
      return { message: "Plan created.", plan: toPlanResponse(updated) };
    }

    return { message: "Plan created.", plan: toPlanResponse(plan) };
  }

  async updatePlan(id: string, payload: Record<string, unknown>) {
    const existing = await this.planRepository.findById(id);
    if (!existing) {
      throw planNotFoundError();
    }

    const input = validateUpdatePlan(payload);
    const updated = await this.planRepository.update(id, {
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
      ...(input.priceMonthly !== undefined ? { priceMonthly: input.priceMonthly } : {}),
      ...(input.priceYearly !== undefined ? { priceYearly: input.priceYearly } : {}),
      ...(input.currency !== undefined ? { currency: input.currency } : {}),
      ...(input.limits !== undefined ? { limits: input.limits } : {}),
      ...(input.trialDays !== undefined ? { trialDays: input.trialDays } : {}),
      ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
    });

    if (
      input.priceMonthly !== undefined ||
      input.priceYearly !== undefined ||
      input.name !== undefined
    ) {
      const synced = await this.stripeService.syncProductsAndPrices([updated]);
      const stripeIds = synced[0];
      if (stripeIds) {
        const withStripe = await this.planRepository.update(id, {
          stripeProductId: stripeIds.stripeProductId,
          stripePriceMonthlyId: stripeIds.stripePriceMonthlyId,
          stripePriceYearlyId: stripeIds.stripePriceYearlyId,
        });
        return { message: "Plan updated.", plan: toPlanResponse(withStripe) };
      }
    }

    return { message: "Plan updated.", plan: toPlanResponse(updated) };
  }

  async syncAllPlansWithStripe() {
    const plans = await this.planRepository.listAll();
    const synced = await this.stripeService.syncProductsAndPrices(plans);

    for (const entry of synced) {
      await this.planRepository.update(entry.planId, {
        stripeProductId: entry.stripeProductId,
        stripePriceMonthlyId: entry.stripePriceMonthlyId,
        stripePriceYearlyId: entry.stripePriceYearlyId,
      });
    }

    return { message: "Plans synced with Stripe.", synced: synced.length };
  }

  async requirePlan(planId: string) {
    const plan = await this.planRepository.findById(planId);
    if (!plan || !plan.isActive) {
      throw planNotFoundError();
    }
    return plan;
  }
}
