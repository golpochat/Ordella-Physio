import type { Notification } from "@/generated/prisma";

export function toNotificationResponse(notification: Notification) {
  return {
    id: notification.id,
    tenantId: notification.tenantId,
    userId: notification.userId,
    type: notification.type,
    title: notification.title,
    message: notification.message,
    metadata: notification.metadata,
    readAt: notification.readAt?.toISOString() ?? null,
    isRead: Boolean(notification.readAt),
    createdAt: notification.createdAt.toISOString(),
  };
}
