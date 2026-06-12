import { Injectable, Logger } from "@nestjs/common";
import type { PatientReportQueryInput } from "@ordella/validation";
import { toIsoDateString } from "@/utils/date-range";

export type PatientReportResponse = {
  groupBy: "day" | "week" | "month";
  rows: Array<{
    period: string;
    newPatients: number;
    active: number;
    inactive: number;
  }>;
};

export type PatientMetricsResponse = {
  totalPatients: number;
  newPatientsInRange: number;
};

@Injectable()
export class PatientServiceClient {
  private readonly logger = new Logger(PatientServiceClient.name);

  private get baseUrl(): string {
    return process.env.PATIENT_SERVICE_URL ?? "http://patient-service:3053";
  }

  async getMetrics(
    tenantId: string,
    start: Date,
    end: Date,
  ): Promise<PatientMetricsResponse | null> {
    try {
      const params = new URLSearchParams({
        tenantId,
        start: toIsoDateString(start),
        end: toIsoDateString(end),
      });

      const response = await fetch(
        `${this.baseUrl}/patients/internal/metrics?${params.toString()}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (!response.ok) {
        this.logger.warn(`Patient metrics failed for tenant ${tenantId}: HTTP ${response.status}`);
        return null;
      }

      return (await response.json()) as PatientMetricsResponse;
    } catch (error) {
      this.logger.warn(`Patient metrics failed for tenant ${tenantId}`, error);
      return null;
    }
  }

  async getPatientReport(
    tenantId: string,
    start: Date,
    end: Date,
    query: PatientReportQueryInput,
  ): Promise<PatientReportResponse | null> {
    try {
      const params = new URLSearchParams({
        tenantId,
        start: toIsoDateString(start),
        end: toIsoDateString(end),
        groupBy: query.groupBy,
      });

      if (query.gender) params.set("gender", query.gender);
      if (query.status) params.set("status", query.status);

      const response = await fetch(
        `${this.baseUrl}/patients/internal/report?${params.toString()}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (!response.ok) {
        this.logger.warn(`Patient report failed for tenant ${tenantId}: HTTP ${response.status}`);
        return null;
      }

      return (await response.json()) as PatientReportResponse;
    } catch (error) {
      this.logger.warn(`Patient report failed for tenant ${tenantId}`, error);
      return null;
    }
  }
}
