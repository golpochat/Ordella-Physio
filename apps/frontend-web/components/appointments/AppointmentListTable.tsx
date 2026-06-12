"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type {
  ClinicAppointmentListFilters,
  ClinicAppointmentListItem,
} from "@/lib/clinic-portal-types";
import { formatPortalDateTime } from "@/lib/clinic-portal-utils";
import { cn } from "@/lib/cn";

const SORTABLE_COLUMNS: Array<{
  key: NonNullable<ClinicAppointmentListFilters["sortBy"]>;
  label: string;
}> = [
  { key: "startTime", label: "Start time" },
  { key: "endTime", label: "End time" },
  { key: "status", label: "Status" },
  { key: "type", label: "Type" },
  { key: "createdAt", label: "Created" },
];

const APPOINTMENT_TYPE_LABELS: Record<string, string> = {
  IN_PERSON: "In person",
  TELEMEDICINE: "Telemedicine",
};

function formatAppointmentType(value: string): string {
  return APPOINTMENT_TYPE_LABELS[value] ?? value;
}

export type AppointmentListTableProps = {
  appointments: ClinicAppointmentListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  sortBy?: ClinicAppointmentListFilters["sortBy"];
  sortOrder?: ClinicAppointmentListFilters["sortOrder"];
  isBusy?: boolean;
  onPageChange: (page: number) => void;
  onSortChange?: (
    sortBy: NonNullable<ClinicAppointmentListFilters["sortBy"]>,
    sortOrder: "asc" | "desc",
  ) => void;
};

export function AppointmentListTable({
  appointments,
  pagination,
  sortBy = "startTime",
  sortOrder = "desc",
  isBusy = false,
  onPageChange,
  onSortChange,
}: AppointmentListTableProps) {
  const totalPages = Math.max(1, pagination.totalPages || 1);
  const currentPage = pagination.page;

  function handleSort(column: NonNullable<ClinicAppointmentListFilters["sortBy"]>) {
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
          "Patient",
          "Staff",
          "Type",
          "Location",
          "Start time",
          "End time",
          "Status",
          "Actions",
        ]}
        grid="appointmentTable"
        emptyMessage="No appointments found."
        isEmpty={appointments.length === 0}
      >
        {appointments.map((appointment) => (
          <Row key={appointment.id}>
            <div className="dashboard-cell-primary">
              <Link href={`/clinic/appointments/${appointment.id}`} className="dashboard-link">
                {appointment.patient.firstName} {appointment.patient.lastName}
              </Link>
            </div>
            <div className="dashboard-cell-muted">
              {appointment.staff.firstName} {appointment.staff.lastName}
            </div>
            <div className="dashboard-cell-muted">
              {formatAppointmentType(appointment.appointmentType ?? appointment.type)}
            </div>
            <div className="dashboard-cell-muted">{appointment.location?.name ?? "—"}</div>
            <div className="dashboard-cell-muted">
              {formatPortalDateTime(appointment.startTime)}
            </div>
            <div className="dashboard-cell-muted">{formatPortalDateTime(appointment.endTime)}</div>
            <div className="dashboard-cell-muted">{appointment.status}</div>
            <div className="user-list-actions">
              <Link href={`/clinic/appointments/${appointment.id}`} className="dashboard-link">
                View
              </Link>
              <Link href={`/clinic/appointments/${appointment.id}/edit`} className="dashboard-link">
                Edit
              </Link>
            </div>
          </Row>
        ))}
      </DataTable>

      <nav className="user-list-pagination" aria-label="Appointment list pagination">
        <p className="user-list-pagination-summary">
          Page {currentPage} of {totalPages} · {pagination.total} appointments
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
