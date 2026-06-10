export type AppNotification = {
  id: string;
  tenantId: string | null;
  userId: string;
  type: string;
  title: string;
  message: string;
  metadata: unknown;
  readAt: string | null;
  isRead: boolean;
  createdAt: string;
  optimistic?: boolean;
};
