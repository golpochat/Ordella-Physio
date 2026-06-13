"use client";

import type { HeatmapData } from "@/lib/observability-types";

export type LatencyHeatmapProps = {
  data?: HeatmapData;
};

function heatColor(value: number, max: number) {
  const ratio = max > 0 ? value / max : 0;
  const hue = 120 - ratio * 120;
  return `hsl(${hue} 70% 45%)`;
}

export function LatencyHeatmap({ data }: LatencyHeatmapProps) {
  if (!data?.cells.length) return <p className="ai-observability-muted">No latency heatmap data yet.</p>;

  const max = Math.max(
    ...data.cells.flatMap((row) => row.regions.map((cell) => cell.value)),
    1,
  );

  return (
    <div className="ai-observability-heatmap">
      <h4>Latency by model × region</h4>
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
                    style={{ backgroundColor: heatColor(cell.value, max) }}
                    title={`${cell.value} (${cell.sampleCount} samples)`}
                  >
                    {cell.value > 0 ? cell.value.toFixed(0) : "—"}
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
