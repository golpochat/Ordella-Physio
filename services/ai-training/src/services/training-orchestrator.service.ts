import { Injectable, Logger } from "@nestjs/common";
import { trainingConfig } from "@/config/training.config";
import { AiDatasetClient } from "@/integrations/ai-dataset.client";
import { toTrainingJobRecord, type TrainingLogEntry } from "@/models/AITrainingJob";
import type { TrainingCurvePoint } from "@/models/AITrainingExperiment";
import { AiTrainingJobRepository } from "@/repositories/ai-training.repository";
import { CheckpointService } from "@/services/checkpoint.service";
import { DistributedTrainingService } from "@/services/distributed-training.service";
import { ExperimentTrackingService } from "@/services/experiment-tracking.service";
import {
  HyperparameterTuningService,
  type HyperparameterTuningConfig,
} from "@/services/hyperparameter-tuning.service";
import { ModelRegistryService } from "@/services/model-registry.service";
import { TrainingLogStreamService } from "@/services/training-log-stream.service";
import { TrainingMetricsStreamService } from "@/services/training-metrics-stream.service";
import { TrainingNotificationService } from "@/services/training-notification.service";
import { TrainingPreprocessorService } from "@/services/training-preprocessor.service";
import { TrainingProviderService } from "@/services/training-provider.service";

@Injectable()
export class TrainingOrchestratorService {
  private readonly logger = new Logger(TrainingOrchestratorService.name);

  constructor(
    private readonly jobRepository: AiTrainingJobRepository,
    private readonly datasetClient: AiDatasetClient,
    private readonly preprocessor: TrainingPreprocessorService,
    private readonly providerService: TrainingProviderService,
    private readonly registryService: ModelRegistryService,
    private readonly logStreamService: TrainingLogStreamService,
    private readonly metricsStreamService: TrainingMetricsStreamService,
    private readonly experimentService: ExperimentTrackingService,
    private readonly tuningService: HyperparameterTuningService,
    private readonly distributedService: DistributedTrainingService,
    private readonly checkpointService: CheckpointService,
    private readonly notificationService: TrainingNotificationService,
  ) {}

  async executeJob(
    jobId: string,
    requestHeaders: Record<string, string>,
    resumeFromCheckpoint?: number,
  ) {
    const job = await this.jobRepository.updateById(jobId, { status: "RUNNING" });
    const record = toTrainingJobRecord(job);

    this.notificationService.notifyMilestone({
      tenantId: record.tenantId,
      trainingJobId: jobId,
      milestone: "JOB_STARTED",
      message: resumeFromCheckpoint
        ? `Resumed from checkpoint ${resumeFromCheckpoint}`
        : "Training job started",
    });

    void this.recordSecurityAudit(record.tenantId, {
      action: "TRAINING",
      userId: record.createdByUserId,
      modelId: record.baseModel,
      requestMetadata: { jobId, status: "RUNNING", datasetId: record.datasetId },
    });

    void this.recordObservability(record.tenantId, {
      operation: "training.start",
      modelId: record.baseModel,
      metadata: { jobId, datasetId: record.datasetId },
    });

    try {
      const tuningConfig = this.parseTuningConfig(record.trainingConfig);
      const candidates = tuningConfig.enabled
        ? this.tuningService.generateSearchSpace(tuningConfig)
        : [{ trialNumber: 1, hyperparameters: record.hyperparameters }];

      const scheduled = this.tuningService.scheduleExperimentRuns(candidates);
      const experimentResults: Array<{ experimentId: string; metrics: Record<string, unknown> }> =
        [];

      for (const run of scheduled) {
        const experiment = await this.experimentService.createExperiment({
          tenantId: record.tenantId,
          trainingJobId: jobId,
          experimentName: run.experimentName,
          hyperparameters: run.hyperparameters,
          createdByUserId: record.createdByUserId,
        });

        const result = await this.runExperimentTraining({
          jobId,
          record,
          experimentId: experiment.id,
          hyperparameters: run.hyperparameters,
          requestHeaders,
          resumeFromCheckpoint,
        });
        experimentResults.push({ experimentId: experiment.id, metrics: result.metrics });
        await this.experimentService.finalizeExperiment(
          experiment.id,
          result.success ? "COMPLETED" : "FAILED",
        );
        this.notificationService.notifyMilestone({
          tenantId: record.tenantId,
          trainingJobId: jobId,
          milestone: "EXPERIMENT_COMPLETED",
          message: `Experiment ${run.experimentName} completed`,
          metadata: { experimentId: experiment.id },
        });
      }

      if (tuningConfig.enabled) {
        const evaluation = this.tuningService.evaluateResults(experimentResults);
        await this.appendLog(jobId, "info", `Hyperparameter tuning best trial: ${evaluation.bestExperimentId}`);
        this.notificationService.notifyMilestone({
          tenantId: record.tenantId,
          trainingJobId: jobId,
          milestone: "TUNING_COMPLETED",
          message: "Hyperparameter tuning completed",
          metadata: evaluation,
        });
      }

      const best = this.tuningService.evaluateResults(experimentResults);
      const bestMetrics =
        experimentResults.find((entry) => entry.experimentId === best.bestExperimentId)?.metrics ??
        experimentResults[0]?.metrics ??
        {};

      await this.jobRepository.updateById(jobId, {
        status: "COMPLETED",
        metrics: bestMetrics as never,
      });
      await this.appendLog(jobId, "info", "Training job completed");
      this.notificationService.notifyMilestone({
        tenantId: record.tenantId,
        trainingJobId: jobId,
        milestone: "JOB_COMPLETED",
        message: "Training job completed",
      });

      return toTrainingJobRecord((await this.jobRepository.findById(record.tenantId, jobId))!);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Training failed.";
      this.logger.error(`Training job ${jobId} failed: ${message}`);
      await this.appendLog(jobId, "error", message);
      await this.jobRepository.updateById(jobId, { status: "FAILED" });
      this.notificationService.notifyMilestone({
        tenantId: record.tenantId,
        trainingJobId: jobId,
        milestone: "JOB_FAILED",
        message,
      });
      throw error;
    }
  }

  private async runExperimentTraining(input: {
    jobId: string;
    record: ReturnType<typeof toTrainingJobRecord>;
    experimentId: string;
    hyperparameters: Record<string, unknown>;
    requestHeaders: Record<string, string>;
    resumeFromCheckpoint?: number;
  }) {
    const { jobId, record, experimentId, hyperparameters, requestHeaders, resumeFromCheckpoint } =
      input;

    const mergedRecord = { ...record, hyperparameters };
    const resources = this.distributedService.allocateResources(mergedRecord);
    await this.distributedService.startDistributedTraining(mergedRecord, resources);
    const distributedMetrics = this.distributedService.collectMetrics(mergedRecord, resources);

    await this.appendLog(
      jobId,
      "info",
      `Experiment ${experimentId} using ${resources.mode} (${resources.gpuCount} GPUs)`,
    );

    const records = await this.datasetClient.listVersionRecords(
      record.datasetId,
      record.datasetVersionId,
      requestHeaders,
    );

    const trainingFile = this.preprocessor.generateTrainingFile(
      records,
      record.trainingProvider,
      record.modelType,
    );

    const started = await this.providerService.startTrainingJob(mergedRecord, trainingFile);
    await this.jobRepository.updateById(jobId, {
      providerJobId: started.providerJobId,
      trainingFileLocation: trainingFile.fileName,
    });

    const curve: TrainingCurvePoint[] = [];
    let attempts = 0;
    let startEpoch = resumeFromCheckpoint ?? 0;

    while (attempts < trainingConfig.maxPollAttempts) {
      await new Promise((resolve) => setTimeout(resolve, trainingConfig.pollIntervalMs));
      attempts += 1;

      const status = this.providerService.getTrainingStatus(started.providerJobId);
      const providerLogs = this.providerService.fetchTrainingLogs(started.providerJobId);
      const providerMetrics: Record<string, unknown> = {
        ...this.providerService.fetchTrainingMetrics(started.providerJobId),
        ...distributedMetrics,
        hyperparameters,
      };

      const epoch = Number(providerMetrics.epochs ?? 0);
      if (epoch > startEpoch) {
        const point: TrainingCurvePoint = {
          epoch,
          loss: Number(providerMetrics.loss ?? 0),
          accuracy: Number(providerMetrics.accuracy ?? 0),
          perplexity: Number(providerMetrics.perplexity ?? 0) || undefined,
        };
        curve.push(point);

        const checkpointNumber = await this.checkpointService.nextCheckpointNumber(jobId);
        await this.checkpointService.saveCheckpoint({
          tenantId: record.tenantId,
          trainingJobId: jobId,
          experimentId,
          checkpointNumber,
          metricsSnapshot: providerMetrics,
        });
        this.notificationService.notifyMilestone({
          tenantId: record.tenantId,
          trainingJobId: jobId,
          milestone: "CHECKPOINT_SAVED",
          message: `Checkpoint ${checkpointNumber} saved`,
          metadata: { checkpointNumber, experimentId },
        });
      }

      await this.mergeProviderState(jobId, providerLogs, providerMetrics);
      await this.experimentService.updateMetrics(experimentId, providerMetrics, curve);

      if (status.status === "completed") {
        const artifact = this.providerService.downloadModel(started.providerJobId);
        const modelName =
          typeof record.trainingConfig.modelName === "string"
            ? record.trainingConfig.modelName
            : `${record.baseModel}-finetuned`;
        const version =
          typeof record.trainingConfig.version === "string"
            ? record.trainingConfig.version
            : `v${Date.now()}`;

        const registered = await this.registryService.registerFromTrainingJob({
          tenantId: record.tenantId,
          trainingJobId: jobId,
          modelName,
          version,
          baseModel: record.baseModel,
          trainingProvider: record.trainingProvider,
          fileLocation: artifact.location,
          metadata: { metrics: providerMetrics, experimentId, hyperparameters },
        });

        await this.jobRepository.updateById(jobId, { outputModelId: registered.id });
        return { success: true, metrics: providerMetrics };
      }

      if (status.status === "failed") {
        throw new Error(status.error ?? "Provider training failed.");
      }
    }

    throw new Error("Training timed out while polling provider status.");
  }

  private parseTuningConfig(trainingConfig: Record<string, unknown>): HyperparameterTuningConfig {
    const tuning = (trainingConfig.hyperparameterTuning ?? {}) as Record<string, unknown>;
    return {
      enabled: Boolean(tuning.enabled),
      strategy: (typeof tuning.strategy === "string" ? tuning.strategy : "GRID") as
        | "GRID"
        | "RANDOM"
        | "BAYESIAN",
      searchSpace:
        tuning.searchSpace && typeof tuning.searchSpace === "object"
          ? (tuning.searchSpace as Record<string, unknown>)
          : {},
      maxTrials: typeof tuning.maxTrials === "number" ? tuning.maxTrials : 5,
    };
  }

  private async appendLog(jobId: string, level: TrainingLogEntry["level"], message: string) {
    const job = await this.jobRepository.findByIdOnly(jobId);
    if (!job) {
      return;
    }
    const existing = Array.isArray(job.logs) ? (job.logs as TrainingLogEntry[]) : [];
    const entry: TrainingLogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
    };
    const logs = [...existing, entry];
    await this.jobRepository.updateById(jobId, { logs: logs as never });
    this.logStreamService.publishLogs(jobId, logs);
  }

  private async mergeProviderState(
    jobId: string,
    providerLogs: TrainingLogEntry[],
    providerMetrics: Record<string, unknown>,
  ) {
    const job = await this.jobRepository.findByIdOnly(jobId);
    if (!job) {
      return;
    }
    const existing = Array.isArray(job.logs) ? (job.logs as TrainingLogEntry[]) : [];
    const merged = [...existing];

    for (const log of providerLogs) {
      const signature = `${log.timestamp}:${log.message}`;
      if (!merged.some((entry) => `${entry.timestamp}:${entry.message}` === signature)) {
        merged.push(log);
      }
    }

    await this.jobRepository.updateById(jobId, {
      logs: merged as never,
      metrics: providerMetrics as never,
    });
    this.logStreamService.publishLogs(jobId, merged);
    this.metricsStreamService.publishMetrics(jobId, providerMetrics);
  }

  private async recordObservability(tenantId: string, event: {
    operation: string;
    modelId?: string;
    durationMs?: number;
    metadata?: Record<string, unknown>;
  }) {
    const observabilityUrl = process.env.AI_OBSERVABILITY_SERVICE_URL ?? "http://localhost:3083";
    try {
      await fetch(`${observabilityUrl}/ai/observability/internal/batch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": tenantId,
          "x-internal-service": "ai-training",
        },
        body: JSON.stringify({
          trace: {
            service: "training",
            operation: event.operation,
            durationMs: event.durationMs ?? 0,
            status: "OK",
            metadata: event.metadata,
          },
          log: {
            level: "INFO",
            service: "training",
            message: `Training event: ${event.operation}`,
            metadata: { modelId: event.modelId, ...event.metadata },
          },
          metrics: event.modelId
            ? [{ modelId: event.modelId, metricType: "throughput", value: 1 }]
            : undefined,
        }),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Observability record failed";
      this.logger.debug(`Training observability unavailable: ${message}`);
    }
  }

  private async recordSecurityAudit(tenantId: string, event: {
    action: "TRAINING" | "DEPLOYMENT" | "DATASET";
    userId?: string;
    modelId?: string;
    requestMetadata?: Record<string, unknown>;
  }) {
    const securityUrl = process.env.AI_SECURITY_SERVICE_URL ?? "http://localhost:3082";
    try {
      await fetch(`${securityUrl}/ai/security/internal/audit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": tenantId,
          "x-internal-service": "ai-training",
        },
        body: JSON.stringify({ ...event, tenantId }),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Security audit failed";
      this.logger.debug(`Training security audit unavailable: ${message}`);
    }
  }
}
