"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import type { ClinicPatientListFilters } from "@/lib/clinic-portal-types";

const GENDER_OPTIONS = ["", "MALE", "FEMALE", "OTHER"] as const;
const STATUS_OPTIONS = ["", "ACTIVE", "INACTIVE"] as const;

const GENDER_LABELS: Record<"MALE" | "FEMALE" | "OTHER", string> = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
};

export type PatientListFiltersProps = {
  filters: ClinicPatientListFilters;
  draftSearch: string;
  disabled?: boolean;
  onDraftSearchChange: (value: string) => void;
  onApplySearch: () => void;
  onGenderChange: (gender: string) => void;
  onStatusChange: (status: string) => void;
  onDobStartChange: (value: string) => void;
  onDobEndChange: (value: string) => void;
  onReset: () => void;
};

export function PatientListFilters({
  filters,
  draftSearch,
  disabled = false,
  onDraftSearchChange,
  onApplySearch,
  onGenderChange,
  onStatusChange,
  onDobStartChange,
  onDobEndChange,
  onReset,
}: PatientListFiltersProps) {
  return (
    <section className="user-list-filters">
      <div className="user-list-filters-grid">
        <div className="user-list-filter-field">
          <Label htmlFor="patient-search">Search</Label>
          <Input
            id="patient-search"
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
          <Label htmlFor="patient-gender-filter">Gender</Label>
          <select
            id="patient-gender-filter"
            className="tenant-create-form-select"
            value={filters.gender ?? ""}
            disabled={disabled}
            onChange={(event) => onGenderChange(event.target.value)}
          >
            {GENDER_OPTIONS.map((gender) => (
              <option key={gender || "all"} value={gender}>
                {gender ? GENDER_LABELS[gender] : "All genders"}
              </option>
            ))}
          </select>
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="patient-status-filter">Status</Label>
          <select
            id="patient-status-filter"
            className="tenant-create-form-select"
            value={filters.status ?? ""}
            disabled={disabled}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status || "all"} value={status}>
                {status ? (status === "ACTIVE" ? "Active" : "Inactive") : "All statuses"}
              </option>
            ))}
          </select>
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="patient-dob-start">Date of birth from</Label>
          <Input
            id="patient-dob-start"
            type="date"
            value={filters.dobStart ?? ""}
            disabled={disabled}
            onChange={(event) => onDobStartChange(event.target.value)}
          />
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="patient-dob-end">Date of birth to</Label>
          <Input
            id="patient-dob-end"
            type="date"
            value={filters.dobEnd ?? ""}
            disabled={disabled}
            onChange={(event) => onDobEndChange(event.target.value)}
          />
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
