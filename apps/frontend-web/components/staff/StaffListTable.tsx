"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { ClinicStaffListFilters, ClinicStaffListItem } from "@/lib/clinic-staff-member-types";
import { cn } from "@/lib/cn";

const SORTABLE_COLUMNS: Array<{
  key: NonNullable<ClinicStaffListFilters["sortBy"]>;
  label: string;
}> = [
  { key: "firstName", label: "Name" },
  { key: "email", label: "Email" },
  { key: "staffType", label: "Staff Type" },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Created" },
];

const STAFF_TYPE_LABELS: Record<ClinicStaffListItem["staffType"], string> = {
  DOCTOR: "Doctor",
  NURSE: "Nurse",
  ADMIN: "Admin",
  RECEPTIONIST: "Receptionist",
  TECHNICIAN: "Technician",
  OTHER: "Other",
};

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

function formatLocations(member: ClinicStaffListItem): string {
  const labels = member.locations
    .map((location) => location.name ?? location.code ?? location.locationId)
    .filter(Boolean);

  return labels.length > 0 ? labels.join(", ") : "—";
}

export type StaffListTableProps = {
  staff: ClinicStaffListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  sortBy?: ClinicStaffListFilters["sortBy"];
  sortOrder?: ClinicStaffListFilters["sortOrder"];
  isBusy?: boolean;
  onPageChange: (page: number) => void;
  onSortChange?: (
    sortBy: NonNullable<ClinicStaffListFilters["sortBy"]>,
    sortOrder: "asc" | "desc",
  ) => void;
};

export function StaffListTable({
  staff,
  pagination,
  sortBy = "createdAt",
  sortOrder = "desc",
  isBusy = false,
  onPageChange,
  onSortChange,
}: StaffListTableProps) {
  const totalPages = Math.max(1, pagination.totalPages || 1);
  const currentPage = pagination.page;

  function handleSort(column: NonNullable<ClinicStaffListFilters["sortBy"]>) {
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
        columns={[
          "Name",
          "Email",
          "Phone",
          "Staff Type",
          "Role",
          "Locations",
          "Status",
          "Created At",
          "Actions",
        ]}
        grid="staffTable"
        emptyMessage="No staff members found."
        isEmpty={staff.length === 0}
      >
        {staff.map((member) => (
          <Row key={member.id}>
            <div className="dashboard-cell-primary">
              <Link href={`/clinic/staff/${member.id}`} className="dashboard-link">
                {member.firstName} {member.lastName}
              </Link>
            </div>
            <div className="dashboard-cell-muted">{member.email}</div>
            <div className="dashboard-cell-muted">{member.phone ?? "—"}</div>
            <div className="dashboard-cell-muted">{STAFF_TYPE_LABELS[member.staffType]}</div>
            <div className="dashboard-cell-muted">{member.roleName ?? "—"}</div>
            <div className="dashboard-cell-muted">{formatLocations(member)}</div>
            <div className="dashboard-cell-muted">{member.status}</div>
            <div className="dashboard-cell-muted">{formatCreatedAt(member.createdAt)}</div>
            <div className="user-list-actions">
              <Link href={`/clinic/staff/${member.id}`} className="dashboard-link">
                View
              </Link>
              <Link href={`/clinic/staff/${member.id}/edit`} className="dashboard-link">
                Edit
              </Link>
            </div>
          </Row>
        ))}
      </DataTable>

      <nav className="user-list-pagination" aria-label="Staff list pagination">
        <p className="user-list-pagination-summary">
          Page {currentPage} of {totalPages} · {pagination.total} staff members
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
