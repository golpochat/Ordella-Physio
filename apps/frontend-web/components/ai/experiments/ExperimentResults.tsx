"use client";

import type { ExperimentReport } from "@/lib/feature-flag-types";

export type ExperimentResultsProps = {
  report: ExperimentReport | null | undefined;
};

export function ExperimentResults({ report }: ExperimentResultsProps) {
  if (!report) {
    return <p className="dashboard-cell-muted">No results yet. Run the experiment and collect events.</p>;
  }

  return (
    <section className="training-deployment-metrics">
      <header className="training-model-details-header">
        <div>
          <h3>{report.experimentName}</h3>
          <p className="dashboard-cell-muted">{report.recommendation}</p>
        </div>
        <div className="training-metric-card">
          <div className="dashboard-cell-muted">Significance</div>
          <div className="training-metric-value">{(report.statisticalSignificance * 100).toFixed(1)}%</div>
        </div>
      </header>
      <div className="training-metrics-grid">
        {report.variants.map((variant) => (
          <div key={variant.variant} className="training-metric-card">
            <div className="dataset-list-name">Variant {variant.variant}</div>
            <div className="dashboard-cell-muted">Conversion {(variant.conversionRate * 100).toFixed(1)}%</div>
            <div className="dashboard-cell-muted">Engagement {(variant.engagementRate * 100).toFixed(1)}%</div>
            <div className="dashboard-cell-muted">Latency {Math.round(variant.avgLatencyMs)} ms</div>
            <div className="dashboard-cell-muted">Error {(variant.errorRate * 100).toFixed(2)}%</div>
            {report.winner === variant.variant ? <strong>Winner</strong> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
