"use client";

import type { GatewayUsageSummary } from "@/lib/gateway-types";

export type UsageByModelChartProps = {
  models: GatewayUsageSummary["topModels"];
};

export function UsageByModelChart({ models }: UsageByModelChartProps) {
  const maxTokens = Math.max(...models.map((model) => model.tokens), 1);

  return (
    <div className="ai-gateway-model-chart">
      <h3>Usage by model</h3>
      {!models.length ? <p>No model usage recorded yet.</p> : null}
      {models.map((model) => (
        <div key={model.modelId} className="ai-gateway-model-row">
          <div className="ai-gateway-model-meta">
            <span>{model.modelId}</span>
            <span>{model.tokens.toLocaleString()} tokens · ${model.cost.toFixed(2)}</span>
          </div>
          <div className="ai-gateway-model-bar-track">
            <div className="ai-gateway-model-bar" style={{ width: `${(model.tokens / maxTokens) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
