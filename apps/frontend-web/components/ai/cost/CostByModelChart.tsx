"use client";

import type { CostByModel } from "@/lib/cost-types";

export type CostByModelChartProps = {
  models: CostByModel[];
};

export function CostByModelChart({ models }: CostByModelChartProps) {
  const maxCost = Math.max(...models.map((m) => m.cost), 0.01);

  return (
    <div className="ai-gateway-model-chart">
      <h3>Cost by model</h3>
      {!models.length ? <p>No model cost data yet.</p> : null}
      {models.map((model) => (
        <div key={model.modelId} className="ai-gateway-model-row">
          <div className="ai-gateway-model-meta">
            <span>{model.modelId}</span>
            <span>${model.cost.toFixed(2)} · {model.tokens.toLocaleString()} tokens</span>
          </div>
          <div className="ai-gateway-model-bar-track">
            <div className="ai-gateway-model-bar" style={{ width: `${(model.cost / maxCost) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
