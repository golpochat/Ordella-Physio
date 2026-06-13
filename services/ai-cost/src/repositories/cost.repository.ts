import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { toCostAlertRecord } from "@/models/AICostAlert";
import { toCostBudgetRecord } from "@/models/AICostBudget";
import { toCostProfileRecord } from "@/models/AICostProfile";
import { toCostUsageAggregateRecord } from "@/models/AICostUsageAggregate";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class CostRepository {
  constructor(private readonly db: DatabaseService) {}

  listProfiles(modelId?: string) {
    return this.db.aICostProfile.findMany({
      where: modelId ? { modelId, OR: [{ effectiveTo: null }, { effectiveTo: { gt: new Date() } }] } : undefined,
      orderBy: { effectiveFrom: "desc" },
    });
  }

  getActiveProfile(modelId: string) {
    return this.db.aICostProfile.findFirst({
      where: {
        modelId,
        OR: [{ effectiveTo: null }, { effectiveTo: { gt: new Date() } }],
      },
      orderBy: { effectiveFrom: "desc" },
    });
  }

  upsertProfile(data: {
    modelId: string;
    provider: string;
    pricing: Prisma.InputJsonValue;
  }) {
    return this.db.aICostProfile.create({ data });
  }

  recordUsageEvent(data: {
    tenantId: string;
    modelId?: string;
    feature?: string;
    tokensPrompt?: number;
    tokensCompletion?: number;
    cost?: number;
    metadata?: Prisma.InputJsonValue;
  }) {
    return this.db.aICostUsageEvent.create({ data });
  }

  listUsageEvents(tenantId: string, since?: Date, until?: Date) {
    return this.db.aICostUsageEvent.findMany({
      where: {
        tenantId,
        ...(since || until
          ? {
              timestamp: {
                ...(since ? { gte: since } : {}),
                ...(until ? { lt: until } : {}),
              },
            }
          : {}),
      },
      orderBy: { timestamp: "desc" },
      take: 10000,
    });
  }

  listDistinctTenantIds(since?: Date) {
    return this.db.aICostUsageEvent.findMany({
      where: since ? { timestamp: { gte: since } } : undefined,
      distinct: ["tenantId"],
      select: { tenantId: true },
    });
  }

  upsertAggregate(data: {
    tenantId: string;
    period: string;
    periodStart: Date;
    periodEnd: Date;
    totalTokensPrompt: number;
    totalTokensCompletion: number;
    totalCost: number;
    breakdownByModel: Prisma.InputJsonValue;
    breakdownByFeature: Prisma.InputJsonValue;
  }) {
    return this.db.aICostUsageAggregate.upsert({
      where: {
        tenantId_period_periodStart: {
          tenantId: data.tenantId,
          period: data.period,
          periodStart: data.periodStart,
        },
      },
      create: data,
      update: {
        totalTokensPrompt: data.totalTokensPrompt,
        totalTokensCompletion: data.totalTokensCompletion,
        totalCost: data.totalCost,
        breakdownByModel: data.breakdownByModel,
        breakdownByFeature: data.breakdownByFeature,
        periodEnd: data.periodEnd,
      },
    });
  }

  listAggregates(tenantId: string, period?: string) {
    return this.db.aICostUsageAggregate.findMany({
      where: { tenantId, ...(period ? { period } : {}) },
      orderBy: { periodStart: "desc" },
      take: 90,
    });
  }

  getAggregate(tenantId: string, period: string, periodStart: Date) {
    return this.db.aICostUsageAggregate.findUnique({
      where: { tenantId_period_periodStart: { tenantId, period, periodStart } },
    });
  }

  createAlert(data: {
    tenantId: string;
    type: string;
    severity: string;
    message: string;
    metadata?: Prisma.InputJsonValue;
  }) {
    return this.db.aICostAlert.create({ data });
  }

  listAlerts(tenantId: string, unresolvedOnly = false) {
    return this.db.aICostAlert.findMany({
      where: { tenantId, ...(unresolvedOnly ? { resolvedAt: null } : {}) },
      orderBy: { createdAt: "desc" },
      take: 200,
    });
  }

  resolveAlert(id: string, tenantId: string) {
    return this.db.aICostAlert.updateMany({
      where: { id, tenantId },
      data: { resolvedAt: new Date() },
    });
  }

  getBudget(tenantId: string) {
    return this.db.aICostBudget.findUnique({ where: { tenantId } });
  }

  upsertBudget(tenantId: string, data: Partial<{
    monthlyTokenBudget: number;
    monthlyCostBudget: number;
    softLimitPercentage: number;
    hardLimitPercentage: number;
    currentTokensUsed: number;
    currentCostUsed: number;
    periodStart: Date;
    periodEnd: Date;
  }>) {
    const periodEnd = data.periodEnd ?? new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
    return this.db.aICostBudget.upsert({
      where: { tenantId },
      create: {
        tenantId,
        periodEnd,
        monthlyTokenBudget: data.monthlyTokenBudget ?? 1_000_000,
        monthlyCostBudget: data.monthlyCostBudget ?? 100,
        softLimitPercentage: data.softLimitPercentage ?? 80,
        hardLimitPercentage: data.hardLimitPercentage ?? 100,
      },
      update: data,
    });
  }

  mapProfile(row: NonNullable<Awaited<ReturnType<CostRepository["getActiveProfile"]>>>) {
    return toCostProfileRecord(row);
  }

  mapAggregate(row: Awaited<ReturnType<CostRepository["listAggregates"]>>[number]) {
    return toCostUsageAggregateRecord(row);
  }

  mapAlert(row: Awaited<ReturnType<CostRepository["listAlerts"]>>[number]) {
    return toCostAlertRecord(row);
  }

  mapBudget(row: NonNullable<Awaited<ReturnType<CostRepository["getBudget"]>>>) {
    return toCostBudgetRecord(row);
  }
}
