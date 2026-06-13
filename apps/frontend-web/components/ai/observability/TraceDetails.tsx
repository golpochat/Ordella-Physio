"use client";

import { Badge } from "@/components/ui/badge";
import type { TraceDetail } from "@/lib/observability-types";

export type TraceDetailsProps = {
  trace: TraceDetail | null | undefined;
  isLoading?: boolean;
};

export function TraceDetails({ trace, isLoading }: TraceDetailsProps) {
  if (isLoading) return <p className="ai-observability-muted">Loading trace…</p>;
  if (!trace) return <p className="ai-observability-muted">Select a trace to view the waterfall.</p>;

  return (
    <div className="ai-observability-trace-details">
      <div className="ai-observability-trace-header">
        <h3>Trace {trace.traceId.slice(0, 16)}…</h3>
        <Badge variant={trace.status === "ERROR" ? "destructive" : "secondary"}>{trace.status}</Badge>
        <span>{trace.durationMs}ms total</span>
      </div>
      <div className="ai-observability-waterfall">
        {trace.waterfall.map((span) => (
          <div key={span.spanId} className="ai-observability-waterfall-row">
            <div className="ai-observability-waterfall-label">
              <strong>{span.operation}</strong>
              <span>{span.service}</span>
            </div>
            <div className="ai-observability-waterfall-bar-wrap">
              <div
                className={`ai-observability-waterfall-bar ${span.status === "ERROR" ? "ai-observability-waterfall-bar-error" : ""}`}
                style={{ width: `${Math.min(100, Math.max(8, span.durationMs / 10))}%` }}
              />
              <span>{span.durationMs}ms</span>
            </div>
          </div>
        ))}
      </div>
      <pre className="ai-observability-metadata">{JSON.stringify(trace.spans, null, 2)}</pre>
    </div>
  );
}
