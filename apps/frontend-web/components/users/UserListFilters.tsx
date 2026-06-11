"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import type { ClinicUserListFilters } from "@/lib/clinic-portal-types";

const ROLE_OPTIONS = ["", "OWNER", "ADMIN", "THERAPIST", "STAFF", "PATIENT"] as const;
const STATUS_OPTIONS = ["", "ACTIVE", "DISABLED"] as const;

export type UserListFiltersProps = {
  filters: ClinicUserListFilters;
  draftSearch: string;
  disabled?: boolean;
  onDraftSearchChange: (value: string) => void;
  onApplySearch: () => void;
  onRoleChange: (role: string) => void;
  onStatusChange: (status: string) => void;
  onReset: () => void;
};

export function UserListFilters({
  filters,
  draftSearch,
  disabled = false,
  onDraftSearchChange,
  onApplySearch,
  onRoleChange,
  onStatusChange,
  onReset,
}: UserListFiltersProps) {
  return (
    <section className="user-list-filters">
      <div className="user-list-filters-grid">
        <div className="user-list-filter-field">
          <Label htmlFor="user-search">Search</Label>
          <Input
            id="user-search"
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
          <Label htmlFor="user-role">Role</Label>
          <select
            id="user-role"
            className="tenant-create-form-select"
            value={filters.role ?? ""}
            disabled={disabled}
            onChange={(event) => onRoleChange(event.target.value)}
          >
            {ROLE_OPTIONS.map((role) => (
              <option key={role || "all"} value={role}>
                {role || "All roles"}
              </option>
            ))}
          </select>
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="user-status">Status</Label>
          <select
            id="user-status"
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
