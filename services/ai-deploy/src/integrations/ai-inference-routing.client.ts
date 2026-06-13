import { Injectable, Logger } from "@nestjs/common";
import { deployConfig } from "@/config/deploy.config";

export type MultiRegionRoute = {
  region: string;
  endpoint: string;
  rolloutPercent: number;
  health: string;
};

export type MultiRegionRoutingConfig = {
  tenantId: string;
  modelId: string;
  modelName: string;
  version: string;
  artifactLocation: string;
  routes: MultiRegionRoute[];
};

@Injectable()
export class AiInferenceRoutingClient {
  private readonly logger = new Logger(AiInferenceRoutingClient.name);
  private readonly localRouting = new Map<string, MultiRegionRoutingConfig>();

  async syncMultiRegionRouting(config: MultiRegionRoutingConfig) {
    this.localRouting.set(`${config.tenantId}:${config.modelId}`, config);

    try {
      const response = await fetch(`${deployConfig.aiServiceUrl}/ai/inference/routing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!response.ok) {
        this.logger.warn(`Inference routing sync returned ${response.status}; using local cache.`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Routing sync failed.";
      this.logger.warn(`Inference routing sync unavailable: ${message}`);
    }

    return { synced: true, routing: config };
  }

  getActiveRouting(tenantId: string, modelId: string) {
    return this.localRouting.get(`${tenantId}:${modelId}`) ?? null;
  }
}
