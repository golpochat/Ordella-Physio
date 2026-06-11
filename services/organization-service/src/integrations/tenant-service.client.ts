import { Injectable, Logger } from "@nestjs/common";
import type { OrganizationTenantSummary } from "@/models/OrganizationTenant";

type TenantStatusSummary = {
  id: string;
  status?: "ACTIVE" | "SUSPENDED";
  isActive?: boolean;
};

@Injectable()
export class TenantServiceClient {
  private readonly logger = new Logger(TenantServiceClient.name);

  private get baseUrl(): string {
    return process.env.TENANT_SERVICE_URL ?? "http://tenant-service:3052";
  }

  async getTenantStatus(tenantId: string): Promise<TenantStatusSummary | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/tenants/internal/status/${encodeURIComponent(tenantId)}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        this.logger.warn(`Tenant status lookup failed for ${tenantId}: HTTP ${response.status}`);
        return null;
      }

      const payload = (await response.json()) as TenantStatusSummary;
      if (!payload?.id) {
        return null;
      }

      return payload;
    } catch (error) {
      this.logger.warn(`Tenant status lookup failed for ${tenantId}`, error);
      return null;
    }
  }

  async hasActiveTenants(tenantIds: string[]): Promise<boolean> {
    if (tenantIds.length === 0) {
      return false;
    }

    const statuses = await Promise.all(tenantIds.map((tenantId) => this.getTenantStatus(tenantId)));

    return statuses.some((status) => {
      if (!status) {
        return false;
      }

      if (status.status) {
        return status.status === "ACTIVE";
      }

      return status.isActive === true;
    });
  }

  async getTenantForOrganizationLink(tenantId: string): Promise<OrganizationTenantSummary | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/tenants/internal/organization-tenant/${encodeURIComponent(tenantId)}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        this.logger.warn(`Tenant organization lookup failed for ${tenantId}: HTTP ${response.status}`);
        return null;
      }

      return (await response.json()) as OrganizationTenantSummary;
    } catch (error) {
      this.logger.warn(`Tenant organization lookup failed for ${tenantId}`, error);
      return null;
    }
  }

  async listOrganizationTenants(organizationId: string): Promise<OrganizationTenantSummary[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/tenants/internal/organization-tenants/${encodeURIComponent(organizationId)}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (!response.ok) {
        this.logger.warn(
          `Organization tenant list failed for ${organizationId}: HTTP ${response.status}`,
        );
        return [];
      }

      const payload = (await response.json()) as OrganizationTenantSummary[];
      return Array.isArray(payload) ? payload : [];
    } catch (error) {
      this.logger.warn(`Organization tenant list failed for ${organizationId}`, error);
      return [];
    }
  }

  async listUnassignedTenants(): Promise<OrganizationTenantSummary[]> {
    try {
      const response = await fetch(`${this.baseUrl}/tenants/internal/unassigned-tenants`, {
        method: "GET",
        headers: { accept: "application/json" },
      });

      if (!response.ok) {
        this.logger.warn(`Unassigned tenant list failed: HTTP ${response.status}`);
        return [];
      }

      const payload = (await response.json()) as OrganizationTenantSummary[];
      return Array.isArray(payload) ? payload : [];
    } catch (error) {
      this.logger.warn("Unassigned tenant list failed", error);
      return [];
    }
  }

  async setTenantOrganization(
    tenantId: string,
    organizationId: string | null,
  ): Promise<OrganizationTenantSummary | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/tenants/internal/organization-tenant/${encodeURIComponent(tenantId)}`,
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({ organizationId }),
        },
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        this.logger.warn(
          `Tenant organization update failed for ${tenantId}: HTTP ${response.status}`,
        );
        return null;
      }

      return (await response.json()) as OrganizationTenantSummary;
    } catch (error) {
      this.logger.warn(`Tenant organization update failed for ${tenantId}`, error);
      return null;
    }
  }
}
