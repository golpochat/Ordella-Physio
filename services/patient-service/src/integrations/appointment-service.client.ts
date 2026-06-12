import { Injectable, Logger } from "@nestjs/common";

type ActiveAppointmentsResponse = {
  hasActive: boolean;
  count: number;
};

@Injectable()
export class AppointmentServiceClient {
  private readonly logger = new Logger(AppointmentServiceClient.name);

  private get baseUrl(): string {
    return process.env.APPOINTMENT_SERVICE_URL ?? "http://appointment-service:3054";
  }

  async hasActiveAppointmentsForPatient(tenantId: string, patientId: string): Promise<boolean> {
    try {
      const params = new URLSearchParams({ tenantId });
      const response = await fetch(
        `${this.baseUrl}/appointments/internal/patients/${encodeURIComponent(patientId)}/has-active?${params.toString()}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (!response.ok) {
        this.logger.warn(
          `Active appointment lookup failed for patient ${patientId}: HTTP ${response.status}`,
        );
        return false;
      }

      const payload = (await response.json()) as ActiveAppointmentsResponse;
      return payload.hasActive === true;
    } catch (error) {
      this.logger.warn(`Active appointment lookup failed for patient ${patientId}`, error);
      return false;
    }
  }
}
