"use client";

import { useMemo, useState } from "react";
import { BarChart } from "@/components/charts/bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { LineChart } from "@/components/charts/line-chart";
import { KpiSummaryCards } from "@/components/reporting/kpi-summary-cards";
import { ReportStatusBadge } from "@/components/reporting/report-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import {
  useDownloadReport,
  useReportHistory,
  useReportingKpi,
  useRequestReport,
} from "@/hooks/useReports";
import {
  canGenerateReports,
  getReportTypeOptions,
  getReportingMode,
} from "@/lib/reporting-config";
import type { PortalRole } from "@/lib/rbac";
import type { ReportFormat, ReportType } from "@/lib/reporting-types";
import { formatPatientDateTime } from "@/lib/patient-portal-utils";

const SELECT_CLASS =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

type ReportingCenterProps = {
  roles: PortalRole[];
  title?: string;
  description?: string;
};

function defaultDateRange() {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 30);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

export function ReportingCenter({ roles, title = "Reports", description }: ReportingCenterProps) {
  const mode = getReportingMode(roles);
  const reportOptions = getReportTypeOptions(roles);
  const canGenerate = canGenerateReports(mode);
  const defaults = defaultDateRange();

  const [reportType, setReportType] = useState<ReportType>(reportOptions[0]?.value ?? "appointments_summary");
  const [startDate, setStartDate] = useState(defaults.startDate);
  const [endDate, setEndDate] = useState(defaults.endDate);
  const [therapistId, setTherapistId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [status, setStatus] = useState("");
  const [format, setFormat] = useState<ReportFormat>("json");

  const { data: history, isLoading: historyLoading } = useReportHistory();
  const { data: kpi, isLoading: kpiLoading } = useReportingKpi({ startDate, endDate });
  const requestReport = useRequestReport();
  const downloadReport = useDownloadReport();

  const chartData = useMemo(() => {
    const completed = history?.items.filter((report) => report.status === "completed") ?? [];
    const latest = completed[0];
    if (!latest) {
      return null;
    }

    return {
      line: kpi
        ? [{ label: "Completed", value: kpi.completedAppointments }]
        : [],
      bar: [
        { label: "Completed", value: kpi?.completedAppointments ?? 0 },
        { label: "Cancelled", value: kpi?.cancelledAppointments ?? 0 },
        { label: "No-show", value: kpi?.noShowAppointments ?? 0 },
      ],
      pie: [
        { name: "Completed", value: kpi?.completedAppointments ?? 0 },
        { name: "Cancelled", value: kpi?.cancelledAppointments ?? 0 },
        { name: "No-show", value: kpi?.noShowAppointments ?? 0 },
      ],
    };
  }, [history?.items, kpi]);

  const handleGenerate = () => {
    requestReport.mutate({
      type: reportType,
      filters: {
        startDate,
        endDate,
        format,
        ...(therapistId ? { therapistId } : {}),
        ...(patientId ? { patientId } : {}),
        ...(status ? { status } : {}),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description ? <p className="text-muted-foreground">{description}</p> : null}
      </div>

      <KpiSummaryCards kpi={kpi} isLoading={kpiLoading} />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>Generate report</CardTitle>
            <CardDescription>
              {canGenerate
                ? "Choose a report type, apply filters, and export as CSV or JSON."
                : "Read-only access. Download completed reports from history below."}
            </CardDescription>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report type</Label>
              <select
                id="reportType"
                className={SELECT_CLASS}
                value={reportType}
                onChange={(event) => setReportType(event.target.value as ReportType)}
                disabled={!canGenerate}
              >
                {reportOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  disabled={!canGenerate}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                  disabled={!canGenerate}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="therapistId">Therapist ID</Label>
              <Input
                id="therapistId"
                value={therapistId}
                onChange={(event) => setTherapistId(event.target.value)}
                placeholder="Optional"
                disabled={!canGenerate}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID</Label>
              <Input
                id="patientId"
                value={patientId}
                onChange={(event) => setPatientId(event.target.value)}
                placeholder="Optional"
                disabled={!canGenerate}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                placeholder="Optional (e.g. COMPLETED)"
                disabled={!canGenerate}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Export format</Label>
              <select
                id="format"
                className={SELECT_CLASS}
                value={format}
                onChange={(event) => setFormat(event.target.value as ReportFormat)}
                disabled={!canGenerate}
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
              </select>
            </div>

            {canGenerate ? (
              <Button onClick={handleGenerate} disabled={requestReport.isPending}>
                {requestReport.isPending ? "Generating..." : "Generate report"}
              </Button>
            ) : null}
          </CardBody>
        </Card>

        <div className="space-y-6 xl:col-span-2">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Appointment trend</CardTitle>
              </CardHeader>
              <CardBody>
                <LineChart
                  data={chartData?.bar ?? []}
                  title="Status distribution"
                />
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Operational mix</CardTitle>
              </CardHeader>
              <CardBody>
                <DonutChart data={chartData?.pie ?? []} />
              </CardBody>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Volume comparison</CardTitle>
            </CardHeader>
            <CardBody>
              <BarChart data={chartData?.bar ?? []} />
            </CardBody>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report history</CardTitle>
          <CardDescription>Track pending, processing, and completed report requests.</CardDescription>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-3 py-2 font-medium">Type</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                  <th className="px-3 py-2 font-medium">Created</th>
                  <th className="px-3 py-2 font-medium">Format</th>
                  <th className="px-3 py-2 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {historyLoading ? (
                  <tr className="border-b">
                    <td className="px-3 py-3" colSpan={5}>
                      Loading reports...
                    </td>
                  </tr>
                ) : null}
                {!historyLoading && (history?.items.length ?? 0) === 0 ? (
                  <tr className="border-b">
                    <td className="px-3 py-3" colSpan={5}>
                      No reports generated yet.
                    </td>
                  </tr>
                ) : null}
                {history?.items.map((report) => (
                  <tr key={report.id} className="border-b">
                    <td className="px-3 py-3 font-medium">{report.type}</td>
                    <td className="px-3 py-3">
                      <ReportStatusBadge status={report.status} />
                    </td>
                    <td className="px-3 py-3">{formatPatientDateTime(report.createdAt)}</td>
                    <td className="px-3 py-3">{report.filters.format ?? "json"}</td>
                    <td className="px-3 py-3 text-right">
                      {report.status === "completed" ? (
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadReport.mutate({ id: report.id, format: "json" })}
                          >
                            JSON
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadReport.mutate({ id: report.id, format: "csv" })}
                          >
                            CSV
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
