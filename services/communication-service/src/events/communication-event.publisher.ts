import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createEventBus, type EventBus, toSubject } from "@ordella/event-bus";
import { COMMUNICATION_EVENTS } from "@/constants";
import type { NotificationCreatedEvent } from "@/notifications/events/notification-created.event";
import type { NotificationSentEvent } from "@/notifications/events/notification-sent.event";
import type { NotificationFailedEvent } from "@/notifications/events/notification-failed.event";
import type { NotificationCancelledEvent } from "@/notifications/events/notification-cancelled.event";
import type { ReminderCreatedEvent } from "@/reminders/events/reminder-created.event";
import type { ReminderCancelledEvent } from "@/reminders/events/reminder-cancelled.event";

@Injectable()
export class CommunicationEventPublisher implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CommunicationEventPublisher.name);
  private eventBus: EventBus | null = null;

  async onModuleInit() {
    this.eventBus = createEventBus();
    await this.eventBus.connect();
    this.logger.log("Communication event publisher connected to NATS");
  }

  async onModuleDestroy() {
    this.eventBus = null;
  }

  private async publish<T>(subject: string, tenantId: string, payload: T, correlationId?: string) {
    if (!this.eventBus) {
      this.logger.warn(`Event bus unavailable, skipped publish: ${subject}`);
      return;
    }

    await this.eventBus.publish(toSubject(subject), payload, { tenantId, correlationId });
    this.logger.log(`Published ${subject} for tenant ${tenantId}`);
  }

  async publishNotificationCreated(event: NotificationCreatedEvent, correlationId?: string) {
    await this.publish(COMMUNICATION_EVENTS.NOTIFICATION_CREATED, event.tenantId, event, correlationId);
  }

  async publishNotificationSent(event: NotificationSentEvent, correlationId?: string) {
    await this.publish(COMMUNICATION_EVENTS.NOTIFICATION_SENT, event.tenantId, event, correlationId);
  }

  async publishNotificationFailed(event: NotificationFailedEvent, correlationId?: string) {
    await this.publish(COMMUNICATION_EVENTS.NOTIFICATION_FAILED, event.tenantId, event, correlationId);
  }

  async publishNotificationCancelled(event: NotificationCancelledEvent, correlationId?: string) {
    await this.publish(COMMUNICATION_EVENTS.NOTIFICATION_CANCELLED, event.tenantId, event, correlationId);
  }

  async publishReminderCreated(event: ReminderCreatedEvent, correlationId?: string) {
    await this.publish(COMMUNICATION_EVENTS.REMINDER_CREATED, event.tenantId, event, correlationId);
  }

  async publishReminderCancelled(event: ReminderCancelledEvent, correlationId?: string) {
    await this.publish(COMMUNICATION_EVENTS.REMINDER_CANCELLED, event.tenantId, event, correlationId);
  }
}
