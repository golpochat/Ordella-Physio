import { Injectable } from "@nestjs/common";
import type { Prisma, TenantSubscription } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class SubscriptionRepository {
  constructor(private readonly database: DatabaseService) {}

  findByTenantId(tenantId: string): Promise<TenantSubscription | null> {
    return this.database.tenantSubscription.findUnique({ where: { tenantId } });
  }

  upsert(tenantId: string, data: Prisma.TenantSubscriptionUpdateInput): Promise<TenantSubscription> {
    return this.database.tenantSubscription.upsert({
      where: { tenantId },
      create: {
        tenantId,
        plan: (data.plan as Prisma.TenantSubscriptionCreateInput["plan"]) ?? "STARTER",
        usageLimit: data.usageLimit as number | null | undefined,
        usageCurrent: 0,
        renewsAt: data.renewsAt as Date | null | undefined,
      },
      update: data,
    });
  }

  incrementUsage(tenantId: string, amount = 1): Promise<TenantSubscription> {
    return this.database.tenantSubscription.update({
      where: { tenantId },
      data: { usageCurrent: { increment: amount } },
    });
  }
}
