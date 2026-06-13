"use client";

import type { DeploymentMetricsSummary } from "@/lib/training-types";

export type DeploymentMetricsChartProps = {
  metrics: DeploymentMetricsSummary | null | undefined;
};

export function DeploymentMetricsChart({ metrics }: DeploymentMetricsChartProps) {
  if (!metrics?.series.length) {
    return <p className="dashboard-cell-muted">No deployment metrics yet.</p>;
  }

  const byRegion = metrics.series.reduce<Record<string, typeof metrics.series>>((acc, point) => {
    acc[point.region] = acc[point.region] ? [...acc[point.region], point] : [point];
    return acc;
  }, {});

  return (
    <section className="training-deployment-metrics">
      <h3>Deployment metrics</h3>
      {Object.entries(byRegion).map(([region, points]) => {
        const maxRequests = Math.max(...points.map((p) => p.requests), 1);
        return (
          <div key={region} className="training-dashboard-section">
            <h4>{region} — requests & latency</h4>
            <div className="training-chart-bars">
              {points.slice(0, 12).reverse().map((point) => (
                <div key={point.id} className="training-chart-bar-wrap">
                  <div
                    className="training-chart-bar"
                    style={{ height: `${(point.requests / maxRequests) * 100}%` }}
                    title={`${point.requests} req · ${point.latencyMs}ms · err ${(point.errorRate * 100).toFixed(1)}%`}
                  />
                  <span className="training-chart-label">{new Date(point.timestamp).getHours()}h</span>
                </div>
              ))}
            </div>
            <p className="dashboard-cell-muted">
              Canary stable: {points[0]?.canaryStable ? "Yes" : "No"} · Rollout {points[0]?.rolloutPercent}%
            </p>
          </div>
        );
      })}
    </section>
  );
}
