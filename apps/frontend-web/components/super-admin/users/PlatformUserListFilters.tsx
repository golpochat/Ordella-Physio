"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import type { PlatformUserListFilters } from "@/lib/super-admin-portal-types";
import { PLATFORM_OPERATOR_ROLE } from "@/lib/super-admin-portal-utils";

const ROLE_OPTIONS = [
  { value: PLATFORM_OPERATOR_ROLE, label: "Platform operators (SYSTEM)" },
  { value: "", label: "All roles" },
  { value: "OWNER", label: "Owner" },
  { value: "ADMIN", label: "Admin" },
  { value: "THERAPIST", label: "Therapist" },
  { value: "STAFF", label: "Staff" },
  { value: "PATIENT", label: "Patient" },
] as const;

const STATUS_OPTIONS = ["", "ACTIVE", "DISABLED"] as const;

export type PlatformUserListFiltersProps = {
  filters: PlatformUserListFilters;
  draftSearch: string;
  disabled?: boolean;
  onDraftSearchChange: (value: string) => void;
  onApplySearch: () => void;
  onRoleChange: (role: string) => void;
  onStatusChange: (status: string) => void;
  onReset: () => void;
};

export function PlatformUserListFilters({
  filters,
  draftSearch,
  disabled = false,
  onDraftSearchChange,
  onApplySearch,
  onRoleChange,
  onStatusChange,
  onReset,
}: PlatformUserListFiltersProps) {
  return (
    <section className="user-list-filters">
      <div className="user-list-filters-grid">
        <div className="user-list-filter-field">
          <Label htmlFor="platform-user-search">Search</Label>
          <Input
            id="platform-user-search"
            type="search"
            value={draftSearch}
            placeholder="Search by name or email"
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
          <Label htmlFor="platform-user-role">Role</Label>
          <select
            id="platform-user-role"
            className="tenant-create-form-select"
            value={filters.role ?? ""}
            disabled={disabled}
            onChange={(event) => onRoleChange(event.target.value)}
          >
            {ROLE_OPTIONS.map((option) => (
              <option key={option.value || "all"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="platform-user-status">Status</Label>
          <select
            id="platform-user-status"
            className="tenant-create-form-select"
            value={filters.status ?? ""}
            disabled={disabled}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status || "all"} value={status}>
                {status ? (status === "ACTIVE" ? "Active" : "Disabled") : "All statuses"}
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
