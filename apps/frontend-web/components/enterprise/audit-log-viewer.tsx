"use client";

import { DataTable } from "@/components/super-admin/layout/DataTable";
import { StatusBadge } from "@/components/super-admin/shared/StatusBadge";
import { useAuditLogs } from "@/hooks/useEnterprise";
import { formatPatientDateTime } from "@/lib/patient-portal-utils";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";

type AuditLogViewerProps = {
  global?: boolean;
};

export function AuditLogViewer({ global = false }: AuditLogViewerProps) {
  const logsQuery = useAuditLogs(global);
  const logs = logsQuery.data ?? [];

  if (logsQuery.isLoading) return <PageLoading rows={5} />;
  if (logsQuery.isError) return <PageError onRetry={() => void logsQuery.refetch()} />;

  return (
    <DataTable
      columns={["Action", "Actor", "Tenant", "Status", ""]}
      emptyMessage="No audit logs recorded yet."
      isEmpty={logs.length === 0}
    >
      {logs.map((log) => {
        const action = log?.action ?? "Unknown";
        const resource = log?.resource ?? "resource";
        const actor = log?.actorEmail ?? log?.actorId ?? "System";
        const tenant = global ? (log?.tenantId ?? "N/A") : "Current tenant";
        const status = log?.status ?? "unknown";
        const createdAt = log?.createdAt ? formatPatientDateTime(log.createdAt) : "N/A";

        return (
          <article key={log.id} className="table-row grid-baseline row">
            <div>
              <p className="sa-cell-primary">
                {action} — {resource}
              </p>
              <p className="sa-cell-muted">{createdAt}</p>
            </div>
            <p className="sa-cell-muted">{actor}</p>
            <p className="sa-cell-muted">{tenant}</p>
            <StatusBadge status={status} />
            <span className="sa-cell-muted">{status}</span>
          </article>
        );
      })}
    </DataTable>
  );
}
