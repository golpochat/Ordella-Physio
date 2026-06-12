"use client";

import { useSearchParams } from "next/navigation";
import { AppointmentReportFilters } from "@/components/reports/appointments/AppointmentReportFilters";
import { AppointmentReportTable } from "@/components/reports/appointments/AppointmentReportTable";
import { ReportAISummaryButton } from "@/components/ai/ReportAISummaryButton";
import { ReportActionsBar } from "@/components/reports/common/ReportActionsBar";
import {
  AdvancedReportPage,
  defaultAdvancedReportFilters,
  useAdvancedReportFilters,
} from "@/components/reports/AdvancedReportPage";
import { useAppointmentReport } from "@/hooks/useReports";
import { FileList } from "@/components/files/FileList";
import { WithPermission } from "@/lib/auth/withPermission";
import type { AppointmentReportQuery } from "@/lib/reporting-types";
import { parseSavedReportConfigFromSearch } from "@/lib/saved-report-utils";

export default function ClinicAppointmentReportPage() {
  const searchParams = useSearchParams();
  const savedConfig = parseSavedReportConfigFromSearch(searchParams);
  const [filters, setFilters] = useAdvancedReportFilters<AppointmentReportQuery>({
    ...defaultAdvancedReportFilters,
    ...(savedConfig as AppointmentReportQuery | null),
  });
  const query = {
    ...filters,
    ...(filters.rangeType === "custom"
      ? { startDate: filters.startDate, endDate: filters.endDate }
      : {}),
  };
  const { data, isLoading, isFetching, isError, error, refetch } = useAppointmentReport(query);

  return (
    <WithPermission permission="reporting.read">
      <AdvancedReportPage
        title="Appointment report"
        subtitle="Grouped appointment activity with status breakdowns."
        defaultFilters={defaultAdvancedReportFilters}
        filterState={filters}
        onFilterStateChange={setFilters}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        error={error}
        onRetry={() => void refetch()}
        dateRange={data?.dateRange}
        headerActions={
          <div className="flex flex-wrap items-center gap-2">
            <ReportActionsBar
              reportType="appointment"
              filters={filters}
              disabled={isLoading || isFetching}
            />
            <ReportAISummaryButton report={data ?? undefined} disabled={isLoading || isFetching} />
          </div>
        }
        filters={
          <AppointmentReportFilters
            filters={filters}
            disabled={isLoading || isFetching}
            onChange={setFilters}
          />
        }
        content={
          <>
            <AppointmentReportTable data={data} isLoading={isLoading} />
            <section className="space-y-3">
              <h2 className="text-lg font-semibold">Export history</h2>
              <FileList entityType="REPORT" entityId="APPOINTMENTS" readOnly />
            </section>
          </>
        }
      />
    </WithPermission>
  );
}
