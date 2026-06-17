import { Injectable, Logger } from "@nestjs/common";
import { pharmacyConfig } from "@ordella/config";

@Injectable()
export class PatientServiceClient {
  private readonly logger = new Logger(PatientServiceClient.name);
  private readonly baseUrl = pharmacyConfig.patientServiceUrl.replace(/\/$/, "");

  async validatePatient(tenantId: string, patientId: string): Promise<boolean> {
    try {
      const url = `${this.baseUrl}/patients/internal/record/${encodeURIComponent(patientId)}?tenantId=${encodeURIComponent(tenantId)}`;
      const response = await fetch(url, { headers: { accept: "application/json" } });
      return response.ok;
    } catch (error) {
      this.logger.warn(`Patient validation failed for ${patientId}`, error instanceof Error ? error.message : error);
      return false;
    }
  }
}
