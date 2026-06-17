import { Injectable, Logger } from "@nestjs/common";
import { pharmacyConfig } from "@ordella/config";

type StaffRecord = {
  id: string;
  tenantId: string;
  staffType?: string;
  status?: string;
};

@Injectable()
export class StaffServiceClient {
  private readonly logger = new Logger(StaffServiceClient.name);
  private readonly baseUrl = pharmacyConfig.staffServiceUrl.replace(/\/$/, "");

  async validateStaff(tenantId: string, staffId: string): Promise<boolean> {
    const record = await this.getStaffRecord(tenantId, staffId);
    return Boolean(record && record.status !== "INACTIVE");
  }

  async validateTherapist(tenantId: string, therapistId: string): Promise<boolean> {
    const record = await this.getStaffRecord(tenantId, therapistId);
    if (!record || record.status === "INACTIVE") {
      return false;
    }
    return true;
  }

  private async getStaffRecord(tenantId: string, staffId: string): Promise<StaffRecord | null> {
    try {
      const url = `${this.baseUrl}/staff/internal/record/${encodeURIComponent(staffId)}?tenantId=${encodeURIComponent(tenantId)}`;
      const response = await fetch(url, { headers: { accept: "application/json" } });
      if (!response.ok) {
        return null;
      }
      return (await response.json()) as StaffRecord;
    } catch (error) {
      this.logger.warn(`Staff lookup failed for ${staffId}`, error instanceof Error ? error.message : error);
      return null;
    }
  }
}
