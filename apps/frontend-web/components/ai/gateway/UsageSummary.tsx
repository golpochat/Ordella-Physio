"use client";

import type { GatewayUsageSummary } from "@/lib/gateway-types";

export type UsageSummaryProps = {
  summary: GatewayUsageSummary | null | undefined;
};

export function UsageSummary({ summary }: UsageSummaryProps) {
  if (!summary) return null;

  return (
    <div className="ai-gateway-usage-summary">
      <div className="ai-gateway-stat">
        <span className="ai-gateway-stat-label">Total tokens</span>
        <strong>{summary.totalTokens.toLocaleString()}</strong>
      </div>
      <div className="ai-gateway-stat">
        <span className="ai-gateway-stat-label">Total cost</span>
        <strong>${summary.totalCost.toFixed(2)}</strong>
      </div>
      <div className="ai-gateway-stat">
        <span className="ai-gateway-stat-label">Requests</span>
        <strong>{summary.totalRequests.toLocaleString()}</strong>
      </div>
      <div className="ai-gateway-stat">
        <span className="ai-gateway-stat-label">Avg latency</span>
        <strong>{Math.round(summary.avgLatencyMs)} ms</strong>
      </div>
      {summary.topModels.length ? (
        <div className="ai-gateway-top-models">
          <h3>Top models</h3>
          <ul>
            {summary.topModels.slice(0, 5).map((model) => (
              <li key={model.modelId}>
                {model.modelId}: {model.tokens.toLocaleString()} tokens (${model.cost.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
