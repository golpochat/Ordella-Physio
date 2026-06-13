import { Injectable, Logger } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type { CostPeriod, CostUsageAggregateRecord } from "@/models/AICostUsageAggregate";
import { CostCalculatorService } from "@/services/cost-calculator.service";
import { CostRepository } from "@/repositories/cost.repository";

type Breakdown = Record<string, { tokens: number; cost: number; requests: number }>;

@Injectable()
export class CostAggregationService {
  private readonly logger = new Logger(CostAggregationService.name);

  constructor(
    private readonly repository: CostRepository,
    private readonly calculator: CostCalculatorService,
  ) {}

  private startOfDay(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private startOfMonth(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  private endOfDay(start: Date) {
    return new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1);
  }

  private endOfMonth(start: Date) {
    return new Date(start.getFullYear(), start.getMonth() + 1, 1);
  }

  private buildBreakdown(events: Awaited<ReturnType<CostRepository["listUsageEvents"]>>, field: "modelId" | "feature") {
    const breakdown: Breakdown = {};
    for (const event of events) {
      const key = (field === "modelId" ? event.modelId : event.feature) ?? "unknown";
      const tokens = event.tokensPrompt + event.tokensCompletion;
      const current = breakdown[key] ?? { tokens: 0, cost: 0, requests: 0 };
      breakdown[key] = {
        tokens: current.tokens + tokens,
        cost: current.cost + event.cost,
        requests: current.requests + 1,
      };
    }
    return breakdown;
  }

  async recordEvent(input: {
    tenantId: string;
    modelId?: string;
    feature?: string;
    tokensPrompt?: number;
    tokensCompletion?: number;
    metadata?: Record<string, unknown>;
  }) {
    const modelId = input.modelId ?? "unknown";
    const cost = await this.calculator.calculateCost(modelId, input.tokensPrompt ?? 0, input.tokensCompletion ?? 0);
    const row = await this.repository.recordUsageEvent({
      tenantId: input.tenantId,
      modelId,
      feature: input.feature,
      tokensPrompt: input.tokensPrompt ?? 0,
      tokensCompletion: input.tokensCompletion ?? 0,
      cost,
      metadata: (input.metadata ?? {}) as Prisma.InputJsonValue,
    });
    return { cost, eventId: row.id };
  }

  async aggregatePeriod(tenantId: string, period: CostPeriod, periodStart: Date) {
    const periodEnd = period === "DAILY" ? this.endOfDay(periodStart) : this.endOfMonth(periodStart);
    const events = await this.repository.listUsageEvents(tenantId, periodStart, periodEnd);

    let totalTokensPrompt = 0;
    let totalTokensCompletion = 0;
    let totalCost = 0;
    for (const event of events) {
      totalTokensPrompt += event.tokensPrompt;
      totalTokensCompletion += event.tokensCompletion;
      totalCost += event.cost;
    }

    const row = await this.repository.upsertAggregate({
      tenantId,
      period,
      periodStart,
      periodEnd,
      totalTokensPrompt,
      totalTokensCompletion,
      totalCost,
      breakdownByModel: this.buildBreakdown(events, "modelId") as Prisma.InputJsonValue,
      breakdownByFeature: this.buildBreakdown(events, "feature") as Prisma.InputJsonValue,
    });

    this.logger.debug(`Aggregated ${period} cost for ${tenantId}: $${totalCost.toFixed(4)}`);
    return this.repository.mapAggregate(row);
  }

  async aggregateDaily(tenantId: string, date = new Date()) {
    return this.aggregatePeriod(tenantId, "DAILY", this.startOfDay(date));
  }

  async aggregateMonthly(tenantId: string, date = new Date()) {
    return this.aggregatePeriod(tenantId, "MONTHLY", this.startOfMonth(date));
  }

  async getTenantCostSummary(tenantId: string, period: CostPeriod = "MONTHLY") {
    const periodStart = period === "DAILY" ? this.startOfDay() : this.startOfMonth();
    let aggregate = await this.repository.getAggregate(tenantId, period, periodStart);
    if (!aggregate) {
      const created = await this.aggregatePeriod(tenantId, period, periodStart);
      return created;
    }
    return this.repository.mapAggregate(aggregate);
  }

  async getCostByModel(tenantId: string, period: CostPeriod = "MONTHLY") {
    const summary = await this.getTenantCostSummary(tenantId, period);
    return Object.entries(summary.breakdownByModel)
      .map(([modelId, stats]) => ({ modelId, ...stats }))
      .sort((a, b) => b.cost - a.cost);
  }

  async getCostByFeature(tenantId: string, period: CostPeriod = "MONTHLY") {
    const summary = await this.getTenantCostSummary(tenantId, period);
    return Object.entries(summary.breakdownByFeature)
      .map(([feature, stats]) => ({ feature, ...stats }))
      .sort((a, b) => b.cost - a.cost);
  }

  async getCostTrends(tenantId: string, period: CostPeriod = "DAILY", limit = 30) {
    const aggregates = await this.repository.listAggregates(tenantId, period);
    return aggregates
      .slice(0, limit)
      .reverse()
      .map((row) => ({
        periodStart: row.periodStart.toISOString(),
        totalCost: row.totalCost,
        totalTokens: row.totalTokensPrompt + row.totalTokensCompletion,
      }));
  }

  async runScheduledAggregation() {
    const tenants = await this.repository.listDistinctTenantIds(new Date(Date.now() - 86_400_000 * 31));
    for (const entry of tenants) {
      await this.aggregateDaily(entry.tenantId);
      await this.aggregateMonthly(entry.tenantId);
    }
    return { aggregated: tenants.length };
  }
}
