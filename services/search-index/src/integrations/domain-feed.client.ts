import { Injectable, Logger } from "@nestjs/common";

export type IndexFeedPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type IndexFeedResponse<T> = {
  data: T[];
  pagination: IndexFeedPagination;
};

export type NameSummary = { id: string; firstName: string; lastName: string };

@Injectable()
export class DomainFeedClient {
  private readonly logger = new Logger(DomainFeedClient.name);

  private get patientBaseUrl() {
    return process.env.PATIENT_SERVICE_URL ?? "http://patient-service:3053";
  }

  private get appointmentBaseUrl() {
    return process.env.APPOINTMENT_SERVICE_URL ?? "http://appointment-service:3054";
  }

  private get billingBaseUrl() {
    return process.env.BILLING_SERVICE_URL ?? "http://billing-service:3056";
  }

  private get staffBaseUrl() {
    return process.env.STAFF_SERVICE_URL ?? "http://staff-service:3069";
  }

  private get tenantBaseUrl() {
    return process.env.TENANT_SERVICE_URL ?? "http://tenant-service:3052";
  }

  async listTenantIds(): Promise<string[]> {
    try {
      const response = await fetch(`${this.tenantBaseUrl}/tenants/directory?limit=200`, {
        headers: { accept: "application/json" },
      });

      if (!response.ok) {
        return [];
      }

      const payload = (await response.json()) as { data?: Array<{ id: string }> };
      return (payload.data ?? []).map((tenant) => tenant.id);
    } catch (error) {
      this.logger.warn("Failed to load tenant directory", error);
      return [];
    }
  }

  fetchPatientFeed<T>(tenantId: string, page: number, limit: number) {
    return this.fetchFeed<T>(`${this.patientBaseUrl}/patients/internal/index-feed`, tenantId, page, limit);
  }

  fetchAppointmentFeed<T>(tenantId: string, page: number, limit: number) {
    return this.fetchFeed<T>(
      `${this.appointmentBaseUrl}/appointments/internal/index-feed`,
      tenantId,
      page,
      limit,
    );
  }

  fetchInvoiceFeed<T>(tenantId: string, page: number, limit: number) {
    return this.fetchFeed<T>(`${this.billingBaseUrl}/billing/internal/index-feed`, tenantId, page, limit);
  }

  fetchStaffFeed<T>(tenantId: string, page: number, limit: number) {
    return this.fetchFeed<T>(`${this.staffBaseUrl}/staff/internal/index-feed`, tenantId, page, limit);
  }

  async fetchPatientSummaries(tenantId: string, ids: string[]): Promise<NameSummary[]> {
    if (!ids.length) {
      return [];
    }

    const params = new URLSearchParams({
      tenantId,
      ids: [...new Set(ids)].join(","),
    });

    const response = await fetch(`${this.patientBaseUrl}/patients/internal/batch?${params}`, {
      headers: { accept: "application/json" },
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as { data?: NameSummary[] };
    return payload.data ?? [];
  }

  async fetchStaffSummaries(tenantId: string, ids: string[]): Promise<NameSummary[]> {
    if (!ids.length) {
      return [];
    }

    const params = new URLSearchParams({
      tenantId,
      ids: [...new Set(ids)].join(","),
    });

    const response = await fetch(`${this.staffBaseUrl}/staff/internal/batch?${params}`, {
      headers: { accept: "application/json" },
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as { data?: NameSummary[] };
    return payload.data ?? [];
  }

  async fetchRecord(indexName: string, tenantId: string, entityId: string) {
    const baseByIndex: Record<string, string> = {
      patients: `${this.patientBaseUrl}/patients/internal/record`,
      appointments: `${this.appointmentBaseUrl}/appointments/internal/record`,
      invoices: `${this.billingBaseUrl}/billing/internal/record`,
      staff: `${this.staffBaseUrl}/staff/internal/record`,
    };

    const baseUrl = baseByIndex[indexName];
    if (!baseUrl) {
      return null;
    }

    const params = new URLSearchParams({ tenantId });
    const response = await fetch(`${baseUrl}/${encodeURIComponent(entityId)}?${params}`, {
      headers: { accept: "application/json" },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as Record<string, unknown>;
  }

  private async fetchFeed<T>(url: string, tenantId: string, page: number, limit: number) {
    const params = new URLSearchParams({
      tenantId,
      page: String(page),
      limit: String(limit),
    });

    const response = await fetch(`${url}?${params}`, {
      headers: { accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Index feed failed with status ${response.status}`);
    }

    return (await response.json()) as IndexFeedResponse<T>;
  }
}
