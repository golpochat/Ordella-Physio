import { Injectable, Logger } from "@nestjs/common";
type MetricsResponse = {
  patients?: number;
  appointments?: number;
  storageMB?: number;
  staff?: number;
};

@Injectable()
export class UsageMetricsClient {
  private readonly logger = new Logger(UsageMetricsClient.name);

  async fetchLiveMetrics(tenantId: string, periodStart: Date, periodEnd: Date): Promise<MetricsResponse> {
    const [patients, appointments, storageMB, staff] = await Promise.all([
      this.fetchPatientCount(tenantId, periodStart, periodEnd),
      this.fetchAppointmentCount(tenantId, periodStart, periodEnd),
      this.fetchStorageUsageMb(tenantId),
      this.fetchStaffCount(tenantId),
    ]);

    return { patients, appointments, storageMB, staff };
  }

  private async fetchPatientCount(tenantId: string, start: Date, end: Date) {
    const baseUrl = process.env.PATIENT_SERVICE_URL ?? "http://localhost:3053";
    try {
      const params = new URLSearchParams({
        tenantId,
        start: start.toISOString(),
        end: end.toISOString(),
      });
      const response = await fetch(`${baseUrl}/patients/internal/metrics?${params.toString()}`);
      if (!response.ok) {
        return 0;
      }
      const body = (await response.json()) as { totalPatients?: number };
      return body.totalPatients ?? 0;
    } catch (error) {
      this.logger.warn("Patient metrics fetch failed", error);
      return 0;
    }
  }

  private async fetchAppointmentCount(tenantId: string, start: Date, end: Date) {
    const baseUrl = process.env.APPOINTMENT_SERVICE_URL ?? "http://localhost:3054";
    try {
      const params = new URLSearchParams({
        tenantId,
        start: start.toISOString(),
        end: end.toISOString(),
      });
      const response = await fetch(`${baseUrl}/appointments/internal/metrics?${params.toString()}`);
      if (!response.ok) {
        return 0;
      }
      const body = (await response.json()) as { totalAppointments?: number };
      return body.totalAppointments ?? 0;
    } catch (error) {
      this.logger.warn("Appointment metrics fetch failed", error);
      return 0;
    }
  }

  private async fetchStorageUsageMb(tenantId: string) {
    const baseUrl = process.env.FILE_STORAGE_SERVICE_URL ?? "http://localhost:3071";
    try {
      const params = new URLSearchParams({ tenantId });
      const response = await fetch(`${baseUrl}/files/internal/usage?${params.toString()}`);
      if (!response.ok) {
        return 0;
      }
      const body = (await response.json()) as { storageMB?: number };
      return body.storageMB ?? 0;
    } catch (error) {
      this.logger.warn("Storage usage fetch failed", error);
      return 0;
    }
  }

  private async fetchStaffCount(tenantId: string) {
    const baseUrl = process.env.STAFF_SERVICE_URL ?? "http://localhost:3069";
    try {
      const params = new URLSearchParams({ tenantId });
      const response = await fetch(`${baseUrl}/staff/internal/seat-count?${params.toString()}`);
      if (!response.ok) {
        return 0;
      }
      const body = (await response.json()) as { count?: number };
      return body.count ?? 0;
    } catch (error) {
      this.logger.warn("Staff seat count fetch failed", error);
      return 0;
    }
  }
}
