import { Injectable, Logger } from "@nestjs/common";

export type StaffNameSummary = {
  id: string;
  firstName: string;
  lastName: string;
};

@Injectable()
export class StaffServiceClient {
  private readonly logger = new Logger(StaffServiceClient.name);

  private get baseUrl(): string {
    return process.env.STAFF_SERVICE_URL ?? "http://staff-service:3069";
  }

  async getStaffSummaries(tenantId: string, staffIds: string[]): Promise<StaffNameSummary[]> {
    if (!staffIds.length) {
      return [];
    }

    try {
      const params = new URLSearchParams({ tenantId, ids: staffIds.join(",") });
      const response = await fetch(`${this.baseUrl}/staff/internal/batch?${params.toString()}`, {
        method: "GET",
        headers: { accept: "application/json" },
      });

      if (!response.ok) {
        this.logger.warn(`Staff batch lookup failed for tenant ${tenantId}: HTTP ${response.status}`);
        return [];
      }

      const payload = (await response.json()) as { data?: StaffNameSummary[] };
      return payload.data ?? [];
    } catch (error) {
      this.logger.warn(`Staff batch lookup failed for tenant ${tenantId}`, error);
      return [];
    }
  }
}
