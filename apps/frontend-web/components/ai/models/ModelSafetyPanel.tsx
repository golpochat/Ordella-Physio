"use client";

import type { EvaluationMetrics } from "@/lib/training-types";

export type ModelSafetyPanelProps = {
  metrics: EvaluationMetrics;
};

export function ModelSafetyPanel({ metrics }: ModelSafetyPanelProps) {
  return (
    <section className="training-safety-panel">
      <h3>Safety checks</h3>
      <div className="training-metrics-grid">
        <div className="training-metric-card">
          <div className="dashboard-cell-muted">Hallucination rate</div>
          <div className="training-metric-value">{metrics.hallucinationRate}</div>
        </div>
        <div className="training-metric-card">
          <div className="dashboard-cell-muted">Toxicity score</div>
          <div className="training-metric-value">{metrics.toxicityScore}</div>
        </div>
        <div className="training-metric-card">
          <div className="dashboard-cell-muted">PII leakage score</div>
          <div className="training-metric-value">{metrics.piiLeakageScore}</div>
        </div>
      </div>
    </section>
  );
}
