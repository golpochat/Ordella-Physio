import { Injectable, Logger } from "@nestjs/common";
import type { DriftSeverity, DriftType } from "@/models/AIDriftEvent";
import { AiTrainingMitigationClient } from "@/integrations/ai-training-mitigation.client";
import { AiDriftEventRepository } from "@/repositories/drift.repository";

@Injectable()
export class DriftMitigationService {
  private readonly logger = new Logger(DriftMitigationService.name);

  constructor(
    private readonly eventRepository: AiDriftEventRepository,
    private readonly trainingClient: AiTrainingMitigationClient,
  ) {}

  async applyAutomaticMitigation(input: {
    tenantId: string;
    modelId: string;
    severity: DriftSeverity;
    driftType: DriftType;
    headers: Record<string, string>;
  }) {
    if (input.severity === "CRITICAL") {
      return this.rollbackIfIssues(input.tenantId, input.modelId, input.headers, "AUTO_CRITICAL_ROLLBACK");
    }
    if (input.severity === "HIGH") {
      return this.reduceRollout(input.tenantId, input.modelId, 10, input.headers, "AUTO_HIGH_REDUCE_ROLLOUT");
    }
    if (input.severity === "MEDIUM") {
      return this.triggerRetraining(input.tenantId, input.modelId, [input.driftType], input.headers, "AUTO_MEDIUM_RETRAIN");
    }
    return { action: "LOG_ONLY", applied: false };
  }

  async triggerRetraining(
    tenantId: string,
    modelId: string,
    triggers: string[],
    headers: Record<string, string>,
    mitigationAction = "MANUAL_RETRAIN",
  ) {
    const result = await this.trainingClient.triggerRetraining(modelId, headers, triggers);
    await this.markLatestUnresolved(tenantId, modelId, mitigationAction);
    this.logger.log(`Retraining triggered for model ${modelId}`);
    return { action: mitigationAction, applied: true, result };
  }

  async rollbackIfIssues(
    tenantId: string,
    modelId: string,
    headers: Record<string, string>,
    mitigationAction = "MANUAL_ROLLBACK",
  ) {
    const result = await this.trainingClient.setRollout(modelId, 0, headers);
    await this.markLatestUnresolved(tenantId, modelId, mitigationAction);
    this.logger.warn(`Rollback applied for model ${modelId}`);
    return { action: mitigationAction, applied: true, result };
  }

  async reduceRollout(
    tenantId: string,
    modelId: string,
    rolloutPercentage: number,
    headers: Record<string, string>,
    mitigationAction = "MANUAL_REDUCE_ROLLOUT",
  ) {
    const result = await this.trainingClient.setRollout(modelId, rolloutPercentage, headers);
    await this.markLatestUnresolved(tenantId, modelId, mitigationAction);
    return { action: mitigationAction, applied: true, result };
  }

  async resolveEvent(tenantId: string, eventId: string, mitigationAction?: string) {
    const event = await this.eventRepository.findById(tenantId, eventId);
    if (!event) {
      return null;
    }
    await this.eventRepository.update(tenantId, eventId, {
      resolvedAt: new Date(),
      mitigationAction: mitigationAction ?? "RESOLVED_MANUALLY",
    });
    const updated = await this.eventRepository.findById(tenantId, eventId);
    return updated;
  }

  private async markLatestUnresolved(tenantId: string, modelId: string, mitigationAction: string) {
    const unresolved = await this.eventRepository.listUnresolved(tenantId, modelId);
    const latest = unresolved[0];
    if (!latest) {
      return;
    }
    await this.eventRepository.update(tenantId, latest.id, { mitigationAction });
  }
}
