"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import type { ClinicLocation } from "@/lib/clinic-portal-types";
import type { ClinicTerminalListFilters, TerminalType } from "@/lib/terminal-portal-types";

const TYPE_OPTIONS: Array<{ value: "" | TerminalType; label: string }> = [
  { value: "", label: "All types" },
  { value: "POS", label: "POS" },
  { value: "KIOSK", label: "Kiosk" },
  { value: "PRINTER", label: "Printer" },
  { value: "TABLET", label: "Tablet" },
  { value: "OTHER", label: "Other" },
];

const STATUS_OPTIONS = ["", "ACTIVE", "INACTIVE"] as const;

export type TerminalListFiltersProps = {
  filters: ClinicTerminalListFilters;
  draftSearch: string;
  locations: ClinicLocation[];
  disabled?: boolean;
  onDraftSearchChange: (value: string) => void;
  onApplySearch: () => void;
  onTypeChange: (type: string) => void;
  onStatusChange: (status: string) => void;
  onLocationChange: (locationId: string) => void;
  onReset: () => void;
};

export function TerminalListFilters({
  filters,
  draftSearch,
  locations,
  disabled = false,
  onDraftSearchChange,
  onApplySearch,
  onTypeChange,
  onStatusChange,
  onLocationChange,
  onReset,
}: TerminalListFiltersProps) {
  return (
    <section className="user-list-filters">
      <div className="user-list-filters-grid">
        <div className="user-list-filter-field">
          <Label htmlFor="terminal-search">Search</Label>
          <Input
            id="terminal-search"
            type="search"
            value={draftSearch}
            placeholder="Search by name, code, IP, or MAC"
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
          <Label htmlFor="terminal-type">Type</Label>
          <select
            id="terminal-type"
            className="tenant-create-form-select"
            value={filters.type ?? ""}
            disabled={disabled}
            onChange={(event) => onTypeChange(event.target.value)}
          >
            {TYPE_OPTIONS.map((option) => (
              <option key={option.value || "all"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="terminal-status">Status</Label>
          <select
            id="terminal-status"
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
          <Label htmlFor="terminal-location">Location</Label>
          <select
            id="terminal-location"
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
