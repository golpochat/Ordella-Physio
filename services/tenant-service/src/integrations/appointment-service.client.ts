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

  async hasActiveAppointmentsForLocation(
    tenantId: string,
    locationId: string,
  ): Promise<boolean> {
    try {
      const params = new URLSearchParams({ tenantId });
      const response = await fetch(
        `${this.baseUrl}/appointments/internal/locations/${encodeURIComponent(locationId)}/has-active?${params.toString()}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (!response.ok) {
        this.logger.warn(
          `Active appointment lookup failed for location ${locationId}: HTTP ${response.status}`,
        );
        return false;
      }

      const payload = (await response.json()) as ActiveAppointmentsResponse;
      return payload.hasActive === true;
    } catch (error) {
      this.logger.warn(`Active appointment lookup failed for location ${locationId}`, error);
      return false;
    }
  }
}
