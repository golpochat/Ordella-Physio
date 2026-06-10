import { Injectable } from "@nestjs/common";
import { SubscriptionRepository } from "@/subscription/subscription.repository";
import { TenantEventPublisher } from "@/events/tenant-event.publisher";
import type { UpdatePlanDto } from "@/subscription/dto/update-plan.dto";
import { toSubscriptionResponse } from "@/tenants/tenants.mapper";

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly eventPublisher: TenantEventPublisher,
  ) {}

  async getPlan(tenantId: string) {
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);
    return subscription ? toSubscriptionResponse(subscription) : null;
  }

  async updatePlan(tenantId: string, dto: UpdatePlanDto, correlationId?: string) {
    const subscription = await this.subscriptionRepository.upsert(tenantId, {
      plan: dto.plan,
      usageLimit: dto.usageLimit,
      renewsAt: dto.renewsAt ? new Date(dto.renewsAt) : undefined,
    });

    await this.eventPublisher.publishSubscriptionUpdated(
      {
        tenantId,
        plan: subscription.plan,
        usageLimit: subscription.usageLimit,
        updatedAt: subscription.updatedAt.toISOString(),
      },
      correlationId,
    );

    return toSubscriptionResponse(subscription);
  }

  trackUsage(tenantId: string, amount = 1) {
    return this.subscriptionRepository.incrementUsage(tenantId, amount);
  }

  async syncFromStripe(
    tenantId: string,
    data: {
      stripeSubscriptionId?: string;
      plan?: string;
      subscriptionStatus?: string;
    },
  ) {
    const planMap: Record<string, "STARTER" | "PROFESSIONAL" | "ENTERPRISE"> = {
      STARTER: "STARTER",
      PROFESSIONAL: "PROFESSIONAL",
      ENTERPRISE: "ENTERPRISE",
    };

    const subscription = await this.subscriptionRepository.upsert(tenantId, {
      ...(data.plan && planMap[data.plan] ? { plan: planMap[data.plan] } : {}),
      ...(data.stripeSubscriptionId ? { stripeSubscriptionId: data.stripeSubscriptionId } : {}),
      ...(data.subscriptionStatus ? { subscriptionStatus: data.subscriptionStatus } : {}),
    });

    return toSubscriptionResponse(subscription);
  }
}
