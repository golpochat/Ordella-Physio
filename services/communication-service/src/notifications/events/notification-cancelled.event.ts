export type NotificationCancelledEvent = {
  tenantId: string;
  notificationId: string;
  reason?: string;
  cancelledAt: string;
};
