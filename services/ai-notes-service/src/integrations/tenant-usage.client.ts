import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class TenantUsageClient {
  private readonly logger = new Logger(TenantUsageClient.name);

  private get baseUrl(): string | undefined {
    return process.env.TENANT_SERVICE_URL;
  }

  async incrementAiNotesUsage(tenantId: string, amount = 1): Promise<void> {
    const baseUrl = this.baseUrl;
    if (!baseUrl) {
      this.logger.warn("TENANT_SERVICE_URL not configured — skipping AI notes usage sync");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/tenants/internal/ai-notes-usage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-Service": "ai-notes-service",
        },
        body: JSON.stringify({ tenantId, amount }),
      });

      if (!response.ok) {
        const body = await response.text();
        this.logger.warn(`AI notes usage sync failed (${response.status}): ${body}`);
      }
    } catch (error) {
      this.logger.warn(
        `AI notes usage sync error: ${error instanceof Error ? error.message : "unknown"}`,
      );
    }
  }
}
