import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Job, Worker } from "bullmq";
import Redis from "ioredis";
import {
  MAX_QUEUE_ATTEMPTS,
  QUEUE_NAMES,
  type NotificationQueueJob,
  type ReminderQueueJob,
  type WebhookQueueJob,
} from "@/queue/queue.constants";

@Injectable()
export class QueueProcessor implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(QueueProcessor.name);
  private readonly connection: Redis;
  private workers: Worker[] = [];

  constructor() {
    const redisUrl = process.env.QUEUE_REDIS_URL ?? process.env.REDIS_URL ?? "redis://localhost:6379";
    this.connection = new Redis(redisUrl, { maxRetriesPerRequest: null });
  }

  onModuleInit() {
    this.workers = [
      this.createWorker<NotificationQueueJob>(QUEUE_NAMES.NOTIFICATION, (job) =>
        this.processNotification(job),
      ),
      this.createWorker<ReminderQueueJob>(QUEUE_NAMES.REMINDER, (job) => this.processReminder(job)),
      this.createWorker<WebhookQueueJob>(QUEUE_NAMES.WEBHOOK, (job) => this.processWebhook(job)),
    ];
    this.logger.log("Communication queue processors started");
  }

  async onModuleDestroy() {
    await Promise.all(this.workers.map((worker) => worker.close()));
    await this.connection.quit();
  }

  private createWorker<T>(queueName: string, handler: (job: Job<T>) => Promise<void>) {
    return new Worker<T>(
      queueName,
      async (job) => handler(job),
      {
        connection: this.connection,
        concurrency: 5,
      },
    );
  }

  private async processNotification(job: Job<NotificationQueueJob>) {
    this.logger.log(`[placeholder] Processing notification job ${job.id}`, job.data);
  }

  private async processReminder(job: Job<ReminderQueueJob>) {
    this.logger.log(`[placeholder] Processing reminder job ${job.id}`, job.data);
  }

  private async processWebhook(job: Job<WebhookQueueJob>) {
    this.logger.log(`[placeholder] Processing webhook job ${job.id}`, job.data);
  }

  getConnection() {
    return this.connection;
  }

  getDefaultJobOptions() {
    return {
      attempts: MAX_QUEUE_ATTEMPTS,
      backoff: { type: "exponential" as const, delay: 1000 },
      removeOnComplete: true,
    };
  }
}
