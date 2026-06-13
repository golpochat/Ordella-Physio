"use client";

import type { TrainingCurvePoint } from "@/lib/training-types";

export type TrainingLossChartProps = {
  data: TrainingCurvePoint[];
};

export function TrainingLossChart({ data }: TrainingLossChartProps) {
  if (!data.length) {
    return <p className="dataset-empty-hint">No loss curve data yet.</p>;
  }

  const maxLoss = Math.max(...data.map((point) => point.loss), 0.001);

  return (
    <div className="training-chart">
      <h4>Loss curve</h4>
      <div className="training-chart-bars">
        {data.map((point) => (
          <div key={`loss-${point.epoch}`} className="training-chart-bar-wrap">
            <div
              className="training-chart-bar training-chart-bar-loss"
              style={{ height: `${(point.loss / maxLoss) * 100}%` }}
              title={`Epoch ${point.epoch}: ${point.loss}`}
            />
            <span className="training-chart-label">{point.epoch}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
