"use client";

import { DashboardDateRangeFilter } from "@/components/dashboard/DashboardDateRangeFilter";
import { ReportGroupByField } from "@/components/reports/ReportGroupByField";
import { Label } from "@/components/ui/input";
import { useClinicLocationsList } from "@/hooks/useClinicPortal";
import { useClinicStaffMembersList } from "@/hooks/useClinicStaffMember";
import type { AppointmentReportQuery, DashboardRangeType, ReportGroupBy } from "@/lib/reporting-types";

const SELECT_CLASS =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

type AppointmentReportFiltersProps = {
  filters: AppointmentReportQuery;
  disabled?: boolean;
  onChange: (filters: AppointmentReportQuery) => void;
};

export function AppointmentReportFilters({
  filters,
  disabled,
  onChange,
}: AppointmentReportFiltersProps) {
  const staffQuery = useClinicStaffMembersList({ page: 1, limit: 100, status: "ACTIVE" });
  const locationsQuery = useClinicLocationsList({ page: 1, limit: 100, status: "ACTIVE" });

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
          <Label htmlFor="appointment-report-staff">Staff</Label>
          <select
            id="appointment-report-staff"
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
          <Label htmlFor="appointment-report-location">Location</Label>
          <select
            id="appointment-report-location"
            className={SELECT_CLASS}
            value={filters.locationId ?? ""}
            disabled={disabled}
            onChange={(event) =>
              onChange({ ...filters, locationId: event.target.value || undefined })
            }
          >
            <option value="">All locations</option>
            {(locationsQuery.data?.data ?? []).map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="appointment-report-type">Appointment type</Label>
          <input
            id="appointment-report-type"
            className={SELECT_CLASS}
            value={filters.appointmentType ?? ""}
            disabled={disabled}
            onChange={(event) =>
              onChange({ ...filters, appointmentType: event.target.value || undefined })
            }
            placeholder="All types"
          />
        </div>
        <div>
          <Label htmlFor="appointment-report-status">Status</Label>
          <select
            id="appointment-report-status"
            className={SELECT_CLASS}
            value={filters.status ?? ""}
            disabled={disabled}
            onChange={(event) =>
              onChange({ ...filters, status: event.target.value || undefined })
            }
          >
            <option value="">All statuses</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="NO_SHOW">No show</option>
          </select>
        </div>
      </div>
    </section>
    </>
  );
}
