export type NotificationFailedEvent = {
  tenantId: string;
  notificationId: string;
  channel: string;
  reason?: string;
  failedAt: string;
};
