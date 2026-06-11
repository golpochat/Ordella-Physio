"use client";

import { DataTable } from "@/components/super-admin/layout/DataTable";
import { StatusBadge } from "@/components/super-admin/shared/StatusBadge";
import { useActivityLogs } from "@/hooks/useEnterprise";
import { formatPatientDateTime } from "@/lib/patient-portal-utils";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";

type ActivityLogViewerProps = {
  global?: boolean;
};

export function ActivityLogViewer({ global = false }: ActivityLogViewerProps) {
  const logsQuery = useActivityLogs(global);
  const logs = logsQuery.data ?? [];

  if (logsQuery.isLoading) return <PageLoading rows={5} />;
  if (logsQuery.isError) return <PageError onRetry={() => void logsQuery.refetch()} />;

  return (
    <DataTable
      columns={["Activity", "Source", "Tenant", "Status", ""]}
      emptyMessage="No activity logs recorded yet."
      isEmpty={logs.length === 0}
    >
      {logs.map((log) => {
        const eventType = log?.eventType ?? "Unknown";
        const source = log?.source ?? "N/A";
        const actor = log?.userId ?? "System";
        const tenant = global ? (log?.tenantId ?? "N/A") : "Current tenant";
        const status = log?.status ?? "unknown";
        const createdAt = log?.createdAt ? formatPatientDateTime(log.createdAt) : "N/A";

        return (
          <article key={log.id} className="table-row grid-baseline row">
            <div>
              <p className="sa-cell-primary">{eventType}</p>
              <p className="sa-cell-muted">{createdAt}</p>
            </div>
            <p className="sa-cell-muted">{source}</p>
            <p className="sa-cell-muted">{tenant}</p>
            <StatusBadge status={status} />
            <span className="sa-cell-muted">{actor}</span>
          </article>
        );
      })}
    </DataTable>
  );
}
