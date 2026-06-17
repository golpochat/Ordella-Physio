import { Injectable, Logger } from "@nestjs/common";

export type OrganizationSummary = {
  id: string;
  name: string;
  code: string;
  billingModel?: "tenant-level" | "organization-level";
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  subscriptionStatus?: string | null;
};

export type CreateOrganizationInternalPayload = {
  organizationName: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  billingModel: "tenant-level" | "organization-level";
  description?: string;
};

@Injectable()
export class OrganizationServiceClient {
  private readonly logger = new Logger(OrganizationServiceClient.name);

  private get baseUrl(): string {
    return process.env.ORGANIZATION_SERVICE_URL ?? "http://organization-service:3066";
  }

  private mapOrganization(
    payload: OrganizationSummary & { organizationCode?: string },
  ): OrganizationSummary {
    return {
      id: payload.id,
      name: payload.name,
      code: payload.code ?? payload.organizationCode ?? "",
      billingModel: payload.billingModel,
      stripeCustomerId: payload.stripeCustomerId ?? null,
      stripeSubscriptionId: payload.stripeSubscriptionId ?? null,
      subscriptionStatus: payload.subscriptionStatus ?? null,
    };
  }

  async getOrganizationById(organizationId: string): Promise<OrganizationSummary | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/organizations/internal/${encodeURIComponent(organizationId)}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        this.logger.warn(`Organization lookup failed for ${organizationId}: HTTP ${response.status}`);
        return null;
      }

      const payload = (await response.json()) as OrganizationSummary & { organizationCode?: string };
      if (!payload?.id) {
        return null;
      }

      return this.mapOrganization(payload);
    } catch (error) {
      this.logger.warn(`Organization lookup failed for ${organizationId}`, error);
      return null;
    }
  }

  async getOrganizationBillingById(organizationId: string): Promise<OrganizationSummary | null> {
    return this.getOrganizationById(organizationId);
  }

  async createOrganizationInternal(
    payload: CreateOrganizationInternalPayload,
  ): Promise<OrganizationSummary | null> {
    try {
      const response = await fetch(`${this.baseUrl}/organizations/internal/create`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        this.logger.warn(`Organization create failed: HTTP ${response.status}`);
        return null;
      }

      const body = (await response.json()) as OrganizationSummary & {
        organizationCode?: string;
        organization?: OrganizationSummary & { organizationCode?: string };
      };

      const organization = body.organization ?? body;
      if (!organization?.id) {
        return null;
      }

      return this.mapOrganization(organization);
    } catch (error) {
      this.logger.warn("Organization create failed", error);
      return null;
    }
  }

  async linkTenantToOrganization(organizationId: string, tenantId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/organizations/internal/${encodeURIComponent(organizationId)}/tenants/${encodeURIComponent(tenantId)}/link`,
        {
          method: "POST",
          headers: { accept: "application/json" },
        },
      );

      if (!response.ok) {
        this.logger.warn(
          `Organization tenant link failed for org ${organizationId} tenant ${tenantId}: HTTP ${response.status}`,
        );
        return false;
      }

      return true;
    } catch (error) {
      this.logger.warn(`Organization tenant link failed for org ${organizationId} tenant ${tenantId}`, error);
      return false;
    }
  }

  async unlinkTenantFromOrganization(organizationId: string, tenantId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/organizations/internal/${encodeURIComponent(organizationId)}/tenants/${encodeURIComponent(tenantId)}/unlink`,
        {
          method: "POST",
          headers: { accept: "application/json" },
        },
      );

      if (!response.ok) {
        this.logger.warn(
          `Organization tenant unlink failed for org ${organizationId} tenant ${tenantId}: HTTP ${response.status}`,
        );
        return false;
      }

      return true;
    } catch (error) {
      this.logger.warn(
        `Organization tenant unlink failed for org ${organizationId} tenant ${tenantId}`,
        error,
      );
      return false;
    }
  }

  async rollbackOrganization(organizationId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/organizations/internal/${encodeURIComponent(organizationId)}/provisioning-rollback`,
        {
          method: "DELETE",
          headers: { accept: "application/json" },
        },
      );

      if (!response.ok) {
        this.logger.warn(`Organization rollback failed for ${organizationId}: HTTP ${response.status}`);
        return false;
      }

      return true;
    } catch (error) {
      this.logger.warn(`Organization rollback failed for ${organizationId}`, error);
      return false;
    }
  }
}
