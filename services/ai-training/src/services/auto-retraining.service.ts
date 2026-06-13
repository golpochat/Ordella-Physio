import { Injectable, Logger } from "@nestjs/common";
import type { EvaluationMetrics } from "@/models/AIModelEvaluation";
import { AiModelRegistryRepository, AiTrainingJobRepository } from "@/repositories/ai-training.repository";
import { TrainingNotificationService } from "@/services/training-notification.service";
import { TrainingQueueService } from "@/workers/training.worker";
import { modelNotFoundError } from "@/utils/training-errors";

export type RetrainingTrigger =
  | "DATA_DRIFT"
  | "PERFORMANCE_DROP"
  | "BIAS_INCREASE"
  | "SAFETY_DROP"
  | "DATA"
  | "CONCEPT"
  | "EMBEDDING"
  | "PERFORMANCE"
  | "MANUAL";

@Injectable()
export class AutoRetrainingService {
  private readonly logger = new Logger(AutoRetrainingService.name);

  constructor(
    private readonly registryRepository: AiModelRegistryRepository,
    private readonly jobRepository: AiTrainingJobRepository,
    private readonly notificationService: TrainingNotificationService,
    private readonly queueService: TrainingQueueService,
  ) {}

  async evaluateRetrainingTriggers(input: {
    tenantId: string;
    modelId: string;
    metrics: EvaluationMetrics;
    requestHeaders: Record<string, string>;
  }) {
    const triggers: RetrainingTrigger[] = [];

    if (await this.checkDataDrift(input.tenantId, input.modelId)) {
      triggers.push("DATA_DRIFT");
    }
    if (input.metrics.accuracy < 0.7) {
      triggers.push("PERFORMANCE_DROP");
    }
    if (
      input.metrics.biasScores.gender > 0.35 ||
      input.metrics.biasScores.age > 0.35 ||
      input.metrics.biasScores.ethnicity > 0.35
    ) {
      triggers.push("BIAS_INCREASE");
    }
    if (
      input.metrics.hallucinationRate > 0.2 ||
      input.metrics.toxicityScore > 0.05 ||
      input.metrics.piiLeakageScore > 0.08
    ) {
      triggers.push("SAFETY_DROP");
    }

    if (!triggers.length) {
      return { triggered: false, triggers: [] as RetrainingTrigger[] };
    }

    const job = await this.createRetrainingJob({
      tenantId: input.tenantId,
      modelId: input.modelId,
      triggers,
      requestHeaders: input.requestHeaders,
    });

    return { triggered: true, triggers, trainingJobId: job.id };
  }

  async checkDataDrift(tenantId: string, modelId: string) {
    const model = await this.registryRepository.findById(tenantId, modelId);
    if (!model) {
      return false;
    }
    const sourceJob = await this.jobRepository.findById(tenantId, model.trainingJobId);
    if (!sourceJob) {
      return false;
    }
    const driftScore = Number((sourceJob.metrics as { driftScore?: number }).driftScore ?? 0.12);
    return driftScore > 0.18;
  }

  async createRetrainingJob(input: {
    tenantId: string;
    modelId: string;
    triggers: RetrainingTrigger[];
    requestHeaders: Record<string, string>;
  }) {
    const model = await this.registryRepository.findById(input.tenantId, input.modelId);
    if (!model) {
      throw modelNotFoundError();
    }

    const sourceJob = await this.jobRepository.findById(input.tenantId, model.trainingJobId);
    if (!sourceJob) {
      throw modelNotFoundError("Source training job not found.");
    }

    const job = await this.jobRepository.create({
      tenantId: input.tenantId,
      datasetId: sourceJob.datasetId,
      datasetVersionId: sourceJob.datasetVersionId,
      modelType: sourceJob.modelType,
      baseModel: model.baseModel,
      trainingProvider: sourceJob.trainingProvider,
      status: "QUEUED",
      hyperparameters: sourceJob.hyperparameters as never,
      trainingConfig: {
        ...(sourceJob.trainingConfig as Record<string, unknown>),
        autoRetraining: {
          enabled: true,
          triggers: input.triggers,
          parentModelId: input.modelId,
          parentTrainingJobId: sourceJob.id,
        },
      } as never,
      createdByUserId: sourceJob.createdByUserId,
    });

    await this.queueService.enqueueTrainingJob({
      jobId: job.id,
      tenantId: input.tenantId,
      requestHeaders: input.requestHeaders,
    });

    this.notificationService.notifyMilestone({
      tenantId: input.tenantId,
      trainingJobId: job.id,
      milestone: "JOB_QUEUED",
      message: `Auto-retraining triggered for model ${input.modelId}`,
      metadata: { triggers: input.triggers, parentModelId: input.modelId },
    });

    this.logger.log(
      `Auto-retraining job ${job.id} created for model ${input.modelId} triggers=${input.triggers.join(",")}`,
    );

    return job;
  }

  async triggerFromDriftEvent(input: {
    tenantId: string;
    modelId: string;
    triggers: string[];
    requestHeaders: Record<string, string>;
  }) {
    const mapped = input.triggers.map((trigger) => {
      if (trigger === "DATA") {
        return "DATA_DRIFT" as RetrainingTrigger;
      }
      if (trigger === "PERFORMANCE") {
        return "PERFORMANCE_DROP" as RetrainingTrigger;
      }
      return trigger as RetrainingTrigger;
    });

    const job = await this.createRetrainingJob({
      tenantId: input.tenantId,
      modelId: input.modelId,
      triggers: mapped,
      requestHeaders: input.requestHeaders,
    });

    return { triggered: true, trainingJobId: job.id, triggers: mapped };
  }
}
