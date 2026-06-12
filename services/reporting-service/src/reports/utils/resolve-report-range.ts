import type {
  AppointmentReportQueryInput,
  PatientReportQueryInput,
  RevenueReportQueryInput,
} from "@ordella/validation";
import { getDateRange, toIsoDateString } from "@/utils/date-range";
import { invalidDateRangeError } from "@/utils/reporting-errors";

type ReportQueryInput =
  | AppointmentReportQueryInput
  | RevenueReportQueryInput
  | PatientReportQueryInput;

export function resolveReportRange(query: ReportQueryInput) {
  const range = getDateRange(query.rangeType, query.startDate, query.endDate);
  if (!range) {
    throw invalidDateRangeError();
  }

  return {
    start: range.start,
    end: range.end,
    dateRange: {
      start: toIsoDateString(range.start),
      end: toIsoDateString(range.end),
    },
  };
}
