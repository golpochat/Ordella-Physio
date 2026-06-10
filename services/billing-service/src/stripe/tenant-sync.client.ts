import { Injectable, Logger } from "@nestjs/common";
import { billingConfig } from "@ordella/config";

export type TenantBillingSyncPayload = {
  tenantId: string;
  stripeCustomerId: string;
  stripeSubscriptionId?: string | null;
  plan?: string;
  subscriptionStatus?: string;
};

@Injectable()
export class TenantSyncClient {
  private readonly logger = new Logger(TenantSyncClient.name);

  async syncBilling(payload: TenantBillingSyncPayload): Promise<void> {
    const baseUrl = billingConfig.tenantServiceUrl ?? process.env.TENANT_SERVICE_URL;
    if (!baseUrl) {
      this.logger.warn("TENANT_SERVICE_URL not configured — skipping tenant billing sync");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/tenants/internal/billing-sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-Service": "billing-service",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.text();
        this.logger.error(`Tenant billing sync failed (${response.status}): ${body}`);
      }
    } catch (error) {
      this.logger.error(
        `Tenant billing sync error: ${error instanceof Error ? error.message : "unknown"}`,
      );
    }
  }
}
