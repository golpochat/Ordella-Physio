"use client";

import { useSearchParams } from "next/navigation";
import {
  AdvancedReportPage,
  defaultAdvancedReportFilters,
  useAdvancedReportFilters,
} from "@/components/reports/AdvancedReportPage";
import { ReportAISummaryButton } from "@/components/ai/ReportAISummaryButton";
import { ReportActionsBar } from "@/components/reports/common/ReportActionsBar";
import { RevenueReportFilters } from "@/components/reports/revenue/RevenueReportFilters";
import { RevenueReportTable } from "@/components/reports/revenue/RevenueReportTable";
import { useRevenueReport } from "@/hooks/useReports";
import { FileList } from "@/components/files/FileList";
import { WithPermission } from "@/lib/auth/withPermission";
import type { RevenueReportQuery } from "@/lib/reporting-types";
import { parseSavedReportConfigFromSearch } from "@/lib/saved-report-utils";

export default function ClinicRevenueReportPage() {
  const searchParams = useSearchParams();
  const savedConfig = parseSavedReportConfigFromSearch(searchParams);
  const [filters, setFilters] = useAdvancedReportFilters<RevenueReportQuery>({
    ...defaultAdvancedReportFilters,
    ...(savedConfig as RevenueReportQuery | null),
  });
  const query = {
    ...filters,
    ...(filters.rangeType === "custom"
      ? { startDate: filters.startDate, endDate: filters.endDate }
      : {}),
  };
  const { data, isLoading, isFetching, isError, error, refetch } = useRevenueReport(query);

  return (
    <WithPermission permission="reporting.read">
      <AdvancedReportPage
        title="Revenue report"
        subtitle="Invoice totals grouped by period with tax and discount breakdowns."
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
              reportType="revenue"
              filters={filters}
              disabled={isLoading || isFetching}
            />
            <ReportAISummaryButton report={data ?? undefined} disabled={isLoading || isFetching} />
          </div>
        }
        filters={
          <RevenueReportFilters
            filters={filters}
            disabled={isLoading || isFetching}
            onChange={setFilters}
          />
        }
        content={
          <>
            <RevenueReportTable data={data} isLoading={isLoading} />
            <section className="space-y-3">
              <h2 className="text-lg font-semibold">Export history</h2>
              <FileList entityType="REPORT" entityId="REVENUE" readOnly />
            </section>
          </>
        }
      />
    </WithPermission>
  );
}
