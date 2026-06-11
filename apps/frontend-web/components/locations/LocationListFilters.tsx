"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import type { ClinicLocationListFilters } from "@/lib/clinic-portal-types";

const STATUS_OPTIONS = ["", "ACTIVE", "INACTIVE"] as const;

export type LocationListFiltersProps = {
  filters: ClinicLocationListFilters;
  draftSearch: string;
  disabled?: boolean;
  onDraftSearchChange: (value: string) => void;
  onApplySearch: () => void;
  onStatusChange: (status: string) => void;
  onReset: () => void;
};

export function LocationListFilters({
  filters,
  draftSearch,
  disabled = false,
  onDraftSearchChange,
  onApplySearch,
  onStatusChange,
  onReset,
}: LocationListFiltersProps) {
  return (
    <section className="user-list-filters">
      <div className="user-list-filters-grid">
        <div className="user-list-filter-field">
          <Label htmlFor="location-search">Search</Label>
          <Input
            id="location-search"
            type="search"
            value={draftSearch}
            placeholder="Search by name, code, or address"
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
          <Label htmlFor="location-status">Status</Label>
          <select
            id="location-status"
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
