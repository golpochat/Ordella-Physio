import { Injectable, Logger } from "@nestjs/common";
import type { AppointmentReportQueryInput } from "@ordella/validation";
import { toIsoDateString } from "@/utils/date-range";

export type AppointmentReportResponse = {
  groupBy: "day" | "week" | "month";
  rows: Array<{
    period: string;
    total: number;
    scheduled: number;
    completed: number;
    cancelled: number;
    noShow: number;
  }>;
  byType: Array<{ appointmentType: string; count: number }>;
};

export type AppointmentMetricsResponse = {
  totalAppointments: number;
  appointmentsByStatus: {
    SCHEDULED: number;
    COMPLETED: number;
    CANCELLED: number;
    NO_SHOW: number;
  };
  topStaffByAppointments: Array<{ staffId: string; count: number }>;
  topServices: Array<{ serviceName: string; count: number }>;
};

@Injectable()
export class AppointmentServiceClient {
  private readonly logger = new Logger(AppointmentServiceClient.name);

  private get baseUrl(): string {
    return process.env.APPOINTMENT_SERVICE_URL ?? "http://appointment-service:3054";
  }

  async getMetrics(
    tenantId: string,
    start: Date,
    end: Date,
  ): Promise<AppointmentMetricsResponse | null> {
    try {
      const params = new URLSearchParams({
        tenantId,
        start: toIsoDateString(start),
        end: toIsoDateString(end),
      });

      const response = await fetch(
        `${this.baseUrl}/appointments/internal/metrics?${params.toString()}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (!response.ok) {
        this.logger.warn(
          `Appointment metrics failed for tenant ${tenantId}: HTTP ${response.status}`,
        );
        return null;
      }

      return (await response.json()) as AppointmentMetricsResponse;
    } catch (error) {
      this.logger.warn(`Appointment metrics failed for tenant ${tenantId}`, error);
      return null;
    }
  }

  async getAppointmentReport(
    tenantId: string,
    start: Date,
    end: Date,
    query: AppointmentReportQueryInput,
  ): Promise<AppointmentReportResponse | null> {
    try {
      const params = new URLSearchParams({
        tenantId,
        start: toIsoDateString(start),
        end: toIsoDateString(end),
        groupBy: query.groupBy,
      });

      if (query.staffId) params.set("staffId", query.staffId);
      if (query.locationId) params.set("locationId", query.locationId);
      if (query.appointmentType) params.set("appointmentType", query.appointmentType);
      if (query.status) params.set("status", query.status);

      const response = await fetch(
        `${this.baseUrl}/appointments/internal/report?${params.toString()}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (!response.ok) {
        this.logger.warn(
          `Appointment report failed for tenant ${tenantId}: HTTP ${response.status}`,
        );
        return null;
      }

      return (await response.json()) as AppointmentReportResponse;
    } catch (error) {
      this.logger.warn(`Appointment report failed for tenant ${tenantId}`, error);
      return null;
    }
  }
}
