import { Injectable, Logger } from "@nestjs/common";

export type StaffWeeklyScheduleEntry = {
  day: string;
  start: string;
  end: string;
};

export type StaffAvailabilitySummary = {
  id: string;
  tenantId: string;
  status: "ACTIVE" | "INACTIVE";
  weeklySchedule: StaffWeeklyScheduleEntry[];
};

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

  async getStaffForTenant(tenantId: string, staffId: string): Promise<StaffAvailabilitySummary | null> {
    try {
      const params = new URLSearchParams({ tenantId });
      const response = await fetch(
        `${this.baseUrl}/staff/internal/${encodeURIComponent(staffId)}?${params.toString()}`,
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
          `Staff lookup failed for ${staffId} in tenant ${tenantId}: HTTP ${response.status}`,
        );
        return null;
      }

      const payload = (await response.json()) as StaffAvailabilitySummary;
      if (!payload?.id || !payload?.tenantId) {
        return null;
      }

      return payload;
    } catch (error) {
      this.logger.warn(`Staff lookup failed for ${staffId}`, error);
      return null;
    }
  }

  async searchStaffIds(tenantId: string, search: string): Promise<string[]> {
    try {
      const params = new URLSearchParams({ tenantId, search });
      const response = await fetch(
        `${this.baseUrl}/staff/internal/search?${params.toString()}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (!response.ok) {
        this.logger.warn(`Staff search failed for tenant ${tenantId}: HTTP ${response.status}`);
        return [];
      }

      const payload = (await response.json()) as { ids?: string[] };
      return payload.ids ?? [];
    } catch (error) {
      this.logger.warn(`Staff search failed for tenant ${tenantId}`, error);
      return [];
    }
  }

  async getStaffSummaries(tenantId: string, staffIds: string[]): Promise<StaffNameSummary[]> {
    if (!staffIds.length) {
      return [];
    }

    try {
      const params = new URLSearchParams({ tenantId, ids: staffIds.join(",") });
      const response = await fetch(
        `${this.baseUrl}/staff/internal/batch?${params.toString()}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

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
