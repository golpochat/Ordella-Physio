import { Injectable, Logger } from "@nestjs/common";
import {
  PROVISIONING_FAIL_HEADER,
  type ProvisioningFailStage,
} from "@ordella/shared";

type ProvisionTenantBillingInput = {
  tenantId: string;
  name: string;
  slug: string;
};

type ProvisionTenantBillingResult = {
  tenantId: string;
  organizationId: string | null;
  stripeCustomerId: string;
  billingEntity: "tenant" | "organization";
};

type RollbackProvisioningInput = {
  tenantId?: string;
  organizationId?: string;
  stripeCustomerId?: string;
  billingEntity?: "tenant" | "organization";
};

type ProvisioningBillingStatus = {
  tenantId: string;
  organizationId: string | null;
  hasTenantBillingAccount: boolean;
  hasOrganizationBillingAccount: boolean;
  tenantStripeCustomerId: string | null;
  organizationStripeCustomerId: string | null;
  tenantSubscriptionId: string | null;
  organizationSubscriptionId: string | null;
};

@Injectable()
export class BillingServiceClient {
  private readonly logger = new Logger(BillingServiceClient.name);

  private get baseUrl(): string {
    return process.env.BILLING_SERVICE_URL ?? "http://billing-service:3056";
  }

  async provisionTenantBilling(
    input: ProvisionTenantBillingInput,
    options?: { failAt?: ProvisioningFailStage },
  ): Promise<ProvisionTenantBillingResult> {
    const headers: Record<string, string> = {
      "content-type": "application/json",
      "x-internal-service": "tenant-service",
    };

    if (options?.failAt) {
      headers[PROVISIONING_FAIL_HEADER] = options.failAt;
    }

    const response = await fetch(`${this.baseUrl}/billing/internal/provision-tenant`, {
      method: "POST",
      headers,
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const body = await response.text();
      this.logger.error(`Billing provisioning failed for ${input.tenantId} (${response.status}): ${body}`);
      throw new Error(`Billing provisioning failed (${response.status})`);
    }

    return (await response.json()) as ProvisionTenantBillingResult;
  }

  async rollbackProvisioning(input: RollbackProvisioningInput): Promise<void> {
    const response = await fetch(`${this.baseUrl}/billing/internal/provisioning-rollback`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "x-internal-service": "tenant-service",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const body = await response.text();
      this.logger.warn(`Billing rollback failed (${response.status}): ${body}`);
    }
  }

  async getProvisioningStatus(tenantId: string): Promise<ProvisioningBillingStatus | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/billing/internal/provisioning-status/${encodeURIComponent(tenantId)}`,
        { headers: { accept: "application/json" } },
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        return null;
      }

      return (await response.json()) as ProvisioningBillingStatus;
    } catch (error) {
      this.logger.warn(`Billing provisioning status lookup failed for ${tenantId}`, error);
      return null;
    }
  }

  async recordAiNotesUsageCharge(tenantId: string, quantity: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/billing/internal/ai-notes-usage`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-internal-service": "tenant-service",
      },
      body: JSON.stringify({ tenantId, quantity }),
    });

    if (!response.ok) {
      const body = await response.text();
      this.logger.error(
        `AI notes usage charge sync failed for ${tenantId} (${response.status}): ${body}`,
      );
      throw new Error(`AI notes Stripe usage sync failed (${response.status})`);
    }
  }
}
