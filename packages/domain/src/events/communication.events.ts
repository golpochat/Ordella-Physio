import { DomainEvent } from "../core/domain-event";

export type NotificationCreatedPayload = {
  notificationId: string;
  tenantId: string;
  channel: string;
  to: string;
};

export class NotificationCreated extends DomainEvent<NotificationCreatedPayload> {
  constructor(payload: NotificationCreatedPayload, correlationId?: string) {
    super({
      eventName: "communication.notification.created",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type NotificationSentPayload = {
  notificationId: string;
  tenantId: string;
  channel: string;
  to: string;
};

export class NotificationSent extends DomainEvent<NotificationSentPayload> {
  constructor(payload: NotificationSentPayload, correlationId?: string) {
    super({
      eventName: "communication.notification.sent",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type NotificationFailedPayload = {
  notificationId: string;
  tenantId: string;
  channel: string;
  reason?: string;
};

export class NotificationFailed extends DomainEvent<NotificationFailedPayload> {
  constructor(payload: NotificationFailedPayload, correlationId?: string) {
    super({
      eventName: "communication.notification.failed",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type NotificationCancelledPayload = {
  notificationId: string;
  tenantId: string;
  reason?: string;
};

export class NotificationCancelled extends DomainEvent<NotificationCancelledPayload> {
  constructor(payload: NotificationCancelledPayload, correlationId?: string) {
    super({
      eventName: "communication.notification.cancelled",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type ReminderCreatedPayload = {
  reminderId: string;
  tenantId: string;
  type: string;
  channel: string;
  sendAt: string;
};

export class ReminderCreated extends DomainEvent<ReminderCreatedPayload> {
  constructor(payload: ReminderCreatedPayload, correlationId?: string) {
    super({
      eventName: "communication.reminder.created",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type ReminderCancelledPayload = {
  reminderId: string;
  tenantId: string;
  reason?: string;
};

export class ReminderCancelled extends DomainEvent<ReminderCancelledPayload> {
  constructor(payload: ReminderCancelledPayload, correlationId?: string) {
    super({
      eventName: "communication.reminder.cancelled",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}
