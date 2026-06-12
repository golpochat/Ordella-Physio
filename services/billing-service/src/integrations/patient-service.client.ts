import { Injectable, Logger } from "@nestjs/common";

export type PatientSummary = {
  id: string;
  tenantId: string;
  status: string;
};

export type PatientNameSummary = {
  id: string;
  firstName: string;
  lastName: string;
};

@Injectable()
export class PatientServiceClient {
  private readonly logger = new Logger(PatientServiceClient.name);

  private get baseUrl(): string {
    return process.env.PATIENT_SERVICE_URL ?? "http://patient-service:3053";
  }

  async getPatientForTenant(tenantId: string, patientId: string): Promise<PatientSummary | null> {
    try {
      const params = new URLSearchParams({ tenantId });
      const response = await fetch(
        `${this.baseUrl}/patients/internal/${encodeURIComponent(patientId)}?${params.toString()}`,
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
          `Patient lookup failed for ${patientId} in tenant ${tenantId}: HTTP ${response.status}`,
        );
        return null;
      }

      const payload = (await response.json()) as PatientSummary;
      if (!payload?.id || !payload?.tenantId) {
        return null;
      }

      return payload;
    } catch (error) {
      this.logger.warn(`Patient lookup failed for ${patientId}`, error);
      return null;
    }
  }

  async searchPatientIds(tenantId: string, search: string): Promise<string[]> {
    try {
      const params = new URLSearchParams({ tenantId, search });
      const response = await fetch(
        `${this.baseUrl}/patients/internal/search?${params.toString()}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (!response.ok) {
        this.logger.warn(`Patient search failed for tenant ${tenantId}: HTTP ${response.status}`);
        return [];
      }

      const payload = (await response.json()) as { ids?: string[] };
      return payload.ids ?? [];
    } catch (error) {
      this.logger.warn(`Patient search failed for tenant ${tenantId}`, error);
      return [];
    }
  }

  async getPatientSummaries(tenantId: string, patientIds: string[]): Promise<PatientNameSummary[]> {
    if (!patientIds.length) {
      return [];
    }

    try {
      const params = new URLSearchParams({ tenantId, ids: patientIds.join(",") });
      const response = await fetch(
        `${this.baseUrl}/patients/internal/batch?${params.toString()}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (!response.ok) {
        this.logger.warn(`Patient batch lookup failed for tenant ${tenantId}: HTTP ${response.status}`);
        return [];
      }

      const payload = (await response.json()) as { data?: PatientNameSummary[] };
      return payload.data ?? [];
    } catch (error) {
      this.logger.warn(`Patient batch lookup failed for tenant ${tenantId}`, error);
      return [];
    }
  }
}
