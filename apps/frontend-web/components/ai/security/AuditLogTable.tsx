"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { AuditLogRecord } from "@/lib/security-types";

export type AuditLogTableProps = {
  logs: AuditLogRecord[];
};

export function AuditLogTable({ logs }: AuditLogTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <DataTable columns={["Action", "Model", "Actor", "Timestamp", "PII", "Details"]} grid="default" isEmpty={!logs.length} emptyMessage="No audit logs yet.">
      {logs.map((log) => (
        <Row key={log.id}>
          <div>{log.action}</div>
          <div>{log.modelId ?? "—"}</div>
          <div>{log.userId ?? log.apiKeyId ?? "—"}</div>
          <div>{new Date(log.timestamp).toLocaleString()}</div>
          <div>
            {log.piiDetected ? <Badge variant="destructive">PII</Badge> : <Badge variant="secondary">Clean</Badge>}
            {log.redacted ? <Badge variant="outline">Redacted</Badge> : null}
          </div>
          <div>
            <button type="button" className="dashboard-link" onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}>
              {expandedId === log.id ? "Hide" : "View"}
            </button>
            {expandedId === log.id ? (
              <pre className="ai-security-metadata">{JSON.stringify({ request: log.requestMetadata, response: log.responseMetadata }, null, 2)}</pre>
            ) : null}
          </div>
        </Row>
      ))}
    </DataTable>
  );
}
