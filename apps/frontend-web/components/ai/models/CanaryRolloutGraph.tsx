"use client";

import type { CanaryHistoryPoint } from "@/lib/training-types";

export type CanaryRolloutGraphProps = {
  history: CanaryHistoryPoint[];
};

export function CanaryRolloutGraph({ history }: CanaryRolloutGraphProps) {
  if (!history.length) {
    return (
      <section className="training-canary-graph">
        <h3>Canary rollout</h3>
        <p className="dashboard-cell-muted">No canary history yet. Start production promotion to begin.</p>
      </section>
    );
  }

  const maxRollout = 100;

  return (
    <section className="training-canary-graph">
      <h3>Canary rollout</h3>
      <div className="training-canary-metrics">
        <div>
          <div className="dashboard-cell-muted">Latest error rate</div>
          <div className="training-metric-value">{history.at(-1)?.errorRate ?? "—"}</div>
        </div>
        <div>
          <div className="dashboard-cell-muted">Latest latency (ms)</div>
          <div className="training-metric-value">{history.at(-1)?.latencyMs ?? "—"}</div>
        </div>
        <div>
          <div className="dashboard-cell-muted">Latest safety score</div>
          <div className="training-metric-value">{history.at(-1)?.safetyScore ?? "—"}</div>
        </div>
      </div>

      <div className="training-chart training-canary-chart">
        <h4>Rollout over time</h4>
        <div className="training-chart-bars">
          {history.map((point) => (
            <div key={point.timestamp} className="training-chart-bar-wrap">
              <div
                className="training-chart-bar training-chart-bar-accuracy"
                style={{ height: `${(point.rolloutPercentage / maxRollout) * 100}%` }}
              />
              <span className="training-chart-label">{point.rolloutPercentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
