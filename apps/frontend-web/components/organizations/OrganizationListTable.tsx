"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { OrganizationListFilters, PlatformOrganization } from "@/lib/super-admin-portal-types";
import { cn } from "@/lib/cn";

const SORTABLE_COLUMNS: Array<{
  key: NonNullable<OrganizationListFilters["sortBy"]>;
  label: string;
}> = [
  { key: "name", label: "Name" },
  { key: "code", label: "Code" },
  { key: "primaryContactName", label: "Contact" },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Created" },
];

function formatPrimaryContact(organization: PlatformOrganization): string {
  const name = organization.primaryContactName?.trim();
  const email = organization.primaryContactEmail?.trim();

  if (name && email) {
    return `${name} (${email})`;
  }

  return name || email || "—";
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

export type OrganizationListTableProps = {
  organizations: PlatformOrganization[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  sortBy?: OrganizationListFilters["sortBy"];
  sortOrder?: OrganizationListFilters["sortOrder"];
  isBusy?: boolean;
  onPageChange: (page: number) => void;
  onSortChange?: (
    sortBy: NonNullable<OrganizationListFilters["sortBy"]>,
    sortOrder: "asc" | "desc",
  ) => void;
};

export function OrganizationListTable({
  organizations,
  pagination,
  sortBy = "createdAt",
  sortOrder = "desc",
  isBusy = false,
  onPageChange,
  onSortChange,
}: OrganizationListTableProps) {
  const totalPages = Math.max(1, pagination.totalPages || 1);
  const currentPage = pagination.page;

  function handleSort(column: NonNullable<OrganizationListFilters["sortBy"]>) {
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
        columns={["Name", "Code", "Primary Contact", "Status", "Created At", "Actions"]}
        grid="organizationsTable"
        emptyMessage="No organizations found."
        isEmpty={organizations.length === 0}
      >
        {organizations.map((organization) => (
          <Row key={organization.id}>
            <div className="dashboard-cell-primary">{organization.name}</div>
            <div className="dashboard-cell-muted">{organization.code}</div>
            <div className="dashboard-cell-muted">{formatPrimaryContact(organization)}</div>
            <div className="dashboard-cell-muted">{organization.status}</div>
            <div className="dashboard-cell-muted">{formatCreatedAt(organization.createdAt)}</div>
            <div className="user-list-actions">
              <Link
                href={`/super-admin/organizations/${organization.id}`}
                className="dashboard-link"
              >
                View
              </Link>
              <Link
                href={`/super-admin/organizations/${organization.id}/edit`}
                className="dashboard-link"
              >
                Edit
              </Link>
            </div>
          </Row>
        ))}
      </DataTable>

      <nav className="user-list-pagination" aria-label="Organization list pagination">
        <p className="user-list-pagination-summary">
          Page {currentPage} of {totalPages} · {pagination.total} organizations
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
            disabled={isBusy || currentPage >= totalPages || pagination.totalPages === 0}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </nav>
    </div>
  );
}
