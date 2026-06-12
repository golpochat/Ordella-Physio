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

  async hasActiveAppointmentsForStaff(tenantId: string, staffId: string): Promise<boolean> {
    try {
      const params = new URLSearchParams({ tenantId });
      const response = await fetch(
        `${this.baseUrl}/appointments/internal/staff/${encodeURIComponent(staffId)}/has-active?${params.toString()}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (!response.ok) {
        this.logger.warn(
          `Active appointment lookup failed for staff ${staffId}: HTTP ${response.status}`,
        );
        return false;
      }

      const payload = (await response.json()) as ActiveAppointmentsResponse;
      return payload.hasActive === true;
    } catch (error) {
      this.logger.warn(`Active appointment lookup failed for staff ${staffId}`, error);
      return false;
    }
  }
}
