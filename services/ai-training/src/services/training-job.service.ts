import { Injectable } from "@nestjs/common";
import { toTrainingJobRecord } from "@/models/AITrainingJob";
import { AiTrainingJobRepository } from "@/repositories/ai-training.repository";
import { TrainingQueueService } from "@/workers/training.worker";
import { trainingJobNotFoundError } from "@/utils/training-errors";
import { validateCreateTrainingJob } from "@/validators/training.validator";

@Injectable()
export class TrainingJobService {
  constructor(
    private readonly jobRepository: AiTrainingJobRepository,
    private readonly queueService: TrainingQueueService,
  ) {}

  async createJob(
    tenantId: string,
    body: Record<string, unknown>,
    userId: string,
    requestHeaders: Record<string, string>,
  ) {
    const payload = validateCreateTrainingJob(body);
    const trainingConfig = {
      ...payload.trainingConfig,
      ...(payload.hyperparameterTuning
        ? { hyperparameterTuning: payload.hyperparameterTuning }
        : {}),
    };

    const job = await this.jobRepository.create({
      tenantId,
      datasetId: payload.datasetId,
      datasetVersionId: payload.datasetVersionId,
      modelType: payload.modelType,
      baseModel: payload.baseModel,
      trainingProvider: payload.trainingProvider,
      status: "QUEUED",
      hyperparameters: payload.hyperparameters as never,
      trainingConfig: trainingConfig as never,
      createdByUserId: userId,
    });

    await this.queueService.enqueueTrainingJob({
      jobId: job.id,
      tenantId,
      requestHeaders,
    });

    return toTrainingJobRecord(job);
  }

  async listJobs(tenantId: string) {
    const jobs = await this.jobRepository.listByTenant(tenantId);
    return jobs.map(toTrainingJobRecord);
  }

  async getJob(tenantId: string, id: string) {
    const job = await this.jobRepository.findById(tenantId, id);
    if (!job) {
      throw trainingJobNotFoundError();
    }
    return toTrainingJobRecord(job);
  }

  async getJobMetrics(tenantId: string, id: string) {
    const job = await this.getJob(tenantId, id);
    return {
      jobId: job.id,
      status: job.status,
      metrics: job.metrics,
    };
  }
}
