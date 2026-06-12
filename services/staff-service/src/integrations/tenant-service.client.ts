import { Injectable, Logger } from "@nestjs/common";

export type TenantLocationSummary = {
  id: string;
  tenantId: string;
  name: string;
  code: string;
  status: "ACTIVE" | "INACTIVE";
};

@Injectable()
export class TenantServiceClient {
  private readonly logger = new Logger(TenantServiceClient.name);

  private get baseUrl(): string {
    return process.env.TENANT_SERVICE_URL ?? "http://tenant-service:3052";
  }

  async getLocation(locationId: string): Promise<TenantLocationSummary | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/tenants/internal/locations/${encodeURIComponent(locationId)}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        this.logger.warn(`Location lookup failed for ${locationId}: HTTP ${response.status}`);
        return null;
      }

      const payload = (await response.json()) as TenantLocationSummary;
      if (!payload?.id || !payload?.tenantId) {
        return null;
      }

      return payload;
    } catch (error) {
      this.logger.warn(`Location lookup failed for ${locationId}`, error);
      return null;
    }
  }

  async getLocations(locationIds: string[]): Promise<Map<string, TenantLocationSummary>> {
    const entries = await Promise.all(
      locationIds.map(async (locationId) => {
        const location = await this.getLocation(locationId);
        return location ? ([locationId, location] as const) : null;
      }),
    );

    return new Map(entries.filter((entry): entry is [string, TenantLocationSummary] => entry !== null));
  }
}
