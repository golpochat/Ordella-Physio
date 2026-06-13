import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Job, Queue, Worker } from "bullmq";
import Redis from "ioredis";
import { trainingConfig } from "@/config/training.config";
import { TrainingOrchestratorService } from "@/services/training-orchestrator.service";

export type TrainingQueueJob = {
  jobId: string;
  tenantId: string;
  requestHeaders: Record<string, string>;
  resumeFromCheckpoint?: number;
};

@Injectable()
export class TrainingQueueService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TrainingQueueService.name);
  private readonly connection: Redis;
  private readonly queue: Queue<TrainingQueueJob>;
  private worker: Worker<TrainingQueueJob> | null = null;

  constructor(private readonly orchestrator: TrainingOrchestratorService) {
    this.connection = new Redis(trainingConfig.redisUrl, { maxRetriesPerRequest: null });
    this.queue = new Queue<TrainingQueueJob>(trainingConfig.queueName, {
      connection: this.connection,
      defaultJobOptions: {
        attempts: 2,
        backoff: { type: "exponential", delay: 2000 },
        removeOnComplete: true,
      },
    });
  }

  onModuleInit() {
    this.worker = new Worker<TrainingQueueJob>(
      trainingConfig.queueName,
      async (job) => this.processJob(job),
      { connection: this.connection, concurrency: 2 },
    );
    this.logger.log("AI training worker started");
  }

  async onModuleDestroy() {
    await this.worker?.close();
    await this.queue.close();
    await this.connection.quit();
  }

  enqueueTrainingJob(data: TrainingQueueJob) {
    return this.queue.add("run-training", data);
  }

  private async processJob(job: Job<TrainingQueueJob>) {
    this.logger.log(`Processing training job ${job.data.jobId}`);
    await this.orchestrator.executeJob(
      job.data.jobId,
      job.data.requestHeaders,
      job.data.resumeFromCheckpoint,
    );
  }
}
