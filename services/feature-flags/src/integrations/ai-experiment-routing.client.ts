import { Injectable, Logger } from "@nestjs/common";
import { featureFlagsConfig } from "@/config/feature-flags.config";
import type { ExperimentVariant } from "@/models/Experiment";

export type ModelExperimentConfig = {
  tenantId: string;
  experimentId: string;
  modelKey: string;
  variants: ExperimentVariant[];
  status: "RUNNING" | "PAUSED" | "COMPLETED" | "DRAFT";
};

@Injectable()
export class AiExperimentRoutingClient {
  private readonly logger = new Logger(AiExperimentRoutingClient.name);
  private readonly localExperiments = new Map<string, ModelExperimentConfig>();

  async syncModelExperiment(config: ModelExperimentConfig) {
    const key = `${config.tenantId}:${config.modelKey}`;
    if (config.status === "RUNNING") {
      this.localExperiments.set(key, config);
    } else {
      this.localExperiments.delete(key);
    }

    try {
      const response = await fetch(`${featureFlagsConfig.aiServiceUrl}/ai/inference/experiments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!response.ok) {
        this.logger.warn(`Experiment routing sync returned ${response.status}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sync failed.";
      this.logger.warn(`Experiment routing sync unavailable: ${message}`);
    }

    return { synced: true, config };
  }

  getActiveExperiment(tenantId: string, modelKey: string) {
    return this.localExperiments.get(`${tenantId}:${modelKey}`) ?? null;
  }
}
