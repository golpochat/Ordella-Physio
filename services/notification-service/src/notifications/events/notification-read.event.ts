export type NotificationReadEvent = {
  notificationIds: string[];
  tenantId: string | null;
  userId: string;
  readAt: string;
  markAll?: boolean;
};
