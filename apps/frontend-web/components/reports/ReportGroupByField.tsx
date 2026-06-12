"use client";

import { Label } from "@/components/ui/input";
import type { ReportGroupBy } from "@/lib/reporting-types";

const SELECT_CLASS =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

const GROUP_OPTIONS: Array<{ value: ReportGroupBy; label: string }> = [
  { value: "day", label: "Daily" },
  { value: "week", label: "Weekly" },
  { value: "month", label: "Monthly" },
];

type ReportGroupByFieldProps = {
  value: ReportGroupBy;
  disabled?: boolean;
  onChange: (value: ReportGroupBy) => void;
};

export function ReportGroupByField({ value, disabled, onChange }: ReportGroupByFieldProps) {
  return (
    <div>
      <Label htmlFor="report-group-by">Group by</Label>
      <select
        id="report-group-by"
        className={SELECT_CLASS}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value as ReportGroupBy)}
      >
        {GROUP_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
