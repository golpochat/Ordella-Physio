import { Injectable } from "@nestjs/common";
import type { AppointmentReportQueryInput } from "@ordella/validation";
import { AppointmentServiceClient } from "@/integrations/appointment-service.client";
import { resolveReportRange } from "@/reports/utils/resolve-report-range";

@Injectable()
export class ReportsAppointmentService {
  constructor(private readonly appointmentServiceClient: AppointmentServiceClient) {}

  async getAppointmentReport(tenantId: string, query: AppointmentReportQueryInput) {
    const { start, end, dateRange } = resolveReportRange(query);
    const report = await this.appointmentServiceClient.getAppointmentReport(
      tenantId,
      start,
      end,
      query,
    );

    return {
      dateRange,
      groupBy: query.groupBy,
      rows: report?.rows ?? [],
      chart: buildAppointmentChart(report?.rows ?? []),
      export: {
        columns: ["period", "total", "scheduled", "completed", "cancelled", "noShow"],
        rows: report?.rows ?? [],
      },
      byType: report?.byType ?? [],
    };
  }
}

function buildAppointmentChart(
  rows: Array<{
    period: string;
    total: number;
    scheduled: number;
    completed: number;
    cancelled: number;
    noShow: number;
  }>,
) {
  return {
    labels: rows.map((row) => row.period),
    datasets: [
      { key: "total", label: "Total", values: rows.map((row) => row.total) },
      { key: "completed", label: "Completed", values: rows.map((row) => row.completed) },
      { key: "scheduled", label: "Scheduled", values: rows.map((row) => row.scheduled) },
    ],
  };
}
