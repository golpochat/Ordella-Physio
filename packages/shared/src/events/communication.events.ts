import type { NotificationType, ReminderChannel } from "../enums";
import type { DomainEvent } from "./base.event";

export interface NotificationSentPayload {
  notificationId: string;
  tenantId: string;
  recipientId: string;
  type: NotificationType;
  sentAt: string;
}

export interface NotificationFailedPayload {
  notificationId: string;
  tenantId: string;
  recipientId: string;
  type: NotificationType;
  errorMessage?: string;
}

export interface ReminderSentPayload {
  reminderId: string;
  tenantId: string;
  patientId: string;
  channel: ReminderChannel;
  sentAt: string;
}

export interface ReminderFailedPayload {
  reminderId: string;
  tenantId: string;
  patientId: string;
  channel: ReminderChannel;
  errorMessage?: string;
}

export type NotificationSentEvent = DomainEvent<NotificationSentPayload>;
export type NotificationFailedEvent = DomainEvent<NotificationFailedPayload>;
export type ReminderSentEvent = DomainEvent<ReminderSentPayload>;
export type ReminderFailedEvent = DomainEvent<ReminderFailedPayload>;
