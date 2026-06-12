"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useClinicLocations } from "@/hooks/useClinicPortal";
import { useClinicStaffMembersList } from "@/hooks/useClinicStaffMember";
import type { ClinicAppointmentCalendarFilters } from "@/lib/clinic-portal-types";

const VIEW_OPTIONS = ["day", "week", "month"] as const;
const APPOINTMENT_TYPE_OPTIONS = ["", "IN_PERSON", "TELEMEDICINE"] as const;
const STATUS_OPTIONS = ["", "SCHEDULED", "CANCELLED", "COMPLETED", "NO_SHOW"] as const;

const VIEW_LABELS: Record<(typeof VIEW_OPTIONS)[number], string> = {
  day: "Day",
  week: "Week",
  month: "Month",
};

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

export type AppointmentCalendarFiltersProps = {
  filters: ClinicAppointmentCalendarFilters;
  disabled?: boolean;
  onViewChange: (view: ClinicAppointmentCalendarFilters["view"]) => void;
  onDateChange: (date: string) => void;
  onStaffChange: (staffId: string) => void;
  onLocationChange: (locationId: string) => void;
  onAppointmentTypeChange: (appointmentType: string) => void;
  onStatusChange: (status: string) => void;
  onReset: () => void;
};

export function AppointmentCalendarFilters({
  filters,
  disabled = false,
  onViewChange,
  onDateChange,
  onStaffChange,
  onLocationChange,
  onAppointmentTypeChange,
  onStatusChange,
  onReset,
}: AppointmentCalendarFiltersProps) {
  const staffQuery = useClinicStaffMembersList({ page: 1, limit: 100, status: "ACTIVE" });
  const locationsQuery = useClinicLocations();

  const staffMembers = staffQuery.data?.data ?? [];
  const locations = (locationsQuery.data ?? []).filter((location) => location.status === "ACTIVE");

  return (
    <section className="user-list-filters">
      <div className="user-list-filters-grid">
        <div className="user-list-filter-field">
          <Label htmlFor="calendar-view">View</Label>
          <select
            id="calendar-view"
            className="tenant-create-form-select"
            value={filters.view ?? "week"}
            disabled={disabled}
            onChange={(event) =>
              onViewChange(event.target.value as ClinicAppointmentCalendarFilters["view"])
            }
          >
            {VIEW_OPTIONS.map((view) => (
              <option key={view} value={view}>
                {VIEW_LABELS[view]}
              </option>
            ))}
          </select>
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="calendar-date">Date</Label>
          <Input
            id="calendar-date"
            type="date"
            value={filters.date ?? ""}
            disabled={disabled}
            onChange={(event) => onDateChange(event.target.value)}
          />
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="calendar-staff-filter">Staff</Label>
          <select
            id="calendar-staff-filter"
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
          <Label htmlFor="calendar-location-filter">Location</Label>
          <select
            id="calendar-location-filter"
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
          <Label htmlFor="calendar-type-filter">Appointment type</Label>
          <select
            id="calendar-type-filter"
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
          <Label htmlFor="calendar-status-filter">Status</Label>
          <select
            id="calendar-status-filter"
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
      </div>

      <div className="user-list-filters-actions">
        <Button type="button" variant="ghost" disabled={disabled} onClick={onReset}>
          Reset filters
        </Button>
      </div>
    </section>
  );
}
