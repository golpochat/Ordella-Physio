"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import type { ClinicRoleListFilters } from "@/lib/user-role-portal-types";

const SYSTEM_ROLE_OPTIONS = [
  { value: "", label: "All roles" },
  { value: "true", label: "System only" },
  { value: "false", label: "Custom only" },
] as const;

export type RoleListFiltersProps = {
  filters: ClinicRoleListFilters;
  draftSearch: string;
  disabled?: boolean;
  onDraftSearchChange: (value: string) => void;
  onApplySearch: () => void;
  onSystemRoleChange: (value: string) => void;
  onReset: () => void;
};

export function RoleListFilters({
  filters,
  draftSearch,
  disabled = false,
  onDraftSearchChange,
  onApplySearch,
  onSystemRoleChange,
  onReset,
}: RoleListFiltersProps) {
  const systemFilterValue =
    filters.isSystem === true ? "true" : filters.isSystem === false ? "false" : "";

  return (
    <section className="user-list-filters">
      <div className="user-list-filters-grid">
        <div className="user-list-filter-field">
          <Label htmlFor="role-search">Search</Label>
          <Input
            id="role-search"
            type="search"
            value={draftSearch}
            placeholder="Search by name or code"
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
          <Label htmlFor="role-system-filter">System roles</Label>
          <select
            id="role-system-filter"
            className="tenant-create-form-select"
            value={systemFilterValue}
            disabled={disabled}
            onChange={(event) => onSystemRoleChange(event.target.value)}
          >
            {SYSTEM_ROLE_OPTIONS.map((option) => (
              <option key={option.value || "all"} value={option.value}>
                {option.label}
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
