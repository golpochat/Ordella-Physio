"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { ClinicPatient, ClinicPatientListFilters } from "@/lib/clinic-portal-types";
import { cn } from "@/lib/cn";

const SORTABLE_COLUMNS: Array<{
  key: NonNullable<ClinicPatientListFilters["sortBy"]>;
  label: string;
}> = [
  { key: "firstName", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "gender", label: "Gender" },
  { key: "dateOfBirth", label: "Date of Birth" },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Created" },
];

const GENDER_LABELS: Record<string, string> = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
};

function formatDate(value: string | null): string {
  if (!value) {
    return "—";
  }

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

export type PatientListTableProps = {
  patients: ClinicPatient[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  sortBy?: ClinicPatientListFilters["sortBy"];
  sortOrder?: ClinicPatientListFilters["sortOrder"];
  isBusy?: boolean;
  onPageChange: (page: number) => void;
  onSortChange?: (
    sortBy: NonNullable<ClinicPatientListFilters["sortBy"]>,
    sortOrder: "asc" | "desc",
  ) => void;
};

export function PatientListTable({
  patients,
  pagination,
  sortBy = "createdAt",
  sortOrder = "desc",
  isBusy = false,
  onPageChange,
  onSortChange,
}: PatientListTableProps) {
  const totalPages = Math.max(1, pagination.totalPages || 1);
  const currentPage = pagination.page;

  function handleSort(column: NonNullable<ClinicPatientListFilters["sortBy"]>) {
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
          "Phone",
          "Email",
          "Gender",
          "Date of Birth",
          "Status",
          "Created At",
          "Actions",
        ]}
        grid="patientTable"
        emptyMessage="No patients found."
        isEmpty={patients.length === 0}
      >
        {patients.map((patient) => (
          <Row key={patient.id}>
            <div className="dashboard-cell-primary">
              <Link href={`/clinic/patients/${patient.id}`} className="dashboard-link">
                {patient.firstName} {patient.lastName}
              </Link>
            </div>
            <div className="dashboard-cell-muted">{patient.phone ?? "—"}</div>
            <div className="dashboard-cell-muted">{patient.email ?? "—"}</div>
            <div className="dashboard-cell-muted">
              {GENDER_LABELS[patient.gender] ?? patient.gender}
            </div>
            <div className="dashboard-cell-muted">{formatDate(patient.dateOfBirth)}</div>
            <div className="dashboard-cell-muted">{patient.status}</div>
            <div className="dashboard-cell-muted">{formatDate(patient.createdAt)}</div>
            <div className="user-list-actions">
              <Link href={`/clinic/patients/${patient.id}`} className="dashboard-link">
                View
              </Link>
              <Link href={`/clinic/patients/${patient.id}/edit`} className="dashboard-link">
                Edit
              </Link>
            </div>
          </Row>
        ))}
      </DataTable>

      <nav className="user-list-pagination" aria-label="Patient list pagination">
        <p className="user-list-pagination-summary">
          Page {currentPage} of {totalPages} · {pagination.total} patients
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
