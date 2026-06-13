"use client";

import type { MetricAggregate } from "@/lib/observability-types";

export type MetricChartsProps = {
  latency?: MetricAggregate;
  errorRate?: MetricAggregate;
  throughput?: MetricAggregate;
  tokenUsage?: MetricAggregate;
};

function MetricCard({ title, data }: { title: string; data?: MetricAggregate }) {
  if (!data) return null;
  return (
    <div className="ai-observability-metric-card">
      <h4>{title}</h4>
      <dl className="ai-observability-metric-grid">
        <div><dt>Avg</dt><dd>{data.avg}</dd></div>
        <div><dt>P50</dt><dd>{data.p50}</dd></div>
        <div><dt>P95</dt><dd>{data.p95}</dd></div>
        <div><dt>P99</dt><dd>{data.p99}</dd></div>
        <div><dt>Min</dt><dd>{data.min}</dd></div>
        <div><dt>Max</dt><dd>{data.max}</dd></div>
        <div><dt>Samples</dt><dd>{data.count}</dd></div>
      </dl>
    </div>
  );
}

export function MetricCharts({ latency, errorRate, throughput, tokenUsage }: MetricChartsProps) {
  return (
    <div className="ai-observability-metrics-grid">
      <MetricCard title="Latency" data={latency} />
      <MetricCard title="Error rate" data={errorRate} />
      <MetricCard title="Throughput" data={throughput} />
      <MetricCard title="Token usage" data={tokenUsage} />
    </div>
  );
}
