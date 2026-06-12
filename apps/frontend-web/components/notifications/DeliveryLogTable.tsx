"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import { PageLoading } from "@/components/patient-portal/page-state";
import { useDeliveryLogs } from "@/hooks/useNotificationProviders";
import { formatPortalDateTime } from "@/lib/clinic-portal-utils";
import { cn } from "@/lib/cn";
import type { DeliveryLogListFilters, DeliveryLogRecord } from "@/lib/notification-provider-types";

type DeliveryLogTableProps = {
  filters: DeliveryLogListFilters;
};

function StatusBadge({ status }: { status: DeliveryLogRecord["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
        status === "SUCCESS" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800",
      )}
    >
      {status}
    </span>
  );
}

function ExpandedPayload({ log }: { log: DeliveryLogRecord }) {
  return (
    <div className="space-y-3 rounded-md border bg-muted/30 p-3 text-xs">
      <div>
        <p className="mb-1 font-medium">Request payload</p>
        <pre className="overflow-x-auto whitespace-pre-wrap break-all">
          {JSON.stringify(log.requestPayload, null, 2)}
        </pre>
      </div>
      <div>
        <p className="mb-1 font-medium">Response payload</p>
        <pre className="overflow-x-auto whitespace-pre-wrap break-all">
          {JSON.stringify(log.responsePayload, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export function DeliveryLogTable({ filters }: DeliveryLogTableProps) {
  const logsQuery = useDeliveryLogs(filters);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const logs = logsQuery.data?.data ?? [];

  if (logsQuery.isLoading) {
    return <PageLoading rows={6} />;
  }

  return (
    <div className="delivery-log-table space-y-4">
      <DataTable
        columns={["Timestamp", "Channel", "Provider", "Status", "Error", "Retries", ""]}
        emptyMessage="No delivery logs found."
        isEmpty={logs.length === 0}
        grid="default"
      >
        {logs.map((log) => (
          <article key={log.id} className="table-row grid-baseline row space-y-2">
            <p className="sa-cell-muted">{formatPortalDateTime(log.createdAt)}</p>
            <p className="sa-cell-primary">{log.channel}</p>
            <p className="sa-cell-muted">{log.provider}</p>
            <div>
              <StatusBadge status={log.status} />
            </div>
            <p className="sa-cell-muted line-clamp-2">{log.errorMessage ?? "—"}</p>
            <div className="space-y-1">
              {log.retryCount > 0 ? (
                <span className="inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">
                  Retried {log.retryCount} time{log.retryCount === 1 ? "" : "s"}
                </span>
              ) : (
                <span className="text-sm text-muted-foreground">0</span>
              )}
              {log.nextAttemptAt ? (
                <p className="text-xs text-muted-foreground">
                  Next retry {formatPortalDateTime(log.nextAttemptAt)}
                </p>
              ) : null}
            </div>
            <div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setExpandedId((current) => (current === log.id ? null : log.id))}
              >
                {expandedId === log.id ? "Hide" : "Details"}
              </Button>
            </div>
            {expandedId === log.id ? (
              <div className="col-span-full">
                <ExpandedPayload log={log} />
              </div>
            ) : null}
          </article>
        ))}
      </DataTable>

      {logsQuery.data?.pagination ? (
        <p className="text-sm text-muted-foreground">
          Page {logsQuery.data.pagination.page} of {logsQuery.data.pagination.totalPages} ·{" "}
          {logsQuery.data.pagination.total} total
        </p>
      ) : null}
    </div>
  );
}
