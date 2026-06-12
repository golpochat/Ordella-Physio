import { Injectable } from "@nestjs/common";
import type { Prisma, SubscriptionStatus } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import type { TenantSubscriptionRecord } from "@/models/TenantSubscription";

@Injectable()
export class TenantSubscriptionRepository {
  constructor(private readonly database: DatabaseService) {}

  findByTenantId(tenantId: string) {
    return this.database.tenantSubscription.findUnique({
      where: { tenantId },
      include: { plan: true },
    });
  }

  findByStripeSubscriptionId(stripeSubscriptionId: string) {
    return this.database.tenantSubscription.findFirst({
      where: { stripeSubscriptionId },
      include: { plan: true },
    });
  }

  upsertByTenant(
    tenantId: string,
    data: {
      planId: string;
      stripeCustomerId?: string | null;
      stripeSubscriptionId?: string | null;
      stripeSubscriptionItemId?: string | null;
      status?: SubscriptionStatus;
      trialEndsAt?: Date | null;
      currentPeriodStart?: Date | null;
      currentPeriodEnd?: Date | null;
      cancelAtPeriodEnd?: boolean;
      billingCycle?: string;
      scheduledPlanId?: string | null;
      scheduledChangeAt?: Date | null;
    },
  ) {
    return this.database.tenantSubscription.upsert({
      where: { tenantId },
      create: {
        tenantId,
        planId: data.planId,
        stripeCustomerId: data.stripeCustomerId ?? null,
        stripeSubscriptionId: data.stripeSubscriptionId ?? null,
        stripeSubscriptionItemId: data.stripeSubscriptionItemId ?? null,
        status: data.status ?? "INCOMPLETE",
        trialEndsAt: data.trialEndsAt ?? null,
        currentPeriodStart: data.currentPeriodStart ?? null,
        currentPeriodEnd: data.currentPeriodEnd ?? null,
        cancelAtPeriodEnd: data.cancelAtPeriodEnd ?? false,
        billingCycle: data.billingCycle ?? "monthly",
        scheduledPlanId: data.scheduledPlanId ?? null,
        scheduledChangeAt: data.scheduledChangeAt ?? null,
      },
      update: {
        planId: data.planId,
        stripeCustomerId: data.stripeCustomerId,
        stripeSubscriptionId: data.stripeSubscriptionId,
        stripeSubscriptionItemId: data.stripeSubscriptionItemId,
        status: data.status,
        trialEndsAt: data.trialEndsAt,
        currentPeriodStart: data.currentPeriodStart,
        currentPeriodEnd: data.currentPeriodEnd,
        cancelAtPeriodEnd: data.cancelAtPeriodEnd,
        billingCycle: data.billingCycle,
        scheduledPlanId: data.scheduledPlanId,
        scheduledChangeAt: data.scheduledChangeAt,
      },
      include: { plan: true },
    });
  }

  update(
    tenantId: string,
    data: Prisma.TenantSubscriptionUpdateInput,
  ): Promise<TenantSubscriptionRecord & { plan: Prisma.PlanGetPayload<object> }> {
    return this.database.tenantSubscription.update({
      where: { tenantId },
      data,
      include: { plan: true },
    });
  }

  listAll() {
    return this.database.tenantSubscription.findMany({
      include: { plan: true },
      orderBy: { createdAt: "desc" },
    });
  }

  countByStatus(status: SubscriptionStatus) {
    return this.database.tenantSubscription.count({ where: { status } });
  }

  countCanceledSince(since: Date) {
    return this.database.tenantSubscription.count({
      where: {
        status: "CANCELED",
        updatedAt: { gte: since },
      },
    });
  }
}
