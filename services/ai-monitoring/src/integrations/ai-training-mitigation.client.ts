import { Injectable, Logger } from "@nestjs/common";
import { monitoringConfig } from "@/config/monitoring.config";

@Injectable()
export class AiTrainingMitigationClient {
  private readonly logger = new Logger(AiTrainingMitigationClient.name);

  async triggerRetraining(modelId: string, headers: Record<string, string>, triggers: string[]) {
    const response = await fetch(
      `${monitoringConfig.aiTrainingServiceUrl}/ai/models/${modelId}/retrain/drift`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ triggers }),
      },
    );
    if (!response.ok) {
      const text = await response.text();
      this.logger.error(`Retraining trigger failed: ${response.status} ${text}`);
      throw new Error("Failed to trigger retraining.");
    }
    return response.json();
  }

  async setRollout(modelId: string, rolloutPercentage: number, headers: Record<string, string>) {
    const response = await fetch(
      `${monitoringConfig.aiTrainingServiceUrl}/ai/models/${modelId}/rollout`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ rolloutPercentage }),
      },
    );
    if (!response.ok) {
      throw new Error("Failed to update rollout percentage.");
    }
    return response.json();
  }

  async rollbackCanary(modelId: string, headers: Record<string, string>) {
    const response = await fetch(
      `${monitoringConfig.aiTrainingServiceUrl}/ai/models/${modelId}/canary/adjust`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: "{}",
      },
    );
    if (!response.ok) {
      const rollback = await this.setRollout(modelId, 0, headers);
      return { rolledBack: true, promotion: rollback };
    }
    return response.json();
  }

  async getModel(modelId: string, headers: Record<string, string>) {
    const response = await fetch(
      `${monitoringConfig.aiTrainingServiceUrl}/ai/models/${modelId}`,
      { headers },
    );
    if (!response.ok) {
      return null;
    }
    return response.json() as Promise<{ modelName: string; version: string }>;
  }
}
