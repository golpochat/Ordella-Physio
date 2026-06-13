"use client";

import type { CostBudgetStatus } from "@/lib/cost-types";

export type BudgetUsageBarProps = {
  budget: CostBudgetStatus | null | undefined;
};

export function BudgetUsageBar({ budget }: BudgetUsageBarProps) {
  if (!budget) return null;

  const usagePercent = budget.usagePercent ?? Math.max(budget.tokenUsagePercent, budget.costUsagePercent);
  const barClass =
    usagePercent >= budget.hardLimitPercentage
      ? "ai-gateway-budget-bar-hard"
      : usagePercent >= budget.softLimitPercentage
        ? "ai-gateway-budget-bar-soft"
        : "";

  return (
    <div className="ai-gateway-budget-usage">
      <h3>Current usage</h3>
      <div className="ai-gateway-budget-bar-track">
        <div className={`ai-gateway-budget-bar ${barClass}`} style={{ width: `${Math.min(usagePercent, 100)}%` }} />
      </div>
      <p>
        {budget.currentTokensUsed.toLocaleString()} / {budget.monthlyTokenBudget.toLocaleString()} tokens · $
        {budget.currentCostUsed.toFixed(2)} / ${budget.monthlyCostBudget.toFixed(2)}
      </p>
      {budget.softLimitReached ? <p className="ai-cost-alert-text">Soft limit reached ({budget.softLimitPercentage}%)</p> : null}
      {budget.hardLimitReached ? <p className="ai-cost-alert-text ai-cost-alert-critical">Hard limit reached ({budget.hardLimitPercentage}%)</p> : null}
    </div>
  );
}
