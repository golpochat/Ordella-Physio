import { Injectable, Logger } from "@nestjs/common";

export type OrganizationBillingSyncPayload = {
  organizationId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string | null;
  subscriptionStatus?: string;
};

@Injectable()
export class OrganizationSyncClient {
  private readonly logger = new Logger(OrganizationSyncClient.name);

  async syncBilling(payload: OrganizationBillingSyncPayload): Promise<void> {
    const baseUrl = process.env.ORGANIZATION_SERVICE_URL ?? "http://organization-service:3066";
    if (!baseUrl) {
      this.logger.warn("ORGANIZATION_SERVICE_URL not configured — skipping organization billing sync");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/organizations/internal/billing-sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-Service": "billing-service",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.text();
        this.logger.error(`Organization billing sync failed (${response.status}): ${body}`);
      }
    } catch (error) {
      this.logger.error(
        `Organization billing sync error: ${error instanceof Error ? error.message : "unknown"}`,
      );
    }
  }
}
