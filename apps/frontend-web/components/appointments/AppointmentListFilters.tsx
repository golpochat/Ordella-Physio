"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useClinicLocations, useClinicPatientsList } from "@/hooks/useClinicPortal";
import { useClinicStaffMembersList } from "@/hooks/useClinicStaffMember";
import type { ClinicAppointmentListFilters } from "@/lib/clinic-portal-types";

const APPOINTMENT_TYPE_OPTIONS = ["", "IN_PERSON", "TELEMEDICINE"] as const;
const STATUS_OPTIONS = ["", "SCHEDULED", "CANCELLED", "COMPLETED", "NO_SHOW"] as const;

const APPOINTMENT_TYPE_LABELS: Record<string, string> = {
  IN_PERSON: "In person",
  TELEMEDICINE: "Telemedicine",
};

const STATUS_LABELS: Record<string, string> = {
  SCHEDULED: "Scheduled",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
  NO_SHOW: "No show",
};

export type AppointmentListFiltersProps = {
  filters: ClinicAppointmentListFilters;
  draftSearch: string;
  disabled?: boolean;
  onDraftSearchChange: (value: string) => void;
  onApplySearch: () => void;
  onStaffChange: (staffId: string) => void;
  onPatientChange: (patientId: string) => void;
  onLocationChange: (locationId: string) => void;
  onAppointmentTypeChange: (appointmentType: string) => void;
  onStatusChange: (status: string) => void;
  onDateStartChange: (value: string) => void;
  onDateEndChange: (value: string) => void;
  onReset: () => void;
};

export function AppointmentListFilters({
  filters,
  draftSearch,
  disabled = false,
  onDraftSearchChange,
  onApplySearch,
  onStaffChange,
  onPatientChange,
  onLocationChange,
  onAppointmentTypeChange,
  onStatusChange,
  onDateStartChange,
  onDateEndChange,
  onReset,
}: AppointmentListFiltersProps) {
  const patientsQuery = useClinicPatientsList({ page: 1, limit: 100, status: "ACTIVE" });
  const staffQuery = useClinicStaffMembersList({ page: 1, limit: 100, status: "ACTIVE" });
  const locationsQuery = useClinicLocations();

  const patients = patientsQuery.data?.data ?? [];
  const staffMembers = staffQuery.data?.data ?? [];
  const locations = (locationsQuery.data ?? []).filter((location) => location.status === "ACTIVE");

  return (
    <section className="user-list-filters">
      <div className="user-list-filters-grid">
        <div className="user-list-filter-field">
          <Label htmlFor="appointment-search">Search</Label>
          <Input
            id="appointment-search"
            type="search"
            value={draftSearch}
            placeholder="Search patient, staff, or notes"
            disabled={disabled}
            onChange={(event) => onDraftSearchChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onApplySearch();
              }
            }}
          />
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="appointment-staff-filter">Staff</Label>
          <select
            id="appointment-staff-filter"
            className="tenant-create-form-select"
            value={filters.staffId ?? ""}
            disabled={disabled}
            onChange={(event) => onStaffChange(event.target.value)}
          >
            <option value="">All staff</option>
            {staffMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.firstName} {member.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="appointment-patient-filter">Patient</Label>
          <select
            id="appointment-patient-filter"
            className="tenant-create-form-select"
            value={filters.patientId ?? ""}
            disabled={disabled}
            onChange={(event) => onPatientChange(event.target.value)}
          >
            <option value="">All patients</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.firstName} {patient.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="appointment-location-filter">Location</Label>
          <select
            id="appointment-location-filter"
            className="tenant-create-form-select"
            value={filters.locationId ?? ""}
            disabled={disabled}
            onChange={(event) => onLocationChange(event.target.value)}
          >
            <option value="">All locations</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="appointment-type-filter">Appointment type</Label>
          <select
            id="appointment-type-filter"
            className="tenant-create-form-select"
            value={filters.appointmentType ?? ""}
            disabled={disabled}
            onChange={(event) => onAppointmentTypeChange(event.target.value)}
          >
            {APPOINTMENT_TYPE_OPTIONS.map((type) => (
              <option key={type || "all"} value={type}>
                {type ? APPOINTMENT_TYPE_LABELS[type] : "All types"}
              </option>
            ))}
          </select>
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="appointment-status-filter">Status</Label>
          <select
            id="appointment-status-filter"
            className="tenant-create-form-select"
            value={filters.status ?? ""}
            disabled={disabled}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status || "all"} value={status}>
                {status ? STATUS_LABELS[status] : "All statuses"}
              </option>
            ))}
          </select>
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="appointment-date-start">Date from</Label>
          <Input
            id="appointment-date-start"
            type="date"
            value={filters.dateStart ?? ""}
            disabled={disabled}
            onChange={(event) => onDateStartChange(event.target.value)}
          />
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="appointment-date-end">Date to</Label>
          <Input
            id="appointment-date-end"
            type="date"
            value={filters.dateEnd ?? ""}
            disabled={disabled}
            onChange={(event) => onDateEndChange(event.target.value)}
          />
        </div>
      </div>

      <div className="user-list-filters-actions">
        <Button type="button" variant="outline" disabled={disabled} onClick={onApplySearch}>
          Apply search
        </Button>
        <Button type="button" variant="ghost" disabled={disabled} onClick={onReset}>
          Reset filters
        </Button>
      </div>
    </section>
  );
}
