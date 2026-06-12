"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { ClinicRoleListFilters, ClinicRoleListItem } from "@/lib/user-role-portal-types";
import { cn } from "@/lib/cn";

const SORTABLE_COLUMNS: Array<{
  key: NonNullable<ClinicRoleListFilters["sortBy"]>;
  label: string;
}> = [
  { key: "name", label: "Name" },
  { key: "code", label: "Code" },
  { key: "isSystem", label: "System" },
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

export type RoleListTableProps = {
  roles: ClinicRoleListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  sortBy?: ClinicRoleListFilters["sortBy"];
  sortOrder?: ClinicRoleListFilters["sortOrder"];
  isBusy?: boolean;
  onPageChange: (page: number) => void;
  onSortChange?: (
    sortBy: NonNullable<ClinicRoleListFilters["sortBy"]>,
    sortOrder: "asc" | "desc",
  ) => void;
};

export function RoleListTable({
  roles,
  pagination,
  sortBy = "createdAt",
  sortOrder = "desc",
  isBusy = false,
  onPageChange,
  onSortChange,
}: RoleListTableProps) {
  const totalPages = Math.max(1, pagination.totalPages || 1);
  const currentPage = pagination.page;

  function handleSort(column: NonNullable<ClinicRoleListFilters["sortBy"]>) {
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
        columns={["Name", "Code", "System Role", "Permissions", "Created At", "Actions"]}
        grid="rolesTable"
        emptyMessage="No roles found."
        isEmpty={roles.length === 0}
      >
        {roles.map((role) => (
          <Row key={role.id}>
            <div className="dashboard-cell-primary">
              <Link href={`/clinic/roles/${role.id}`} className="dashboard-link">
                {role.name}
              </Link>
            </div>
            <div className="dashboard-cell-muted">{role.code}</div>
            <div className="dashboard-cell-muted">{role.isSystem ? "Yes" : "No"}</div>
            <div className="dashboard-cell-muted">{role.permissionsCount}</div>
            <div className="dashboard-cell-muted">{formatCreatedAt(role.createdAt)}</div>
            <div className="user-list-actions">
              <Link href={`/clinic/roles/${role.id}`} className="dashboard-link">
                View
              </Link>
              <Link href={`/clinic/roles/${role.id}/edit`} className="dashboard-link">
                Edit
              </Link>
            </div>
          </Row>
        ))}
      </DataTable>

      <nav className="user-list-pagination" aria-label="Role list pagination">
        <p className="user-list-pagination-summary">
          Page {currentPage} of {totalPages} · {pagination.total} roles
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
