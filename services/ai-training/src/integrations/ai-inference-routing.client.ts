import { Injectable, Logger } from "@nestjs/common";
import { trainingConfig } from "@/config/training.config";

export type InferenceRoutingConfig = {
  tenantId: string;
  modelId: string;
  modelName: string;
  version: string;
  stage: "STAGING" | "PRODUCTION" | "DEPRECATED";
  rolloutPercentage: number;
  fileLocation: string;
};

@Injectable()
export class AiInferenceRoutingClient {
  private readonly logger = new Logger(AiInferenceRoutingClient.name);
  private readonly localRouting = new Map<string, InferenceRoutingConfig>();

  async syncRouting(config: InferenceRoutingConfig) {
    this.localRouting.set(`${config.tenantId}:${config.modelId}`, config);

    try {
      const response = await fetch(`${trainingConfig.aiServiceUrl}/ai/inference/routing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!response.ok) {
        this.logger.warn(
          `Inference routing sync returned ${response.status}; using local routing cache.`,
        );
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Routing sync failed.";
      this.logger.warn(`Inference routing sync unavailable: ${message}`);
    }

    return { synced: true, routing: config };
  }

  getActiveRouting(tenantId: string) {
    return [...this.localRouting.values()].filter(
      (entry) => entry.tenantId === tenantId && entry.stage === "PRODUCTION",
    );
  }
}
