export type NotificationCreatedEvent = {
  tenantId: string;
  notificationId: string;
  channel: string;
  to: string;
  status: string;
  createdAt: string;
};
