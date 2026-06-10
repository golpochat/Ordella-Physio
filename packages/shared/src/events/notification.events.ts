export type NotificationCreatePayload = {
  notificationId: string;
  tenantId: string | null;
  userId: string;
  type: string;
  title: string;
  message: string;
  createdAt: string;
};

export type NotificationReadPayload = {
  notificationIds: string[];
  tenantId: string | null;
  userId: string;
  readAt: string;
  markAll?: boolean;
};

export type NotificationBroadcastPayload = {
  tenantId: string | null;
  type: string;
  title: string;
  message: string;
  recipientUserIds: string[];
  createdAt: string;
};
