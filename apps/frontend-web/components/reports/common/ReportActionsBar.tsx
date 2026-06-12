"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SaveReportModal } from "@/components/reports/common/SaveReportModal";
import { ScheduleReportModal } from "@/components/reports/common/ScheduleReportModal";
import {
  useExportAppointmentReport,
  useExportPatientReport,
  useExportRevenueReport,
} from "@/hooks/useReports";
import { useAuthStore } from "@/store/auth.store";
import { userHasPermission } from "@/lib/auth/permissions";
import { buildCsvContent, downloadCsv } from "@/lib/report-export-utils";
import { parseReportConfigErrors } from "@/lib/reporting-api-errors";
import type {
  AdvancedSavedReportType,
  AppointmentReportQuery,
  PatientReportQuery,
  RevenueReportQuery,
  SavedReportConfig,
} from "@/lib/reporting-types";
import { buildReportConfigFromFilters, pageTypeToSavedReportType } from "@/lib/saved-report-utils";

type ReportActionsBarProps = {
  reportType: AdvancedSavedReportType;
  filters: AppointmentReportQuery | RevenueReportQuery | PatientReportQuery;
  disabled?: boolean;
};

export function ReportActionsBar({ reportType, filters, disabled = false }: ReportActionsBarProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const canManage = userHasPermission(user, "reporting.manage");
  const [saveOpen, setSaveOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [savedReportId, setSavedReportId] = useState<string | null>(null);

  const exportAppointment = useExportAppointmentReport();
  const exportRevenue = useExportRevenueReport();
  const exportPatient = useExportPatientReport();

  const config: SavedReportConfig = buildReportConfigFromFilters(filters);
  const savedType = pageTypeToSavedReportType(reportType);
  const query =
    filters.rangeType === "custom"
      ? { ...filters, startDate: filters.startDate, endDate: filters.endDate }
      : filters;

  const isExporting =
    exportAppointment.isPending || exportRevenue.isPending || exportPatient.isPending;

  async function handleExport() {
    try {
      let exportData;
      if (reportType === "appointment") {
        exportData = await exportAppointment.mutateAsync(query as AppointmentReportQuery);
      } else if (reportType === "revenue") {
        exportData = await exportRevenue.mutateAsync(query as RevenueReportQuery);
      } else {
        exportData = await exportPatient.mutateAsync(query as PatientReportQuery);
      }

      const csv = buildCsvContent(exportData.columns, exportData.rows);
      const filename = `${reportType}-report-${new Date().toISOString().slice(0, 10)}.csv`;
      downloadCsv(filename, csv);
      toast.success("Export downloaded.");
    } catch (error) {
      const parsed = parseReportConfigErrors(error, "Failed to export report.");
      if (parsed.forbidden || parsed.tenantMismatch) {
        router.replace("/forbidden");
        return;
      }
      toast.error(parsed.generalError ?? "Failed to export report.");
    }
  }

  function handleScheduleClick() {
    if (!savedReportId) {
      toast.error("Save the report before scheduling email delivery.");
      return;
    }
    setScheduleOpen(true);
  }

  return (
    <>
      <div className="report-actions-bar">
        <Button
          type="button"
          variant="outline"
          onClick={() => setSaveOpen(true)}
          disabled={disabled}
        >
          Save report
        </Button>
        <Button type="button" variant="outline" onClick={() => void handleExport()} disabled={disabled || isExporting}>
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Exporting…
            </>
          ) : (
            "Export"
          )}
        </Button>
        {canManage ? (
          <Button
            type="button"
            variant="outline"
            onClick={handleScheduleClick}
            disabled={disabled}
          >
            Schedule email
          </Button>
        ) : null}
      </div>

      <SaveReportModal
        open={saveOpen}
        onOpenChange={setSaveOpen}
        type={savedType}
        config={config}
        onSaved={setSavedReportId}
      />
      <ScheduleReportModal
        open={scheduleOpen}
        onOpenChange={setScheduleOpen}
        savedReportId={savedReportId}
      />
    </>
  );
}
