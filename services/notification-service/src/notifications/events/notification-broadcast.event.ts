export type NotificationBroadcastEvent = {
  tenantId: string | null;
  type: string;
  title: string;
  message: string;
  recipientUserIds: string[];
  createdAt: string;
};
