"use client";

import type { TrainingCurvePoint } from "@/lib/training-types";

export type TrainingMetricsChartProps = {
  data: TrainingCurvePoint[];
};

export function TrainingMetricsChart({ data }: TrainingMetricsChartProps) {
  if (!data.length) {
    return <p className="dataset-empty-hint">No accuracy curve data yet.</p>;
  }

  return (
    <div className="training-chart">
      <h4>Accuracy curve</h4>
      <div className="training-chart-bars">
        {data.map((point) => (
          <div key={`acc-${point.epoch}`} className="training-chart-bar-wrap">
            <div
              className="training-chart-bar training-chart-bar-accuracy"
              style={{ height: `${Math.min(100, (point.accuracy ?? 0) * 100)}%` }}
              title={`Epoch ${point.epoch}: ${point.accuracy ?? 0}`}
            />
            <span className="training-chart-label">{point.epoch}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
