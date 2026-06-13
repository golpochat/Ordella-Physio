"use client";

import type { EvaluationMetrics } from "@/lib/training-types";

export type ModelBiasPanelProps = {
  metrics: EvaluationMetrics;
};

export function ModelBiasPanel({ metrics }: ModelBiasPanelProps) {
  const { biasScores } = metrics;

  return (
    <section className="training-bias-panel">
      <h3>Bias detection</h3>
      <div className="training-metrics-grid">
        <div className="training-metric-card">
          <div className="dashboard-cell-muted">Gender bias</div>
          <div className="training-metric-value">{biasScores.gender}</div>
        </div>
        <div className="training-metric-card">
          <div className="dashboard-cell-muted">Age bias</div>
          <div className="training-metric-value">{biasScores.age}</div>
        </div>
        <div className="training-metric-card">
          <div className="dashboard-cell-muted">Ethnicity bias</div>
          <div className="training-metric-value">{biasScores.ethnicity}</div>
        </div>
      </div>
    </section>
  );
}
