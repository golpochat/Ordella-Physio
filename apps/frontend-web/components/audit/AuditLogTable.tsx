"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import { PageLoading } from "@/components/patient-portal/page-state";
import type { AuditLogListFilters, AuditLogSortField, DomainAuditLogRecord } from "@/lib/audit-types";
import { formatPortalDateTime } from "@/lib/clinic-portal-utils";
import { formatRelativeAuditTime, getAuditActionClass } from "@/lib/audit-utils";
import { cn } from "@/lib/cn";

const SORTABLE_COLUMNS: Array<{ key: AuditLogSortField; label: string }> = [
  { key: "createdAt", label: "Timestamp" },
  { key: "actorUserId", label: "Actor" },
  { key: "entityType", label: "Entity type" },
  { key: "entityId", label: "Entity ID" },
  { key: "action", label: "Action" },
];

type ActorLabelLookup = Map<string, string>;

type AuditLogTableProps = {
  logs: DomainAuditLogRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  sortBy?: AuditLogListFilters["sortBy"];
  sortOrder?: AuditLogListFilters["sortOrder"];
  actorLabels?: ActorLabelLookup;
  isLoading?: boolean;
  isBusy?: boolean;
  onPageChange: (page: number) => void;
  onSortChange?: (sortBy: AuditLogSortField, sortOrder: "asc" | "desc") => void;
  onRowSelect?: (log: DomainAuditLogRecord) => void;
  selectedLogId?: string | null;
};

function formatMetadata(metadata: Record<string, unknown> | null): string {
  if (!metadata || Object.keys(metadata).length === 0) {
    return "—";
  }

  return JSON.stringify(metadata, null, 2);
}

function formatMetadataPreview(metadata: Record<string, unknown> | null): string {
  if (!metadata || Object.keys(metadata).length === 0) {
    return "—";
  }

  const compact = JSON.stringify(metadata);
  return compact.length > 80 ? `${compact.slice(0, 77)}…` : compact;
}

export function AuditLogTable({
  logs,
  pagination,
  sortBy = "createdAt",
  sortOrder = "desc",
  actorLabels,
  isLoading = false,
  isBusy = false,
  onPageChange,
  onSortChange,
  onRowSelect,
  selectedLogId,
}: AuditLogTableProps) {
  const columns = useMemo(
    () => ["Timestamp", "Actor", "Entity type", "Entity ID", "Action", "Metadata"],
    [],
  );

  const totalPages = Math.max(1, pagination.totalPages || 1);
  const currentPage = pagination.page;

  function handleSort(column: AuditLogSortField) {
    if (!onSortChange) {
      return;
    }

    if (sortBy === column) {
      onSortChange(column, sortOrder === "asc" ? "desc" : "asc");
      return;
    }

    onSortChange(column, "asc");
  }

  if (isLoading) {
    return <PageLoading rows={6} />;
  }

  return (
    <div className="user-list-table">
      {onSortChange ? (
        <div className="user-list-sort-controls">
          {SORTABLE_COLUMNS.map((column) => (
            <button
              key={column.key}
              type="button"
              className={cn(
                "user-list-sort-button",
                sortBy === column.key && "user-list-sort-button-active",
              )}
              disabled={isBusy}
              onClick={() => handleSort(column.key)}
            >
              {column.label}
              {sortBy === column.key ? (sortOrder === "asc" ? " ↑" : " ↓") : null}
            </button>
          ))}
        </div>
      ) : null}

      <DataTable
        columns={columns}
        emptyMessage="No audit logs found."
        isEmpty={logs.length === 0}
        grid="audit"
        className="audit-log-table"
      >
        {logs.map((log) => {
          const actorLabel = actorLabels?.get(log.actorUserId) ?? log.actorUserId;

          return (
            <article
              key={log.id}
              className={cn(
                "table-row grid-baseline row audit-log-row",
                onRowSelect && "audit-log-row-clickable",
                selectedLogId === log.id && "audit-log-row-selected",
              )}
              role={onRowSelect ? "button" : undefined}
              tabIndex={onRowSelect ? 0 : undefined}
              onClick={onRowSelect ? () => onRowSelect(log) : undefined}
              onKeyDown={
                onRowSelect
                  ? (event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onRowSelect(log);
                      }
                    }
                  : undefined
              }
            >
              <p className="sa-cell-muted" title={formatPortalDateTime(log.createdAt)}>
                {formatRelativeAuditTime(log.createdAt)}
              </p>
              <p className="sa-cell-primary">{actorLabel}</p>
              <p className="sa-cell-muted">{log.entityType}</p>
              <p className="sa-cell-muted">{log.entityId}</p>
              <p className={cn("sa-cell-primary", getAuditActionClass(log.action))}>{log.action}</p>
              <details
                className="audit-log-metadata"
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => event.stopPropagation()}
              >
                <summary className="audit-log-metadata-summary">
                  {formatMetadataPreview(log.metadata)}
                </summary>
                <pre className="audit-log-metadata-body">{formatMetadata(log.metadata)}</pre>
              </details>
            </article>
          );
        })}
      </DataTable>

      {pagination.total > 0 ? (
        <nav className="audit-log-pagination" aria-label="Audit log pagination">
          <p className="sa-cell-muted">
            Page {currentPage} of {totalPages} · {pagination.total} events
          </p>
          <div className="audit-log-pagination-actions">
            <Button
              type="button"
              variant="outline"
              disabled={isBusy || currentPage <= 1}
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isBusy || currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
