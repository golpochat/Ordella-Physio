import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createEventBus, type EventBus, toSubject } from "@ordella/event-bus";
import { NOTIFICATION_EVENTS } from "@/constants";
import type { NotificationCreateEvent } from "@/notifications/events/notification-create.event";
import type { NotificationReadEvent } from "@/notifications/events/notification-read.event";
import type { NotificationBroadcastEvent } from "@/notifications/events/notification-broadcast.event";

@Injectable()
export class NotificationEventPublisher implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(NotificationEventPublisher.name);
  private eventBus: EventBus | null = null;

  async onModuleInit() {
    this.eventBus = createEventBus();
    await this.eventBus.connect();
    this.logger.log("Notification event publisher connected to NATS");
  }

  async onModuleDestroy() {
    this.eventBus = null;
  }

  private async publish<T>(subject: string, tenantId: string | null, payload: T, correlationId?: string) {
    if (!this.eventBus) {
      this.logger.warn(`Event bus unavailable, skipped publish: ${subject}`);
      return;
    }

    await this.eventBus.publish(toSubject(subject), payload, {
      tenantId: tenantId ?? "global",
      correlationId,
    });
    this.logger.log(`Published ${subject} for tenant ${tenantId ?? "global"}`);
  }

  async publishNotificationCreate(event: NotificationCreateEvent, correlationId?: string) {
    await this.publish(NOTIFICATION_EVENTS.CREATE, event.tenantId, event, correlationId);
  }

  async publishNotificationRead(event: NotificationReadEvent, correlationId?: string) {
    await this.publish(NOTIFICATION_EVENTS.READ, event.tenantId, event, correlationId);
  }

  async publishNotificationBroadcast(event: NotificationBroadcastEvent, correlationId?: string) {
    await this.publish(NOTIFICATION_EVENTS.BROADCAST, event.tenantId, event, correlationId);
  }
}
