"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { ClinicLocation } from "@/lib/clinic-portal-types";
import type { ClinicTerminal, ClinicTerminalListFilters } from "@/lib/terminal-portal-types";
import { cn } from "@/lib/cn";

const SORTABLE_COLUMNS: Array<{
  key: NonNullable<ClinicTerminalListFilters["sortBy"]>;
  label: string;
}> = [
  { key: "name", label: "Name" },
  { key: "code", label: "Code" },
  { key: "type", label: "Type" },
  { key: "status", label: "Status" },
  { key: "lastSeenAt", label: "Last Seen" },
  { key: "createdAt", label: "Created" },
];

function formatDateTime(value: string | null): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCreatedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export type TerminalListTableProps = {
  terminals: ClinicTerminal[];
  locationsById: Record<string, ClinicLocation>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  sortBy?: ClinicTerminalListFilters["sortBy"];
  sortOrder?: ClinicTerminalListFilters["sortOrder"];
  isBusy?: boolean;
  onPageChange: (page: number) => void;
  onSortChange?: (
    sortBy: NonNullable<ClinicTerminalListFilters["sortBy"]>,
    sortOrder: "asc" | "desc",
  ) => void;
};

export function TerminalListTable({
  terminals,
  locationsById,
  pagination,
  sortBy = "createdAt",
  sortOrder = "desc",
  isBusy = false,
  onPageChange,
  onSortChange,
}: TerminalListTableProps) {
  const totalPages = Math.max(1, pagination.totalPages || 1);
  const currentPage = pagination.page;

  function handleSort(column: NonNullable<ClinicTerminalListFilters["sortBy"]>) {
    if (!onSortChange) {
      return;
    }

    if (sortBy === column) {
      onSortChange(column, sortOrder === "asc" ? "desc" : "asc");
      return;
    }

    onSortChange(column, "asc");
  }

  function resolveLocationName(locationId: string): string {
    return locationsById[locationId]?.name ?? locationId;
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
        columns={[
          "Name",
          "Code",
          "Type",
          "Location",
          "IP Address",
          "Status",
          "Last Seen",
          "Created At",
          "Actions",
        ]}
        grid="terminalsTable"
        emptyMessage="No terminals found."
        isEmpty={terminals.length === 0}
      >
        {terminals.map((terminal) => (
          <Row key={terminal.id}>
            <div className="dashboard-cell-primary">
              <Link href={`/clinic/terminals/${terminal.id}`} className="dashboard-link">
                {terminal.name}
              </Link>
            </div>
            <div className="dashboard-cell-muted">{terminal.code}</div>
            <div className="dashboard-cell-muted">{terminal.type}</div>
            <div className="dashboard-cell-muted">{resolveLocationName(terminal.locationId)}</div>
            <div className="dashboard-cell-muted">{terminal.ipAddress ?? "—"}</div>
            <div className="dashboard-cell-muted">{terminal.status}</div>
            <div className="dashboard-cell-muted">{formatDateTime(terminal.lastSeenAt)}</div>
            <div className="dashboard-cell-muted">{formatCreatedAt(terminal.createdAt)}</div>
            <div className="user-list-actions">
              <Link href={`/clinic/terminals/${terminal.id}`} className="dashboard-link">
                View
              </Link>
              <Link href={`/clinic/terminals/${terminal.id}/edit`} className="dashboard-link">
                Edit
              </Link>
            </div>
          </Row>
        ))}
      </DataTable>

      <nav className="user-list-pagination" aria-label="Terminal list pagination">
        <p className="user-list-pagination-summary">
          Page {currentPage} of {totalPages} · {pagination.total} terminals
        </p>
        <div className="user-list-pagination-actions">
          <Button
            type="button"
            variant="outline"
            disabled={isBusy || currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
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
    </div>
  );
}
