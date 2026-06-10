import type { createApiClient } from "@/lib/api-client";
import type { AppNotification } from "@/lib/notification-types";

export type NotificationApiClient = ReturnType<typeof createApiClient>;

export function createNotificationApi(api: NotificationApiClient) {
  return {
    list(params?: { unreadOnly?: boolean; since?: string; limit?: number }) {
      return api.get<AppNotification[]>("notifications", "", { params });
    },

    unreadCount() {
      return api.get<{ count: number }>("notifications", "/unread-count");
    },

    markRead(notificationIds: string[]) {
      return api.post<AppNotification[]>("notifications", "/mark-read", { notificationIds });
    },

    markAllRead() {
      return api.post<{ updated: number }>("notifications", "/mark-all-read");
    },
  };
}
