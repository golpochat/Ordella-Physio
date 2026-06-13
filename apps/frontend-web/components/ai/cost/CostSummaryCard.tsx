"use client";

import type { CostUsageSummary } from "@/lib/cost-types";

export type CostSummaryCardProps = {
  summary: CostUsageSummary | null | undefined;
};

export function CostSummaryCard({ summary }: CostSummaryCardProps) {
  if (!summary) return null;
  const totalTokens = summary.totalTokensPrompt + summary.totalTokensCompletion;

  return (
    <div className="ai-gateway-usage-summary">
      <div className="ai-gateway-stat">
        <span className="ai-gateway-stat-label">Total cost</span>
        <strong>${summary.totalCost.toFixed(2)}</strong>
      </div>
      <div className="ai-gateway-stat">
        <span className="ai-gateway-stat-label">Total tokens</span>
        <strong>{totalTokens.toLocaleString()}</strong>
      </div>
      <div className="ai-gateway-stat">
        <span className="ai-gateway-stat-label">Prompt tokens</span>
        <strong>{summary.totalTokensPrompt.toLocaleString()}</strong>
      </div>
      <div className="ai-gateway-stat">
        <span className="ai-gateway-stat-label">Completion tokens</span>
        <strong>{summary.totalTokensCompletion.toLocaleString()}</strong>
      </div>
    </div>
  );
}
