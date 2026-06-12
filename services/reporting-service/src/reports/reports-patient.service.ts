import { Injectable } from "@nestjs/common";
import type { PatientReportQueryInput } from "@ordella/validation";
import { PatientServiceClient } from "@/integrations/patient-service.client";
import { resolveReportRange } from "@/reports/utils/resolve-report-range";

@Injectable()
export class ReportsPatientService {
  constructor(private readonly patientServiceClient: PatientServiceClient) {}

  async getPatientReport(tenantId: string, query: PatientReportQueryInput) {
    const { start, end, dateRange } = resolveReportRange(query);
    const report = await this.patientServiceClient.getPatientReport(tenantId, start, end, query);

    return {
      dateRange,
      groupBy: query.groupBy,
      rows: report?.rows ?? [],
      chart: buildPatientChart(report?.rows ?? []),
      export: {
        columns: ["period", "newPatients", "active", "inactive"],
        rows: report?.rows ?? [],
      },
    };
  }
}

function buildPatientChart(
  rows: Array<{
    period: string;
    newPatients: number;
    active: number;
    inactive: number;
  }>,
) {
  return {
    labels: rows.map((row) => row.period),
    datasets: [
      { key: "newPatients", label: "New patients", values: rows.map((row) => row.newPatients) },
      { key: "active", label: "Active", values: rows.map((row) => row.active) },
      { key: "inactive", label: "Inactive", values: rows.map((row) => row.inactive) },
    ],
  };
}
