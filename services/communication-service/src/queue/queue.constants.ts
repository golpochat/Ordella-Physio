export const QUEUE_NAMES = {
  NOTIFICATION: "communication.notification",
  REMINDER: "communication.reminder",
  WEBHOOK: "communication.webhook",
  NOTIFICATION_DLQ: "communication.notification.dlq",
  REMINDER_DLQ: "communication.reminder.dlq",
  WEBHOOK_DLQ: "communication.webhook.dlq",
} as const;

export const MAX_QUEUE_ATTEMPTS = 3;

export type NotificationQueueJob = {
  tenantId: string;
  notificationId: string;
  channel: string;
  to: string;
  subject?: string;
  body: string;
  payload?: Record<string, unknown>;
};

export type ReminderQueueJob = {
  tenantId: string;
  reminderId: string;
  channel: string;
  to: string;
  message: string;
};

export type WebhookQueueJob = {
  tenantId: string;
  url: string;
  payload: Record<string, unknown>;
};
