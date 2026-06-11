"use client";

import Link from "next/link";
import { User } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import { UserStatusBadge } from "@/components/users/UserStatusBadge";
import { getAvatarInitials, resolveAvatarUrl } from "@/lib/avatar-url";
import type { ClinicUser, ClinicUserListFilters } from "@/lib/clinic-portal-types";
import { cn } from "@/lib/cn";

const SORTABLE_COLUMNS: Array<{
  key: NonNullable<ClinicUserListFilters["sortBy"]>;
  label: string;
}> = [
  { key: "firstName", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "createdAt", label: "Created" },
];

function formatName(user: ClinicUser): string {
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
  return name || user.email;
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

export type UserListTableProps = {
  users: ClinicUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  sortBy?: ClinicUserListFilters["sortBy"];
  sortOrder?: ClinicUserListFilters["sortOrder"];
  isBusy?: boolean;
  onPageChange: (page: number) => void;
  onSortChange?: (sortBy: ClinicUserListFilters["sortBy"], sortOrder: "asc" | "desc") => void;
};

export function UserListTable({
  users,
  pagination,
  sortBy = "createdAt",
  sortOrder = "desc",
  isBusy = false,
  onPageChange,
  onSortChange,
}: UserListTableProps) {
  const totalPages = Math.max(1, pagination.totalPages || 1);
  const currentPage = pagination.page;

  function handleSort(column: NonNullable<ClinicUserListFilters["sortBy"]>) {
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
        columns={["", "Name", "Email", "Role", "Status", "Created", "Actions"]}
        grid="usersTable"
        emptyMessage="No users found."
        isEmpty={users.length === 0}
      >
        {users.map((user) => {
          const avatarUrl = resolveAvatarUrl(user.avatarUrl);
          const initials = getAvatarInitials(user.firstName, user.lastName, user.email);

          return (
            <Row key={user.id}>
              <div className="user-list-avatar-cell">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="" className="user-list-avatar-image" />
                ) : (
                  <span className="user-list-avatar-placeholder" aria-hidden="true">
                    {initials !== "?" ? (
                      <span className="user-list-avatar-initials">{initials}</span>
                    ) : (
                      <User className="user-list-avatar-icon" />
                    )}
                  </span>
                )}
              </div>
              <div className="dashboard-cell-primary">
                <Link href={`/clinic/users/${user.id}`} className="dashboard-link">
                  {formatName(user)}
                </Link>
              </div>
              <div className="dashboard-cell-muted">{user.email}</div>
              <div className="dashboard-cell-muted">{user.role}</div>
              <div>
                <UserStatusBadge status={user.status} />
              </div>
              <div className="dashboard-cell-muted">{formatCreatedAt(user.createdAt)}</div>
              <div className="user-list-actions">
                <Link href={`/clinic/users/${user.id}`} className="dashboard-link">
                  View
                </Link>
                <Link href={`/clinic/users/${user.id}/edit`} className="dashboard-link">
                  Edit
                </Link>
                <Link href={`/clinic/users/${user.id}/reset-password`} className="dashboard-link">
                  Reset password
                </Link>
              </div>
            </Row>
          );
        })}
      </DataTable>

      <nav className="user-list-pagination" aria-label="User list pagination">
        <p className="user-list-pagination-summary">
          Page {currentPage} of {totalPages} · {pagination.total} users
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
