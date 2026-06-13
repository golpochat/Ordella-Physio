"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CostBudgetStatus } from "@/lib/cost-types";

export type BudgetConfigPanelProps = {
  budget: CostBudgetStatus | null | undefined;
  isSaving?: boolean;
  onSave: (payload: {
    monthlyTokenBudget: number;
    monthlyCostBudget: number;
    softLimitPercentage: number;
    hardLimitPercentage: number;
  }) => void;
};

export function BudgetConfigPanel({ budget, isSaving, onSave }: BudgetConfigPanelProps) {
  const [monthlyTokenBudget, setMonthlyTokenBudget] = useState(String(budget?.monthlyTokenBudget ?? 1000000));
  const [monthlyCostBudget, setMonthlyCostBudget] = useState(String(budget?.monthlyCostBudget ?? 100));
  const [softLimitPercentage, setSoftLimitPercentage] = useState(String(budget?.softLimitPercentage ?? 80));
  const [hardLimitPercentage, setHardLimitPercentage] = useState(String(budget?.hardLimitPercentage ?? 100));

  return (
    <div className="ai-gateway-budget-form">
      <h3>Budget configuration</h3>
      <div className="form-grid">
        <div>
          <label className="automation-form-section-title" htmlFor="cost-token-budget">Monthly token budget</label>
          <Input id="cost-token-budget" type="number" value={monthlyTokenBudget} onChange={(e) => setMonthlyTokenBudget(e.target.value)} />
        </div>
        <div>
          <label className="automation-form-section-title" htmlFor="cost-cost-budget">Monthly cost budget ($)</label>
          <Input id="cost-cost-budget" type="number" step="0.01" value={monthlyCostBudget} onChange={(e) => setMonthlyCostBudget(e.target.value)} />
        </div>
        <div>
          <label className="automation-form-section-title" htmlFor="cost-soft-limit">Soft limit (%)</label>
          <Input id="cost-soft-limit" type="number" value={softLimitPercentage} onChange={(e) => setSoftLimitPercentage(e.target.value)} />
        </div>
        <div>
          <label className="automation-form-section-title" htmlFor="cost-hard-limit">Hard limit (%)</label>
          <Input id="cost-hard-limit" type="number" value={hardLimitPercentage} onChange={(e) => setHardLimitPercentage(e.target.value)} />
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
