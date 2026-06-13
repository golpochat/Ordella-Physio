"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { BudgetRecord } from "@/lib/gateway-types";

export type BudgetConfigProps = {
  budget: BudgetRecord | null | undefined;
  isSaving?: boolean;
  onSave: (payload: {
    monthlyTokenBudget: number;
    monthlyCostBudget: number;
    softLimitPercentage: number;
    hardLimitPercentage: number;
  }) => void;
};

export function BudgetConfig({ budget, isSaving, onSave }: BudgetConfigProps) {
  const [monthlyTokenBudget, setMonthlyTokenBudget] = useState(String(budget?.monthlyTokenBudget ?? 1000000));
  const [monthlyCostBudget, setMonthlyCostBudget] = useState(String(budget?.monthlyCostBudget ?? 100));
  const [softLimitPercentage, setSoftLimitPercentage] = useState(String(budget?.softLimitPercentage ?? 80));
  const [hardLimitPercentage, setHardLimitPercentage] = useState(String(budget?.hardLimitPercentage ?? 100));

  const tokenPercent = budget ? (budget.currentTokensUsed / budget.monthlyTokenBudget) * 100 : 0;
  const costPercent = budget ? (budget.currentCostUsed / budget.monthlyCostBudget) * 100 : 0;
  const usagePercent = Math.max(tokenPercent, costPercent);

  return (
    <div className="ai-gateway-budget-form">
      <h3>Monthly budget</h3>
      {budget ? (
        <div className="ai-gateway-budget-usage">
          <div className="ai-gateway-budget-bar-track">
            <div
              className={`ai-gateway-budget-bar ${usagePercent >= budget.hardLimitPercentage ? "ai-gateway-budget-bar-hard" : usagePercent >= budget.softLimitPercentage ? "ai-gateway-budget-bar-soft" : ""}`}
              style={{ width: `${Math.min(usagePercent, 100)}%` }}
            />
          </div>
          <p>
            {budget.currentTokensUsed.toLocaleString()} / {budget.monthlyTokenBudget.toLocaleString()} tokens · $
            {budget.currentCostUsed.toFixed(2)} / ${budget.monthlyCostBudget.toFixed(2)}
          </p>
        </div>
      ) : null}
      <div className="form-grid">
        <div>
          <label className="automation-form-section-title" htmlFor="token-budget">Monthly token budget</label>
          <Input id="token-budget" type="number" value={monthlyTokenBudget} onChange={(e) => setMonthlyTokenBudget(e.target.value)} />
        </div>
        <div>
          <label className="automation-form-section-title" htmlFor="cost-budget">Monthly cost budget ($)</label>
          <Input id="cost-budget" type="number" step="0.01" value={monthlyCostBudget} onChange={(e) => setMonthlyCostBudget(e.target.value)} />
        </div>
        <div>
          <label className="automation-form-section-title" htmlFor="soft-limit">Soft limit (%)</label>
          <Input id="soft-limit" type="number" value={softLimitPercentage} onChange={(e) => setSoftLimitPercentage(e.target.value)} />
        </div>
        <div>
          <label className="automation-form-section-title" htmlFor="hard-limit">Hard limit (%)</label>
          <Input id="hard-limit" type="number" value={hardLimitPercentage} onChange={(e) => setHardLimitPercentage(e.target.value)} />
        </div>
      </div>
      <Button
        type="button"
        disabled={isSaving}
        onClick={() =>
          onSave({
            monthlyTokenBudget: Number(monthlyTokenBudget),
            monthlyCostBudget: Number(monthlyCostBudget),
            softLimitPercentage: Number(softLimitPercentage),
            hardLimitPercentage: Number(hardLimitPercentage),
          })
        }
      >
        Save budget
      </Button>
    </div>
  );
}
