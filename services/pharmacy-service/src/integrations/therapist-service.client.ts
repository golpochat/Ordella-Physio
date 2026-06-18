import { Injectable, Logger } from "@nestjs/common";
import { pharmacyConfig } from "@ordella/config";

const THERAPIST_CAPABLE_ROLES = new Set([
  "THERAPIST",
  "ADMIN",
  "OWNER",
  "TENANT_OWNER",
  "SUPER_ADMIN",
]);

type TherapistUserRecord = {
  id: string;
  tenantId: string | null;
  role?: string;
  status?: string;
};

@Injectable()
export class TherapistServiceClient {
  private readonly logger = new Logger(TherapistServiceClient.name);
  private readonly baseUrl = pharmacyConfig.therapistServiceUrl.replace(/\/$/, "");

  async validateTherapist(tenantId: string, therapistId: string): Promise<boolean> {
    const record = await this.getTherapistRecord(therapistId);
    if (!record) {
      return false;
    }

    if (record.tenantId !== tenantId) {
      return false;
    }

    const role = record.role?.toUpperCase() ?? "";
    return THERAPIST_CAPABLE_ROLES.has(role);
  }

  private async getTherapistRecord(therapistId: string): Promise<TherapistUserRecord | null> {
    try {
      const url = `${this.baseUrl}/auth/internal/users/${encodeURIComponent(therapistId)}`;
      const response = await fetch(url, { headers: { accept: "application/json" } });
      if (!response.ok) {
        return null;
      }

      return (await response.json()) as TherapistUserRecord;
    } catch (error) {
      this.logger.warn(
        `Therapist lookup failed for ${therapistId}`,
        error instanceof Error ? error.message : error,
      );
      return null;
    }
  }
}
