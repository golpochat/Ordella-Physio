"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { LogEventRecord } from "@/lib/observability-types";

export type LogTableProps = {
  logs: LogEventRecord[];
};

export function LogTable({ logs }: LogTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <DataTable columns={["Level", "Service", "Message", "Timestamp", "Details"]} grid="default" isEmpty={!logs.length} emptyMessage="No logs yet.">
      {logs.map((log) => (
        <Row key={log.id}>
          <div>
            <Badge variant={log.level === "ERROR" ? "destructive" : log.level === "WARN" ? "outline" : "secondary"}>
              {log.level}
            </Badge>
          </div>
          <div>{log.service}</div>
          <div>{log.message}</div>
          <div>{new Date(log.timestamp).toLocaleString()}</div>
          <div>
            <button type="button" className="dashboard-link" onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}>
              {expandedId === log.id ? "Hide" : "View"}
            </button>
            {expandedId === log.id ? (
              <pre className="ai-observability-metadata">{JSON.stringify(log.metadata, null, 2)}</pre>
            ) : null}
          </div>
        </Row>
      ))}
    </DataTable>
  );
}
