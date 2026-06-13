"use client";

import type { DriftMetricRecord } from "@/lib/training-types";

export type DriftMetricsChartProps = {
  metrics: DriftMetricRecord[];
};

function chartBars(values: number[], className: string) {
  const max = Math.max(...values, 1);
  return (
    <div className="training-chart-bars">
      {values.map((value, index) => (
        <div key={`${className}-${index}`} className="training-chart-bar-wrap">
          <div
            className={`training-chart-bar ${className}`}
            style={{ height: `${(value / max) * 100}%` }}
          />
          <span className="training-chart-label">{value}</span>
        </div>
      ))}
    </div>
  );
}

export function DriftMetricsChart({ metrics }: DriftMetricsChartProps) {
  const latest = metrics[0];
  if (!latest) {
    return <p className="dashboard-cell-muted">No drift metrics collected yet.</p>;
  }

  const inputDistribution = (latest.inputStats.tokenDistribution as number[]) ?? [0.25, 0.25, 0.25, 0.25];
  const outputDistribution =
    (latest.outputStats.responseDistribution as number[]) ?? [0.25, 0.25, 0.25, 0.25];
  const embeddingShift = Number(latest.embeddingStats.variance ?? 0);
  const latency = Number(latest.performanceStats.avgLatencyMs ?? 0);

  return (
    <div className="training-drift-metrics-charts">
      <div className="training-chart">
        <h4>Input distribution shift</h4>
        {chartBars(inputDistribution, "training-chart-bar-loss")}
      </div>
      <div className="training-chart">
        <h4>Output distribution shift</h4>
        {chartBars(outputDistribution, "training-chart-bar-accuracy")}
      </div>
      <div className="training-chart">
        <h4>Embedding centroid drift</h4>
        {chartBars([embeddingShift, 1 - embeddingShift], "training-chart-bar-loss")}
      </div>
      <div className="training-chart">
        <h4>Performance degradation</h4>
        {chartBars([latency, Number(latest.performanceStats.p95LatencyMs ?? latency)], "training-chart-bar-accuracy")}
      </div>
    </div>
  );
}
