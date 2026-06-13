"use client";

import type { TrainingMetricsResponse } from "@/lib/training-types";

export type TrainingMetricsProps = {
  metrics?: TrainingMetricsResponse;
  isLoading?: boolean;
};

export function TrainingMetrics({ metrics, isLoading = false }: TrainingMetricsProps) {
  if (isLoading) {
    return <p className="dataset-empty-hint">Loading metrics…</p>;
  }

  if (!metrics || !Object.keys(metrics.metrics).length) {
    return <p className="dataset-empty-hint">No metrics available yet.</p>;
  }

  return (
    <div className="training-metrics-grid">
      {Object.entries(metrics.metrics).map(([key, value]) => (
        <div key={key} className="training-metric-card">
          <div className="dashboard-cell-muted">{key}</div>
          <div className="training-metric-value">
            {typeof value === "number" ? value.toLocaleString() : String(value)}
          </div>
        </div>
      ))}
    </div>
  );
}
