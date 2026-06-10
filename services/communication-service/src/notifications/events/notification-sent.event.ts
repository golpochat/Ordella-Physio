export type NotificationSentEvent = {
  tenantId: string;
  notificationId: string;
  channel: string;
  to: string;
  sentAt: string;
};
