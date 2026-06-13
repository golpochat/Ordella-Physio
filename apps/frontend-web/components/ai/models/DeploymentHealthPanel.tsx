"use client";

import type { DeploymentMetricsSummary, RegionHealth } from "@/lib/training-types";

export type DeploymentHealthPanelProps = {
  metrics: DeploymentMetricsSummary | null | undefined;
  failoverActive?: boolean;
  failoverRegion?: string | null;
};

function healthClass(health: RegionHealth) {
  return `deployment-health-pill deployment-health-${health.toLowerCase()}`;
}

export function DeploymentHealthPanel({ metrics, failoverActive, failoverRegion }: DeploymentHealthPanelProps) {
  const regions = metrics ? Object.entries(metrics.byRegion) : [];

  return (
    <section className="training-deployment-health-panel">
      <h3>Region health</h3>
      {failoverActive ? (
        <p className="training-deployment-failover-warning">Failover routing to {failoverRegion}</p>
      ) : null}
      <div className="training-drift-summary-grid">
        {regions.map(([region, stats]) => (
          <div key={region} className="training-metric-card">
            <div className="dashboard-cell-muted">{region}</div>
            <span className={healthClass(stats.health)}>{stats.health}</span>
            <div className="training-metric-value">{Math.round(stats.avgLatencyMs)} ms</div>
            <div className="dashboard-cell-muted">Error {(stats.errorRate * 100).toFixed(2)}%</div>
          </div>
        ))}
      </div>
      <div className="deployment-latency-heatmap">
        <h4>Latency heatmap</h4>
        <div className="training-chart-bars">
          {regions.map(([region, stats]) => (
            <div key={`heat-${region}`} className="training-chart-bar-wrap">
              <div
                className="training-chart-bar training-chart-bar-accuracy"
                style={{ height: `${Math.min(100, stats.avgLatencyMs)}%` }}
                title={`${region}: ${stats.avgLatencyMs}ms`}
              />
              <span className="training-chart-label">{region.split("-")[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
