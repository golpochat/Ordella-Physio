import { Injectable } from "@nestjs/common";
import { toCheckpointRecord } from "@/models/AITrainingCheckpoint";
import {
  AiTrainingCheckpointRepository,
  AiTrainingJobRepository,
} from "@/repositories/ai-training.repository";
import { TrainingArtifactService } from "@/services/training-artifact.service";
import { TrainingQueueService } from "@/workers/training.worker";
import { checkpointNotFoundError, trainingJobNotFoundError } from "@/utils/training-errors";

@Injectable()
export class CheckpointService {
  constructor(
    private readonly checkpointRepository: AiTrainingCheckpointRepository,
    private readonly jobRepository: AiTrainingJobRepository,
    private readonly artifactService: TrainingArtifactService,
    private readonly queueService: TrainingQueueService,
  ) {}

  async saveCheckpoint(input: {
    tenantId: string;
    trainingJobId: string;
    experimentId?: string;
    checkpointNumber: number;
    metricsSnapshot: Record<string, unknown>;
  }) {
    const fileLocation = this.artifactService.buildCheckpointPath(
      input.trainingJobId,
      input.checkpointNumber,
    );
    await this.artifactService.storeCheckpoint(fileLocation, Buffer.from("checkpoint"));

    const checkpoint = await this.checkpointRepository.create({
      tenantId: input.tenantId,
      trainingJobId: input.trainingJobId,
      experimentId: input.experimentId,
      checkpointNumber: input.checkpointNumber,
      fileLocation,
      metricsSnapshot: input.metricsSnapshot as never,
    });

    return toCheckpointRecord(checkpoint);
  }

  async listCheckpoints(tenantId: string, trainingJobId: string) {
    const checkpoints = await this.checkpointRepository.listByJob(tenantId, trainingJobId);
    return checkpoints.map(toCheckpointRecord);
  }

  async loadCheckpoint(tenantId: string, trainingJobId: string, checkpointNumber: number) {
    const checkpoint = await this.checkpointRepository.findByNumber(
      tenantId,
      trainingJobId,
      checkpointNumber,
    );
    if (!checkpoint) {
      throw checkpointNotFoundError();
    }
    return toCheckpointRecord(checkpoint);
  }

  async resumeTraining(
    tenantId: string,
    trainingJobId: string,
    checkpointNumber: number,
    requestHeaders: Record<string, string>,
  ) {
    const job = await this.jobRepository.findById(tenantId, trainingJobId);
    if (!job) {
      throw trainingJobNotFoundError();
    }

    const checkpoint = await this.loadCheckpoint(tenantId, trainingJobId, checkpointNumber);

    await this.jobRepository.updateById(trainingJobId, {
      status: "QUEUED",
      resumeCheckpointId: checkpoint.id,
      metrics: checkpoint.metricsSnapshot as never,
    });

    await this.queueService.enqueueTrainingJob({
      jobId: trainingJobId,
      tenantId,
      requestHeaders,
      resumeFromCheckpoint: checkpoint.checkpointNumber,
    });

    return {
      resumed: true,
      trainingJobId,
      checkpoint: checkpoint,
    };
  }

  async nextCheckpointNumber(trainingJobId: string) {
    const max = await this.checkpointRepository.getMaxCheckpointNumber(trainingJobId);
    return (max._max.checkpointNumber ?? 0) + 1;
  }
}
