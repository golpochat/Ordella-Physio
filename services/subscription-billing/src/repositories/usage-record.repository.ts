import { Injectable } from "@nestjs/common";
import type { UsageMetric } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class UsageRecordRepository {
  constructor(private readonly database: DatabaseService) {}

  upsertPeriod(input: {
    tenantId: string;
    metric: UsageMetric;
    quantity: number;
    periodStart: Date;
    periodEnd: Date;
    stripeUsageRecordId?: string | null;
  }) {
    return this.database.usageRecord.upsert({
      where: {
        tenantId_metric_periodStart: {
          tenantId: input.tenantId,
          metric: input.metric,
          periodStart: input.periodStart,
        },
      },
      create: {
        tenantId: input.tenantId,
        metric: input.metric,
        quantity: input.quantity,
        periodStart: input.periodStart,
        periodEnd: input.periodEnd,
        stripeUsageRecordId: input.stripeUsageRecordId ?? null,
      },
      update: {
        quantity: input.quantity,
        periodEnd: input.periodEnd,
        stripeUsageRecordId: input.stripeUsageRecordId ?? undefined,
      },
    });
  }

  incrementQuantity(input: {
    tenantId: string;
    metric: UsageMetric;
    periodStart: Date;
    periodEnd: Date;
    delta: number;
  }) {
    return this.database.usageRecord.upsert({
      where: {
        tenantId_metric_periodStart: {
          tenantId: input.tenantId,
          metric: input.metric,
          periodStart: input.periodStart,
        },
      },
      create: {
        tenantId: input.tenantId,
        metric: input.metric,
        quantity: input.delta,
        periodStart: input.periodStart,
        periodEnd: input.periodEnd,
      },
      update: {
        quantity: { increment: input.delta },
        periodEnd: input.periodEnd,
      },
    });
  }

  findCurrentPeriod(tenantId: string, periodStart: Date) {
    return this.database.usageRecord.findMany({
      where: { tenantId, periodStart },
      orderBy: { metric: "asc" },
    });
  }

  listHistory(tenantId: string, take = 50) {
    return this.database.usageRecord.findMany({
      where: { tenantId },
      orderBy: { periodStart: "desc" },
      take,
    });
  }
}
