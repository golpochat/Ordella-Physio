"use client";

import { DashboardDateRangeFilter } from "@/components/dashboard/DashboardDateRangeFilter";
import { ReportGroupByField } from "@/components/reports/ReportGroupByField";
import { Label } from "@/components/ui/input";
import type { DashboardRangeType, PatientReportQuery, ReportGroupBy } from "@/lib/reporting-types";

const SELECT_CLASS =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

type PatientReportFiltersProps = {
  filters: PatientReportQuery;
  disabled?: boolean;
  onChange: (filters: PatientReportQuery) => void;
};

export function PatientReportFilters({ filters, disabled, onChange }: PatientReportFiltersProps) {
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
          <Label htmlFor="patient-report-gender">Gender</Label>
          <select
            id="patient-report-gender"
            className={SELECT_CLASS}
            value={filters.gender ?? ""}
            disabled={disabled}
            onChange={(event) =>
              onChange({
                ...filters,
                gender: (event.target.value || undefined) as PatientReportQuery["gender"],
              })
            }
          >
            <option value="">All genders</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
            <option value="UNKNOWN">Unknown</option>
          </select>
        </div>
        <div>
          <Label htmlFor="patient-report-status">Status</Label>
          <select
            id="patient-report-status"
            className={SELECT_CLASS}
            value={filters.status ?? ""}
            disabled={disabled}
            onChange={(event) =>
              onChange({
                ...filters,
                status: (event.target.value || undefined) as PatientReportQuery["status"],
              })
            }
          >
            <option value="">All statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>
    </section>
    </>
  );
}
