"use client";

import type { HeatmapData } from "@/lib/observability-types";

export type ErrorRateHeatmapProps = {
  data?: HeatmapData;
};

function heatColor(value: number) {
  const ratio = Math.min(1, value * 20);
  return `hsl(${20 - ratio * 20} 80% 50%)`;
}

export function ErrorRateHeatmap({ data }: ErrorRateHeatmapProps) {
  if (!data?.cells.length) return <p className="ai-observability-muted">No error rate heatmap data yet.</p>;

  return (
    <div className="ai-observability-heatmap">
      <h4>Error rate by model × region</h4>
      <table className="ai-observability-heatmap-table">
        <thead>
          <tr>
            <th>Model</th>
            {data.regions.map((region) => (
              <th key={region}>{region}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.cells.map((row) => (
            <tr key={row.modelId}>
              <td>{row.modelId}</td>
              {row.regions.map((cell) => (
                <td key={`${row.modelId}-${cell.region}`}>
                  <span
                    className="ai-observability-heatmap-cell"
                    style={{ backgroundColor: heatColor(cell.value) }}
                    title={`${(cell.value * 100).toFixed(2)}% (${cell.sampleCount} samples)`}
                  >
                    {cell.value > 0 ? `${(cell.value * 100).toFixed(1)}%` : "—"}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
