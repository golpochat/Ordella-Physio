import { Injectable, Logger } from "@nestjs/common";
import { aiGatewayConfig } from "@/config/ai-gateway.config";

@Injectable()
export class AiCostSyncClient {
  private readonly logger = new Logger(AiCostSyncClient.name);
  private readonly costServiceUrl = aiGatewayConfig.aiCostServiceUrl;

  async recordCostEvent(event: {
    tenantId: string;
    modelId?: string;
    feature?: string;
    tokensPrompt?: number;
    tokensCompletion?: number;
    metadata?: Record<string, unknown>;
  }) {
    try {
      const response = await fetch(`${this.costServiceUrl}/ai/cost/internal/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": event.tenantId,
          "x-internal-service": "ai-gateway",
        },
        body: JSON.stringify(event),
      });
      if (!response.ok) {
        this.logger.debug(`Cost sync returned ${response.status}`);
        return this.fallbackEstimate(event);
      }
      return response.json() as Promise<{ cost: number; eventId: string }>;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Cost sync failed";
      this.logger.debug(`Cost sync unavailable: ${message}`);
      return this.fallbackEstimate(event);
    }
  }

  private fallbackEstimate(event: {
    tokensPrompt?: number;
    tokensCompletion?: number;
  }) {
    const total = (event.tokensPrompt ?? 0) + (event.tokensCompletion ?? 0);
    return { cost: (total / 1000) * aiGatewayConfig.defaultCostPer1kTokens, eventId: null };
  }
}
