import { Global, Injectable, Module } from "@nestjs/common";
import { Queue } from "bullmq";
import { QueueProcessor } from "@/queue/queue.processor";
import {
  QUEUE_NAMES,
  type NotificationQueueJob,
  type ReminderQueueJob,
  type WebhookQueueJob,
} from "@/queue/queue.constants";

@Injectable()
export class QueueService {
  readonly notificationQueue: Queue<NotificationQueueJob>;
  readonly reminderQueue: Queue<ReminderQueueJob>;
  readonly webhookQueue: Queue<WebhookQueueJob>;

  constructor(private readonly queueProcessor: QueueProcessor) {
    const connection = this.queueProcessor.getConnection();
    const defaultJobOptions = this.queueProcessor.getDefaultJobOptions();

    this.notificationQueue = new Queue<NotificationQueueJob>(QUEUE_NAMES.NOTIFICATION, {
      connection,
      defaultJobOptions,
    });
    this.reminderQueue = new Queue<ReminderQueueJob>(QUEUE_NAMES.REMINDER, {
      connection,
      defaultJobOptions,
    });
    this.webhookQueue = new Queue<WebhookQueueJob>(QUEUE_NAMES.WEBHOOK, {
      connection,
      defaultJobOptions,
    });
  }

  enqueueNotification(data: NotificationQueueJob, delayMs = 0) {
    return this.notificationQueue.add("send-notification", data, { delay: Math.max(delayMs, 0) });
  }

  enqueueReminder(data: ReminderQueueJob, delayMs: number) {
    return this.reminderQueue.add("send-reminder", data, { delay: Math.max(delayMs, 0) });
  }

  enqueueWebhook(data: WebhookQueueJob) {
    return this.webhookQueue.add("dispatch-webhook", data);
  }
}

@Global()
@Module({
  providers: [QueueProcessor, QueueService],
  exports: [QueueProcessor, QueueService],
})
export class QueueModule {}
