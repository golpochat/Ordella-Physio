"use client";

import type { CostTrendPoint } from "@/lib/cost-types";

export type CostTrendsChartProps = {
  trends: CostTrendPoint[];
};

export function CostTrendsChart({ trends }: CostTrendsChartProps) {
  const maxCost = Math.max(...trends.map((t) => t.totalCost), 0.01);

  return (
    <div className="ai-gateway-model-chart">
      <h3>Cost trends</h3>
      {!trends.length ? <p>No trend data yet.</p> : null}
      {trends.map((point) => (
        <div key={point.periodStart} className="ai-gateway-model-row">
          <div className="ai-gateway-model-meta">
            <span>{new Date(point.periodStart).toLocaleDateString()}</span>
            <span>${point.totalCost.toFixed(2)} · {point.totalTokens.toLocaleString()} tokens</span>
          </div>
          <div className="ai-gateway-model-bar-track">
            <div className="ai-gateway-model-bar" style={{ width: `${(point.totalCost / maxCost) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
