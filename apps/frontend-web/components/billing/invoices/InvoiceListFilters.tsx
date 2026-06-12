"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useClinicPatientsList } from "@/hooks/useClinicPortal";
import { useClinicStaffMembersList } from "@/hooks/useClinicStaffMember";
import type { ClinicInvoiceListFilters } from "@/lib/clinic-portal-types";

const STATUS_OPTIONS = ["", "DRAFT", "ISSUED", "PAID", "VOID"] as const;

const STATUS_LABELS: Record<string, string> = {
  DRAFT: "Draft",
  ISSUED: "Issued",
  PAID: "Paid",
  VOID: "Void",
};

export type InvoiceListFiltersProps = {
  filters: ClinicInvoiceListFilters;
  draftSearch: string;
  disabled?: boolean;
  onDraftSearchChange: (value: string) => void;
  onApplySearch: () => void;
  onPatientChange: (patientId: string) => void;
  onStaffChange: (staffId: string) => void;
  onStatusChange: (status: string) => void;
  onDateStartChange: (value: string) => void;
  onDateEndChange: (value: string) => void;
  onMinTotalChange: (value: string) => void;
  onMaxTotalChange: (value: string) => void;
  onReset: () => void;
};

export function InvoiceListFilters({
  filters,
  draftSearch,
  disabled = false,
  onDraftSearchChange,
  onApplySearch,
  onPatientChange,
  onStaffChange,
  onStatusChange,
  onDateStartChange,
  onDateEndChange,
  onMinTotalChange,
  onMaxTotalChange,
  onReset,
}: InvoiceListFiltersProps) {
  const patientsQuery = useClinicPatientsList({ page: 1, limit: 100, status: "ACTIVE" });
  const staffQuery = useClinicStaffMembersList({ page: 1, limit: 100, status: "ACTIVE" });

  const patients = patientsQuery.data?.data ?? [];
  const staffMembers = staffQuery.data?.data ?? [];

  return (
    <section className="user-list-filters">
      <div className="user-list-filters-grid">
        <div className="user-list-filter-field">
          <Label htmlFor="invoice-search">Search</Label>
          <Input
            id="invoice-search"
            type="search"
            value={draftSearch}
            placeholder="Invoice number, patient, staff, or notes"
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
          <Label htmlFor="invoice-patient-filter">Patient</Label>
          <select
            id="invoice-patient-filter"
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
          <Label htmlFor="invoice-staff-filter">Staff</Label>
          <select
            id="invoice-staff-filter"
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
          <Label htmlFor="invoice-status-filter">Status</Label>
          <select
            id="invoice-status-filter"
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
          <Label htmlFor="invoice-date-start">Date from</Label>
          <Input
            id="invoice-date-start"
            type="date"
            value={filters.dateStart ?? ""}
            disabled={disabled}
            onChange={(event) => onDateStartChange(event.target.value)}
          />
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="invoice-date-end">Date to</Label>
          <Input
            id="invoice-date-end"
            type="date"
            value={filters.dateEnd ?? ""}
            disabled={disabled}
            onChange={(event) => onDateEndChange(event.target.value)}
          />
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="invoice-min-total">Min total</Label>
          <Input
            id="invoice-min-total"
            type="number"
            min={0}
            step="0.01"
            value={filters.minTotal ?? ""}
            disabled={disabled}
            onChange={(event) => onMinTotalChange(event.target.value)}
          />
        </div>

        <div className="user-list-filter-field">
          <Label htmlFor="invoice-max-total">Max total</Label>
          <Input
            id="invoice-max-total"
            type="number"
            min={0}
            step="0.01"
            value={filters.maxTotal ?? ""}
            disabled={disabled}
            onChange={(event) => onMaxTotalChange(event.target.value)}
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
