import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class BillingServiceClient {
  private readonly logger = new Logger(BillingServiceClient.name);

  private get baseUrl(): string {
    return process.env.BILLING_SERVICE_URL ?? "http://billing-service:3056";
  }

  async recordAiNotesUsageCharge(tenantId: string, quantity: number): Promise<void> {
    try {
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
        this.logger.warn(
          `AI notes usage charge sync failed for ${tenantId} (${response.status}): ${body}`,
        );
      }
    } catch (error) {
      this.logger.warn(
        `AI notes usage charge sync error for ${tenantId}: ${error instanceof Error ? error.message : "unknown"}`,
      );
    }
  }
}
