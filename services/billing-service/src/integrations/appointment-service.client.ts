import { Injectable, Logger } from "@nestjs/common";

export type AppointmentSummary = {
  id: string;
  tenantId: string;
  patientId: string;
  status: string;
};

@Injectable()
export class AppointmentServiceClient {
  private readonly logger = new Logger(AppointmentServiceClient.name);

  private get baseUrl(): string {
    return process.env.APPOINTMENT_SERVICE_URL ?? "http://appointment-service:3054";
  }

  async getAppointmentForTenant(
    tenantId: string,
    appointmentId: string,
  ): Promise<AppointmentSummary | null> {
    try {
      const params = new URLSearchParams({ tenantId });
      const response = await fetch(
        `${this.baseUrl}/appointments/internal/${encodeURIComponent(appointmentId)}?${params.toString()}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        this.logger.warn(
          `Appointment lookup failed for ${appointmentId} in tenant ${tenantId}: HTTP ${response.status}`,
        );
        return null;
      }

      const payload = (await response.json()) as AppointmentSummary;
      if (!payload?.id || !payload?.tenantId) {
        return null;
      }

      return payload;
    } catch (error) {
      this.logger.warn(`Appointment lookup failed for ${appointmentId}`, error);
      return null;
    }
  }
}
