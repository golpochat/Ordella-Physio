import { Injectable } from "@nestjs/common";
import type { NotificationChannel } from "@/generated/prisma";
import { DeliveryQueueService } from "@/services/delivery-queue.service";

const BATCH_CHANNELS = new Set<NotificationChannel>(["EMAIL", "PUSH"]);
const BATCH_SIZE = Number(process.env.NOTIFICATION_BATCH_SIZE ?? "100");

@Injectable()
export class BatchDeliveryService {
  constructor(private readonly deliveryQueueService: DeliveryQueueService) {}

  async sendBatch(notifications: Record<string, unknown>[], tenantId: string) {
    const batchable: Record<string, unknown>[] = [];
    const individual: Record<string, unknown>[] = [];

    for (const notification of notifications) {
      const channel = String(notification.channel ?? "").toUpperCase() as NotificationChannel;
      if (BATCH_CHANNELS.has(channel)) {
        batchable.push(notification);
      } else {
        individual.push(notification);
      }
    }

    let queued = 0;

    for (let index = 0; index < batchable.length; index += BATCH_SIZE) {
      const chunk = batchable.slice(index, index + BATCH_SIZE);
      for (const item of chunk) {
        this.deliveryQueueService.enqueue(this.toQueuePayload(tenantId, item));
        queued += 1;
      }
    }

    for (const item of individual) {
      this.deliveryQueueService.enqueue(this.toQueuePayload(tenantId, item));
      queued += 1;
    }

    return {
      queued: true,
      count: queued,
      message: `${queued} notification(s) queued for delivery.`,
    };
  }

  private toQueuePayload(tenantId: string, notification: Record<string, unknown>) {
    return {
      tenantId,
      channel: String(notification.channel),
      to: String(notification.to),
      templateId: notification.templateId ? String(notification.templateId) : undefined,
      variables: notification.variables as Record<string, string> | undefined,
      metadata: notification.metadata as Record<string, unknown> | undefined,
      message: notification.message ? String(notification.message) : undefined,
      subject: notification.subject ? String(notification.subject) : undefined,
      title: notification.title ? String(notification.title) : undefined,
      html: notification.html ? String(notification.html) : undefined,
    };
  }
}
