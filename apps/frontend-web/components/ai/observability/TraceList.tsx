"use client";

import { Badge } from "@/components/ui/badge";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { TraceSpanRecord } from "@/lib/observability-types";

export type TraceListProps = {
  traces: TraceSpanRecord[];
  selectedTraceId?: string | null;
  onSelect?: (traceId: string) => void;
};

export function TraceList({ traces, selectedTraceId, onSelect }: TraceListProps) {
  return (
    <DataTable columns={["Trace ID", "Service", "Operation", "Duration", "Status"]} grid="default" isEmpty={!traces.length} emptyMessage="No traces yet.">
      {traces.map((trace) => (
        <Row key={trace.id}>
          <div>
            <button type="button" className="dashboard-link" onClick={() => onSelect?.(trace.traceId)}>
              {trace.traceId.slice(0, 12)}…
            </button>
          </div>
          <div>{trace.service}</div>
          <div>{trace.operation}</div>
          <div>{trace.durationMs != null ? `${trace.durationMs}ms` : "—"}</div>
          <div>
            <Badge variant={trace.status === "ERROR" ? "destructive" : "secondary"}>{trace.status}</Badge>
            {selectedTraceId === trace.traceId ? <Badge variant="outline">Selected</Badge> : null}
          </div>
        </Row>
      ))}
    </DataTable>
  );
}
