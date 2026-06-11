"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import type { OrganizationListFilters } from "@/lib/super-admin-portal-types";

const STATUS_OPTIONS = ["", "ACTIVE", "INACTIVE"] as const;

export type OrganizationListFiltersProps = {
  filters: OrganizationListFilters;
  draftSearch: string;
  disabled?: boolean;
  onDraftSearchChange: (value: string) => void;
  onApplySearch: () => void;
  onStatusChange: (status: string) => void;
  onReset: () => void;
};

export function OrganizationListFilters({
  filters,
  draftSearch,
  disabled = false,
  onDraftSearchChange,
  onApplySearch,
  onStatusChange,
  onReset,
}: OrganizationListFiltersProps) {
  return (
    <section className="user-list-filters">
      <div className="user-list-filters-grid">
        <div className="user-list-filter-field">
          <Label htmlFor="organization-search">Search</Label>
          <Input
            id="organization-search"
            type="search"
            value={draftSearch}
            placeholder="Search by name, code, or contact"
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
          <Label htmlFor="organization-status">Status</Label>
          <select
            id="organization-status"
            className="tenant-create-form-select"
            value={filters.status ?? ""}
            disabled={disabled}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status || "all"} value={status}>
                {status ? status.charAt(0) + status.slice(1).toLowerCase() : "All statuses"}
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
