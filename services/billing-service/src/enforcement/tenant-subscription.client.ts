import { Injectable, Logger } from "@nestjs/common";
import { billingConfig } from "@ordella/config";

export type TenantSubscriptionSnapshot = {
  plan: string;
  subscriptionStatus: string | null;
};

@Injectable()
export class TenantSubscriptionClient {
  private readonly logger = new Logger(TenantSubscriptionClient.name);

  async getSubscription(tenantId: string): Promise<TenantSubscriptionSnapshot | null> {
    const baseUrl = billingConfig.tenantServiceUrl ?? process.env.TENANT_SERVICE_URL;
    if (!baseUrl) {
      this.logger.warn("TENANT_SERVICE_URL not configured — skipping subscription lookup");
      return null;
    }

    try {
      const response = await fetch(
        `${baseUrl.replace(/\/$/, "")}/tenants/internal/subscription/${encodeURIComponent(tenantId)}`,
        {
          headers: {
            accept: "application/json",
            "x-internal-service": "billing-service",
          },
        },
      );

      if (!response.ok) {
        return null;
      }

      const body = (await response.json()) as {
        plan?: string;
        subscriptionStatus?: string | null;
      };

      return {
        plan: body.plan ?? "STARTER",
        subscriptionStatus: body.subscriptionStatus ?? null,
      };
    } catch (error) {
      this.logger.warn(
        `Tenant subscription lookup failed for ${tenantId}`,
        error instanceof Error ? error.message : error,
      );
      return null;
    }
  }
}
