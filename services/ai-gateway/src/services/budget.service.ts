import { Injectable } from "@nestjs/common";
import type { BudgetCheckResult } from "@/models/AIBudget";
import { toBudgetRecord } from "@/models/AIBudget";
import { GatewayRepository } from "@/repositories/gateway.repository";

@Injectable()
export class BudgetService {
  constructor(private readonly repository: GatewayRepository) {}

  async ensureBudget(tenantId: string) {
    let budget = await this.repository.getBudget(tenantId);
    if (!budget) {
      const periodEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
      budget = await this.repository.upsertBudget(tenantId, { periodEnd });
    }
    return toBudgetRecord(budget);
  }

  async checkBudget(tenantId: string, tokens = 0, cost = 0): Promise<BudgetCheckResult> {
    const budget = await this.ensureBudget(tenantId);
    const projectedTokens = budget.currentTokensUsed + tokens;
    const projectedCost = budget.currentCostUsed + cost;
    const tokenUsagePercent = (projectedTokens / budget.monthlyTokenBudget) * 100;
    const costUsagePercent = (projectedCost / budget.monthlyCostBudget) * 100;
    const usagePercent = Math.max(tokenUsagePercent, costUsagePercent);
    const softLimitReached = usagePercent >= budget.softLimitPercentage;
    const hardLimitReached = usagePercent >= budget.hardLimitPercentage;

    return {
      allowed: !hardLimitReached,
      softLimitReached,
      hardLimitReached,
      tokenUsagePercent,
      costUsagePercent,
      message: hardLimitReached
        ? "Monthly AI budget hard limit reached."
        : softLimitReached
          ? "Monthly AI budget soft limit reached."
          : undefined,
    };
  }

  async incrementBudget(tenantId: string, tokens: number, cost: number) {
    const budget = await this.repository.getBudget(tenantId);
    if (!budget) return this.ensureBudget(tenantId);
    const updated = await this.repository.upsertBudget(tenantId, {
      currentTokensUsed: budget.currentTokensUsed + tokens,
      currentCostUsed: budget.currentCostUsed + cost,
    });
    return toBudgetRecord(updated);
  }

  async isSoftLimitReached(tenantId: string) {
    const result = await this.checkBudget(tenantId, 0, 0);
    return result.softLimitReached;
  }

  async isHardLimitReached(tenantId: string) {
    const result = await this.checkBudget(tenantId, 0, 0);
    return result.hardLimitReached;
  }

  async updateBudget(tenantId: string, data: {
    monthlyTokenBudget?: number;
    monthlyCostBudget?: number;
    softLimitPercentage?: number;
    hardLimitPercentage?: number;
  }) {
    const updated = await this.repository.upsertBudget(tenantId, data);
    return toBudgetRecord(updated);
  }
}
