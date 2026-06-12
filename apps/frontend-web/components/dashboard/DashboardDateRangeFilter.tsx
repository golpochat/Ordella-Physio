"use client";

import { Input, Label } from "@/components/ui/input";
import type { DashboardRangeType } from "@/lib/reporting-types";

const SELECT_CLASS =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

const RANGE_OPTIONS: Array<{ value: DashboardRangeType; label: string }> = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last_7_days", label: "Last 7 days" },
  { value: "last_30_days", label: "Last 30 days" },
  { value: "this_month", label: "This month" },
  { value: "last_month", label: "Last month" },
  { value: "custom", label: "Custom range" },
];

type DashboardDateRangeFilterProps = {
  rangeType: DashboardRangeType;
  startDate: string;
  endDate: string;
  disabled?: boolean;
  onRangeTypeChange: (value: DashboardRangeType) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
};

export function DashboardDateRangeFilter({
  rangeType,
  startDate,
  endDate,
  disabled,
  onRangeTypeChange,
  onStartDateChange,
  onEndDateChange,
}: DashboardDateRangeFilterProps) {
  return (
    <section className="user-list-filters">
      <div className="user-list-filters-grid">
      <div>
        <Label htmlFor="dashboard-range-type">Date range</Label>
        <select
          id="dashboard-range-type"
          className={SELECT_CLASS}
          value={rangeType}
          disabled={disabled}
          onChange={(event) => onRangeTypeChange(event.target.value as DashboardRangeType)}
        >
          {RANGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {rangeType === "custom" ? (
        <>
          <div>
            <Label htmlFor="dashboard-start-date">Start date</Label>
            <Input
              id="dashboard-start-date"
              type="date"
              value={startDate}
              disabled={disabled}
              onChange={(event) => onStartDateChange(event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="dashboard-end-date">End date</Label>
            <Input
              id="dashboard-end-date"
              type="date"
              value={endDate}
              disabled={disabled}
              onChange={(event) => onEndDateChange(event.target.value)}
            />
          </div>
        </>
      ) : null}
      </div>
    </section>
  );
}
