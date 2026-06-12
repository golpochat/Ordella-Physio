"use client";

import { useSearchParams } from "next/navigation";
import {
  AdvancedReportPage,
  defaultAdvancedReportFilters,
  useAdvancedReportFilters,
} from "@/components/reports/AdvancedReportPage";
import { ReportAISummaryButton } from "@/components/ai/ReportAISummaryButton";
import { ReportActionsBar } from "@/components/reports/common/ReportActionsBar";
import { PatientReportFilters } from "@/components/reports/patients/PatientReportFilters";
import { PatientReportTable } from "@/components/reports/patients/PatientReportTable";
import { usePatientReport } from "@/hooks/useReports";
import { FileList } from "@/components/files/FileList";
import { WithPermission } from "@/lib/auth/withPermission";
import type { PatientReportQuery } from "@/lib/reporting-types";
import { parseSavedReportConfigFromSearch } from "@/lib/saved-report-utils";

export default function ClinicPatientReportPage() {
  const searchParams = useSearchParams();
  const savedConfig = parseSavedReportConfigFromSearch(searchParams);
  const [filters, setFilters] = useAdvancedReportFilters<PatientReportQuery>({
    ...defaultAdvancedReportFilters,
    ...(savedConfig as PatientReportQuery | null),
  });
  const query = {
    ...filters,
    ...(filters.rangeType === "custom"
      ? { startDate: filters.startDate, endDate: filters.endDate }
      : {}),
  };
  const { data, isLoading, isFetching, isError, error, refetch } = usePatientReport(query);

  return (
    <WithPermission permission="reporting.read">
      <AdvancedReportPage
        title="Patient report"
        subtitle="New patient registrations and active vs inactive counts by period."
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
              reportType="patient"
              filters={filters}
              disabled={isLoading || isFetching}
            />
            <ReportAISummaryButton report={data ?? undefined} disabled={isLoading || isFetching} />
          </div>
        }
        filters={
          <PatientReportFilters
            filters={filters}
            disabled={isLoading || isFetching}
            onChange={setFilters}
          />
        }
        content={
          <>
            <PatientReportTable data={data} isLoading={isLoading} />
            <section className="space-y-3">
              <h2 className="text-lg font-semibold">Export history</h2>
              <FileList entityType="REPORT" entityId="PATIENTS" readOnly />
            </section>
          </>
        }
      />
    </WithPermission>
  );
}
