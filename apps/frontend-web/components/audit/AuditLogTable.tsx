"use client";

import { useMemo } from "react";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { AuthAuditLog } from "@/lib/super-admin-portal-types";
import { formatPatientDateTime } from "@/lib/patient-portal-utils";

type AuditLogTableProps = {
  logs: AuthAuditLog[];
  tenantNameById?: Map<string, string>;
};

function formatMetadata(metadata: Record<string, unknown> | null): string {
  if (!metadata || Object.keys(metadata).length === 0) {
    return "—";
  }

  return JSON.stringify(metadata, null, 2);
}

export function AuditLogTable({ logs, tenantNameById }: AuditLogTableProps) {
  const columns = useMemo(
    () => ["Timestamp", "User", "Tenant", "Action", "IP Address", "User Agent", "Metadata"],
    [],
  );

  return (
    <DataTable
      columns={columns}
      emptyMessage="Nothing to show yet."
      isEmpty={logs.length === 0}
      grid="audit"
      className="audit-log-table"
    >
      {logs.map((log) => {
        const userLabel = log.userEmail ?? log.userId ?? "—";
        const tenantLabel = log.tenantId
          ? (tenantNameById?.get(log.tenantId) ?? log.tenantId)
          : "—";

        return (
          <article key={log.id} className="table-row grid-baseline row audit-log-row">
            <p className="sa-cell-muted">{formatPatientDateTime(log.createdAt)}</p>
            <p className="sa-cell-primary">{userLabel}</p>
            <p className="sa-cell-muted">{tenantLabel}</p>
            <p className="sa-cell-primary">{log.action}</p>
            <p className="sa-cell-muted">{log.ipAddress ?? "—"}</p>
            <p className="sa-cell-muted audit-log-user-agent">{log.userAgent ?? "—"}</p>
            <details className="audit-log-metadata">
              <summary className="audit-log-metadata-summary">View metadata</summary>
              <pre className="audit-log-metadata-body">{formatMetadata(log.metadata)}</pre>
            </details>
          </article>
        );
      })}
    </DataTable>
  );
}
