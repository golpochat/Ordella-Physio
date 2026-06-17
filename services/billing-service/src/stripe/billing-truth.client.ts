import { Injectable, Logger } from "@nestjs/common";
import type { BillingTruthContext } from "@ordella/shared";

@Injectable()
export class BillingTruthClient {
  private readonly logger = new Logger(BillingTruthClient.name);

  async getContext(tenantId: string): Promise<BillingTruthContext | null> {
    const baseUrl = process.env.TENANT_SERVICE_URL ?? "http://tenant-service:3052";

    try {
      const response = await fetch(
        `${baseUrl}/tenants/internal/billing-context/${encodeURIComponent(tenantId)}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (!response.ok) {
        this.logger.warn(`Billing context lookup failed for ${tenantId}: HTTP ${response.status}`);
        return null;
      }

      return (await response.json()) as BillingTruthContext;
    } catch (error) {
      this.logger.warn(`Billing context lookup failed for ${tenantId}`, error);
      return null;
    }
  }
}
