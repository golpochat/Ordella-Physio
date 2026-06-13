"use client";

import type { ExperimentReport } from "@/lib/feature-flag-types";

export type ExperimentVariantChartProps = {
  report: ExperimentReport | null | undefined;
};

export function ExperimentVariantChart({ report }: ExperimentVariantChartProps) {
  if (!report?.variants.length) {
    return <p className="dashboard-cell-muted">No variant data to chart.</p>;
  }

  const maxConversion = Math.max(...report.variants.map((v) => v.conversionRate), 0.01);

  return (
    <section className="training-dashboard-section">
      <h3>Conversion comparison</h3>
      <div className="training-chart-bars">
        {report.variants.map((variant) => (
          <div key={variant.variant} className="training-chart-bar-wrap">
            <div
              className="training-chart-bar training-chart-bar-accuracy"
              style={{ height: `${(variant.conversionRate / maxConversion) * 100}%` }}
              title={`${variant.variant}: ${(variant.conversionRate * 100).toFixed(1)}%`}
            />
            <span className="training-chart-label">{variant.variant}</span>
          </div>
        ))}
      </div>
      <h3>Engagement comparison</h3>
      <div className="training-chart-bars">
        {report.variants.map((variant) => {
          const maxEngagement = Math.max(...report.variants.map((v) => v.engagementRate), 0.01);
          return (
            <div key={`eng-${variant.variant}`} className="training-chart-bar-wrap">
              <div
                className="training-chart-bar"
                style={{ height: `${(variant.engagementRate / maxEngagement) * 100}%` }}
              />
              <span className="training-chart-label">{variant.variant}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
