"use client";

import { DashboardDateRangeFilter } from "@/components/dashboard/DashboardDateRangeFilter";
import { ReportGroupByField } from "@/components/reports/ReportGroupByField";
import { Input, Label } from "@/components/ui/input";
import { useClinicPatientsList } from "@/hooks/useClinicPortal";
import { useClinicStaffMembersList } from "@/hooks/useClinicStaffMember";
import type { DashboardRangeType, ReportGroupBy, RevenueReportQuery } from "@/lib/reporting-types";

const SELECT_CLASS =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

type RevenueReportFiltersProps = {
  filters: RevenueReportQuery;
  disabled?: boolean;
  onChange: (filters: RevenueReportQuery) => void;
};

export function RevenueReportFilters({ filters, disabled, onChange }: RevenueReportFiltersProps) {
  const staffQuery = useClinicStaffMembersList({ page: 1, limit: 100, status: "ACTIVE" });
  const patientsQuery = useClinicPatientsList({ page: 1, limit: 100, status: "ACTIVE" });

  return (
    <>
      <DashboardDateRangeFilter
        rangeType={filters.rangeType ?? "last_30_days"}
        startDate={filters.startDate ?? ""}
        endDate={filters.endDate ?? ""}
        disabled={disabled}
        onRangeTypeChange={(rangeType: DashboardRangeType) => onChange({ ...filters, rangeType })}
        onStartDateChange={(startDate) => onChange({ ...filters, startDate })}
        onEndDateChange={(endDate) => onChange({ ...filters, endDate })}
      />
      <section className="user-list-filters">
      <div className="user-list-filters-grid">
        <ReportGroupByField
          value={filters.groupBy ?? "day"}
          disabled={disabled}
          onChange={(groupBy: ReportGroupBy) => onChange({ ...filters, groupBy })}
        />
        <div>
          <Label htmlFor="revenue-report-staff">Staff</Label>
          <select
            id="revenue-report-staff"
            className={SELECT_CLASS}
            value={filters.staffId ?? ""}
            disabled={disabled}
            onChange={(event) =>
              onChange({ ...filters, staffId: event.target.value || undefined })
            }
          >
            <option value="">All staff</option>
            {(staffQuery.data?.data ?? []).map((member) => (
              <option key={member.id} value={member.id}>
                {[member.firstName, member.lastName].filter(Boolean).join(" ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="revenue-report-patient">Patient</Label>
          <select
            id="revenue-report-patient"
            className={SELECT_CLASS}
            value={filters.patientId ?? ""}
            disabled={disabled}
            onChange={(event) =>
              onChange({ ...filters, patientId: event.target.value || undefined })
            }
          >
            <option value="">All patients</option>
            {(patientsQuery.data?.data ?? []).map((patient) => (
              <option key={patient.id} value={patient.id}>
                {[patient.firstName, patient.lastName].filter(Boolean).join(" ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="revenue-report-status">Status</Label>
          <select
            id="revenue-report-status"
            className={SELECT_CLASS}
            value={filters.status ?? ""}
            disabled={disabled}
            onChange={(event) =>
              onChange({
                ...filters,
                status: (event.target.value || undefined) as RevenueReportQuery["status"],
              })
            }
          >
            <option value="">All statuses</option>
            <option value="PAID">Paid</option>
            <option value="ISSUED">Issued</option>
            <option value="VOID">Void</option>
          </select>
        </div>
        <div>
          <Label htmlFor="revenue-report-min-total">Min total</Label>
          <Input
            id="revenue-report-min-total"
            type="number"
            min={0}
            value={filters.minTotal ?? ""}
            disabled={disabled}
            onChange={(event) =>
              onChange({
                ...filters,
                minTotal: event.target.value ? Number(event.target.value) : undefined,
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="revenue-report-max-total">Max total</Label>
          <Input
            id="revenue-report-max-total"
            type="number"
            min={0}
            value={filters.maxTotal ?? ""}
            disabled={disabled}
            onChange={(event) =>
              onChange({
                ...filters,
                maxTotal: event.target.value ? Number(event.target.value) : undefined,
              })
            }
          />
        </div>
      </div>
    </section>
    </>
  );
}
