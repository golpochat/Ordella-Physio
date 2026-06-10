export type NotificationCreateEvent = {
  notificationId: string;
  tenantId: string | null;
  userId: string;
  type: string;
  title: string;
  message: string;
  createdAt: string;
};
