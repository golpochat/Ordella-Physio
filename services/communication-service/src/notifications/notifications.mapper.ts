import type { Notification } from "@/generated/prisma";

export type NotificationResponse = {
  id: string;
  tenantId: string;
  channel: string;
  templateKey: string | null;
  to: string;
  subject: string | null;
  body: string;
  status: string;
  scheduledAt: string | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
};

export function toNotificationResponse(notification: Notification): NotificationResponse {
  return {
    id: notification.id,
    tenantId: notification.tenantId,
    channel: notification.channel,
    templateKey: notification.templateKey,
    to: notification.to,
    subject: notification.subject,
    body: notification.body,
    status: notification.status,
    scheduledAt: notification.scheduledAt?.toISOString() ?? null,
    errorMessage: notification.errorMessage,
    createdAt: notification.createdAt.toISOString(),
    updatedAt: notification.updatedAt.toISOString(),
  };
}

export function toNotificationListResponse(notifications: Notification[]) {
  return notifications.map(toNotificationResponse);
}
