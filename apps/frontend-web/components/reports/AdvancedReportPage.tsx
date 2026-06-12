"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError } from "@/components/patient-portal/page-state";
import { parseAdvancedReportErrors } from "@/lib/reporting-api-errors";
import type { AdvancedReportBaseQuery, DashboardRangeType, ReportGroupBy } from "@/lib/reporting-types";

type AdvancedReportPageProps<T extends AdvancedReportBaseQuery> = {
  title: string;
  subtitle: string;
  defaultFilters: T;
  filters: ReactNode;
  content: ReactNode;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  onRetry: () => void;
  dateRange?: { start: string; end: string };
  filterState: T;
  onFilterStateChange: (filters: T) => void;
  headerActions?: ReactNode;
};

function defaultCustomDates() {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 29);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

export function useAdvancedReportFilters<T extends AdvancedReportBaseQuery>(
  defaults: T,
): [T, (filters: T) => void] {
  const customDates = defaultCustomDates();
  const [filters, setFilters] = useState<T>({
    ...defaults,
    startDate: defaults.startDate ?? customDates.startDate,
    endDate: defaults.endDate ?? customDates.endDate,
  });

  return [filters, setFilters];
}

export function AdvancedReportPage<T extends AdvancedReportBaseQuery>({
  title,
  subtitle,
  filters,
  content,
  isLoading,
  isFetching,
  isError,
  error,
  onRetry,
  dateRange,
  headerActions,
}: AdvancedReportPageProps<T>) {
  const router = useRouter();
  const controlsDisabled = isLoading || isFetching;

  useEffect(() => {
    if (!isError) {
      return;
    }

    const parsed = parseAdvancedReportErrors(error);
    if (parsed.forbidden) {
      router.replace("/forbidden");
      return;
    }

    if ((parsed.invalidDateRange || parsed.invalidGroupBy) && parsed.generalError) {
      toast.error(parsed.generalError);
    }
  }, [isError, error, router]);

  if (isError) {
    const parsed = parseAdvancedReportErrors(error);
    if (parsed.forbidden) {
      return null;
    }

    return <PageError message={parsed.generalError ?? undefined} onRetry={onRetry} />;
  }

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      {headerActions}
      {dateRange ? (
        <p className="dashboard-range-summary">
          Showing data from {dateRange.start} to {dateRange.end}
        </p>
      ) : null}
      <div className={controlsDisabled ? "pointer-events-none opacity-70" : undefined}>{filters}</div>
      {content}
    </>
  );
}

export const defaultAdvancedReportFilters = {
  rangeType: "last_30_days" as DashboardRangeType,
  groupBy: "day" as ReportGroupBy,
};
