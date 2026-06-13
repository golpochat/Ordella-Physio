import { Injectable, Logger } from "@nestjs/common";
import type { CostAlertRecord } from "@/models/AICostAlert";
import { toCostAlertRecord } from "@/models/AICostAlert";
import { CostAggregationService } from "@/services/cost-aggregation.service";
import { CostRepository } from "@/repositories/cost.repository";

@Injectable()
export class CostBudgetService {
  constructor(private readonly repository: CostRepository) {}

  async ensureBudget(tenantId: string) {
    let budget = await this.repository.getBudget(tenantId);
    if (!budget) {
      const periodEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
      budget = await this.repository.upsertBudget(tenantId, { periodEnd });
    }
    return this.repository.mapBudget(budget);
  }

  async getBudgetWithUsage(tenantId: string) {
    const budget = await this.ensureBudget(tenantId);
    const tokenPercent = (budget.currentTokensUsed / budget.monthlyTokenBudget) * 100;
    const costPercent = (budget.currentCostUsed / budget.monthlyCostBudget) * 100;
    return {
      ...budget,
      tokenUsagePercent: tokenPercent,
      costUsagePercent: costPercent,
      usagePercent: Math.max(tokenPercent, costPercent),
      softLimitReached: Math.max(tokenPercent, costPercent) >= budget.softLimitPercentage,
      hardLimitReached: Math.max(tokenPercent, costPercent) >= budget.hardLimitPercentage,
    };
  }

  async updateBudget(tenantId: string, data: {
    monthlyTokenBudget?: number;
    monthlyCostBudget?: number;
    softLimitPercentage?: number;
    hardLimitPercentage?: number;
  }) {
    const updated = await this.repository.upsertBudget(tenantId, data);
    return this.repository.mapBudget(updated);
  }

  async incrementUsage(tenantId: string, tokens: number, cost: number) {
    const budget = await this.repository.getBudget(tenantId);
    if (!budget) return this.ensureBudget(tenantId);
    const updated = await this.repository.upsertBudget(tenantId, {
      currentTokensUsed: budget.currentTokensUsed + tokens,
      currentCostUsed: budget.currentCostUsed + cost,
    });
    return this.repository.mapBudget(updated);
  }
}

@Injectable()
export class CostAlertService {
  private readonly logger = new Logger(CostAlertService.name);

  constructor(
    private readonly repository: CostRepository,
    private readonly budgetService: CostBudgetService,
    private readonly aggregationService: CostAggregationService,
  ) {}

  async createAlert(input: {
    tenantId: string;
    type: "BUDGET_SOFT" | "BUDGET_HARD" | "ANOMALY";
    severity: "INFO" | "WARNING" | "CRITICAL";
    message: string;
    metadata?: Record<string, unknown>;
  }): Promise<CostAlertRecord> {
    const row = await this.repository.createAlert({
      tenantId: input.tenantId,
      type: input.type,
      severity: input.severity,
      message: input.message,
      metadata: (input.metadata ?? {}) as import("@/generated/prisma").Prisma.InputJsonValue,
    });
    this.logger.warn(`Cost alert [${input.severity}] ${input.tenantId}: ${input.message}`);
    return toCostAlertRecord(row);
  }

  async checkBudgetAlerts(tenantId: string) {
    const status = await this.budgetService.getBudgetWithUsage(tenantId);
    const alerts: CostAlertRecord[] = [];

    if (status.hardLimitReached) {
      alerts.push(await this.createAlert({
        tenantId,
        type: "BUDGET_HARD",
        severity: "CRITICAL",
        message: "Monthly AI cost budget hard limit reached.",
        metadata: { usagePercent: status.usagePercent },
      }));
    } else if (status.softLimitReached) {
      alerts.push(await this.createAlert({
        tenantId,
        type: "BUDGET_SOFT",
        severity: "WARNING",
        message: "Monthly AI cost budget soft limit reached.",
        metadata: { usagePercent: status.usagePercent },
      }));
    }

    return alerts;
  }

  async checkAnomalyAlerts(tenantId: string) {
    const trends = await this.aggregationService.getCostTrends(tenantId, "DAILY", 14);
    if (trends.length < 3) return [];

    const recent = trends[trends.length - 1]?.totalCost ?? 0;
    const baseline = trends.slice(0, -1).reduce((sum, p) => sum + p.totalCost, 0) / (trends.length - 1);
    if (baseline > 0 && recent > baseline * 2) {
      return [
        await this.createAlert({
          tenantId,
          type: "ANOMALY",
          severity: "WARNING",
          message: `Sudden cost spike detected: $${recent.toFixed(2)} vs baseline $${baseline.toFixed(2)}.`,
          metadata: { recent, baseline, spikeRatio: recent / baseline },
        }),
      ];
    }

    const byModel = await this.aggregationService.getCostByModel(tenantId);
    const topModel = byModel[0];
    if (topModel && topModel.cost > (trends[trends.length - 1]?.totalCost ?? 0) * 0.8) {
      return [
        await this.createAlert({
          tenantId,
          type: "ANOMALY",
          severity: "INFO",
          message: `Unusual concentration on model ${topModel.modelId} (${((topModel.cost / (trends[trends.length - 1]?.totalCost || 1)) * 100).toFixed(0)}% of spend).`,
          metadata: { modelId: topModel.modelId, modelCost: topModel.cost },
        }),
      ];
    }

    return [];
  }

  async runAlertChecks(tenantId: string) {
    const budgetAlerts = await this.checkBudgetAlerts(tenantId);
    const anomalyAlerts = await this.checkAnomalyAlerts(tenantId);
    return [...budgetAlerts, ...anomalyAlerts];
  }

  async listAlerts(tenantId: string, unresolvedOnly = false) {
    return (await this.repository.listAlerts(tenantId, unresolvedOnly)).map(toCostAlertRecord);
  }

  async resolveAlert(tenantId: string, alertId: string) {
    await this.repository.resolveAlert(alertId, tenantId);
    return { resolved: true, alertId };
  }
}
