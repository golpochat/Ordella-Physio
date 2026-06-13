export type BudgetRecord = {
  id: string;
  tenantId: string;
  monthlyTokenBudget: number;
  monthlyCostBudget: number;
  softLimitPercentage: number;
  hardLimitPercentage: number;
  currentTokensUsed: number;
  currentCostUsed: number;
  periodStart: string;
  periodEnd: string;
};

export type BudgetCheckResult = {
  allowed: boolean;
  softLimitReached: boolean;
  hardLimitReached: boolean;
  tokenUsagePercent: number;
  costUsagePercent: number;
  message?: string;
};

export function toBudgetRecord(row: {
  id: string;
  tenantId: string;
  monthlyTokenBudget: number;
  monthlyCostBudget: number;
  softLimitPercentage: number;
  hardLimitPercentage: number;
  currentTokensUsed: number;
  currentCostUsed: number;
  periodStart: Date;
  periodEnd: Date;
}): BudgetRecord {
  return {
    id: row.id,
    tenantId: row.tenantId,
    monthlyTokenBudget: row.monthlyTokenBudget,
    monthlyCostBudget: row.monthlyCostBudget,
    softLimitPercentage: row.softLimitPercentage,
    hardLimitPercentage: row.hardLimitPercentage,
    currentTokensUsed: row.currentTokensUsed,
    currentCostUsed: row.currentCostUsed,
    periodStart: row.periodStart.toISOString(),
    periodEnd: row.periodEnd.toISOString(),
  };
}
