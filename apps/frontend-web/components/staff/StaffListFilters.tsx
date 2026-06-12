"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import type { ClinicLocation } from "@/lib/clinic-portal-types";
import type { ClinicRoleListItem } from "@/lib/user-role-portal-types";
import type { ClinicStaffListFilters, ClinicStaffType } from "@/lib/clinic-staff-member-types";

const STAFF_TYPE_OPTIONS: Array<{ value: "" | ClinicStaffType; label: string }> = [
  { value: "", label: "All types" },
  { value: "DOCTOR", label: "Doctor" },
  { value: "NURSE", label: "Nurse" },
  { value: "ADMIN", label: "Admin" },
  { value: "RECEPTIONIST", label: "Receptionist" },
  { value: "TECHNICIAN", label: "Technician" },
  { value: "OTHER", label: "Other" },
];

const STATUS_OPTIONS = ["", "ACTIVE", "INACTIVE"] as const;

export type StaffListFiltersProps = {
  filters: ClinicStaffListFilters;
  draftSearch: string;
  roles: ClinicRoleListItem[];
  locations: ClinicLocation[];
  disabled?: boolean;
  onDraftSearchChange: (value: string) => void;
  onApplySearch: () => void;
  onStaffTypeChange: (staffType: string) => void;
  onRoleChange: (roleId: string) => void;
  onLocationChange: (locationId: string) => void;
  onStatusChange: (status: string) => void;
  onReset: () => void;
};

export function StaffListFilters({
  filters,
  draftSearch,
  roles,
  locations,
  disabled = false,
  onDraftSearchChange,
  onApplySearch,
  onStaffTypeChange,
  onRoleChange,
  onLocationChange,
  onStatusChange,
  onReset,
}: StaffListFiltersProps) {
  return (
    <section className="user-list-filters">
      <div className="user-list-filters-grid">
        <div className="user-list-filter-field">
          <Label htmlFor="staff-search">Search</Label>
          <Input
            id="staff-search"
            type="search"
            value={draftSearch}
            placeholder="Search by name, email, or phone"
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
          <Label htmlFor="staff-type-filter">Staff type</Label>
          <select
            id="staff-type-filter"
            className="tenant-create-form-select"
            value={filters.staffType ?? ""}
            disabled={disabled}
            onChange={(event) => onStaffTypeChange(event.target.value)}
          >
            {STAFF_TYPE_OPTIONS.map((option) => (
              <option key={option.value || "all"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="staff-role-filter">Role</Label>
          <select
            id="staff-role-filter"
            className="tenant-create-form-select"
            value={filters.roleId ?? ""}
            disabled={disabled}
            onChange={(event) => onRoleChange(event.target.value)}
          >
            <option value="">All roles</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="staff-location-filter">Location</Label>
          <select
            id="staff-location-filter"
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
          <Label htmlFor="staff-status-filter">Status</Label>
          <select
            id="staff-status-filter"
            className="tenant-create-form-select"
            value={filters.status ?? ""}
            disabled={disabled}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status || "all"} value={status}>
                {status
                  ? status === "ACTIVE"
                    ? "Active"
                    : "Inactive"
                  : "All statuses"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="user-list-filters-actions">
        <Button type="button" variant="outline" disabled={disabled} onClick={onApplySearch}>
          Search
        </Button>
        <Button type="button" variant="ghost" disabled={disabled} onClick={onReset}>
          Reset filters
        </Button>
      </div>
    </section>
  );
}
