"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { ClinicLocation, ClinicLocationListFilters } from "@/lib/clinic-portal-types";
import { cn } from "@/lib/cn";

const SORTABLE_COLUMNS: Array<{
  key: NonNullable<ClinicLocationListFilters["sortBy"]>;
  label: string;
}> = [
  { key: "name", label: "Name" },
  { key: "code", label: "Code" },
  { key: "city", label: "City" },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Created" },
];

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

function formatAddress(location: ClinicLocation): string {
  return location.addressLine2
    ? `${location.addressLine1}, ${location.addressLine2}`
    : location.addressLine1;
}

export type LocationListTableProps = {
  locations: ClinicLocation[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  sortBy?: ClinicLocationListFilters["sortBy"];
  sortOrder?: ClinicLocationListFilters["sortOrder"];
  isBusy?: boolean;
  onPageChange: (page: number) => void;
  onSortChange?: (
    sortBy: NonNullable<ClinicLocationListFilters["sortBy"]>,
    sortOrder: "asc" | "desc",
  ) => void;
};

export function LocationListTable({
  locations,
  pagination,
  sortBy = "createdAt",
  sortOrder = "desc",
  isBusy = false,
  onPageChange,
  onSortChange,
}: LocationListTableProps) {
  const totalPages = Math.max(1, pagination.totalPages || 1);
  const currentPage = pagination.page;

  function handleSort(column: NonNullable<ClinicLocationListFilters["sortBy"]>) {
    if (!onSortChange) {
      return;
    }

    if (sortBy === column) {
      onSortChange(column, sortOrder === "asc" ? "desc" : "asc");
      return;
    }

    onSortChange(column, "asc");
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
        columns={["Name", "Code", "Address", "City", "Status", "Created At", "Actions"]}
        grid="locationsTable"
        emptyMessage="No locations found."
        isEmpty={locations.length === 0}
      >
        {locations.map((location) => (
          <Row key={location.id}>
            <div className="dashboard-cell-primary">
              <Link href={`/clinic/locations/${location.id}`} className="dashboard-link">
                {location.name}
              </Link>
            </div>
            <div className="dashboard-cell-muted">{location.code}</div>
            <div className="dashboard-cell-muted">{formatAddress(location)}</div>
            <div className="dashboard-cell-muted">{location.city}</div>
            <div className="dashboard-cell-muted">{location.status}</div>
            <div className="dashboard-cell-muted">{formatCreatedAt(location.createdAt)}</div>
            <div className="user-list-actions">
              <Link href={`/clinic/locations/${location.id}`} className="dashboard-link">
                View
              </Link>
              <Link href={`/clinic/locations/${location.id}/edit`} className="dashboard-link">
                Edit
              </Link>
            </div>
          </Row>
        ))}
      </DataTable>

      <nav className="user-list-pagination" aria-label="Location list pagination">
        <p className="user-list-pagination-summary">
          Page {currentPage} of {totalPages} · {pagination.total} locations
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
