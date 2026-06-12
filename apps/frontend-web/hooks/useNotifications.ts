"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useApi } from "@/hooks/useApi";
import { useTenant } from "@/hooks/useTenant";
import { shouldUseTenantScopedApi } from "@/lib/auth/portal-scope";
import { createNotificationApi } from "@/lib/notification-api";
import type { AppNotification } from "@/lib/notification-types";
import { useAuthStore } from "@/store/auth.store";

const POLL_INTERVAL_MS = 30_000;
const UNREAD_POLL_INTERVAL_MS = 60_000;
const UNREAD_POLL_BACKOFF_MS = 120_000;

function unreadCountRefetchInterval(query: { state: { error: unknown } }) {
  return query.state.error ? UNREAD_POLL_BACKOFF_MS : UNREAD_POLL_INTERVAL_MS;
}

function notificationPollRefetchInterval(query: { state: { error: unknown } }) {
  return query.state.error ? UNREAD_POLL_BACKOFF_MS : POLL_INTERVAL_MS;
}

export function useNotificationApi() {
  const api = useApi();
  return useMemo(() => createNotificationApi(api), [api]);
}

export function useNotificationContext() {
  const user = useAuthStore((state) => state.user);
  const { tenantId } = useTenant();
  const tenantScoped = shouldUseTenantScopedApi(user?.role);
  return { user, tenantId, userId: user?.id ?? null, tenantScoped };
}

function canQueryNotifications(
  tenantId: string | null | undefined,
  userId: string | null,
  tenantScoped: boolean,
) {
  return tenantScoped && Boolean(tenantId && userId);
}

function notificationQueryKey(tenantId: string | null | undefined, userId: string | null) {
  return ["notifications", tenantId, userId] as const;
}

export function useUnreadNotificationCount() {
  const notificationApi = useNotificationApi();
  const { tenantId, userId, tenantScoped } = useNotificationContext();

  return useQuery({
    queryKey: ["notifications", "unread-count", tenantId, userId],
    queryFn: () => notificationApi.unreadCount(),
    enabled: canQueryNotifications(tenantId, userId, tenantScoped),
    refetchInterval: unreadCountRefetchInterval,
    refetchIntervalInBackground: false,
    retry: false,
    select: (response) => response.count,
  });
}

export function useNotifications(options?: { unreadOnly?: boolean; limit?: number }) {
  const notificationApi = useNotificationApi();
  const { tenantId, userId, tenantScoped } = useNotificationContext();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [...notificationQueryKey(tenantId, userId), options?.unreadOnly ?? false],
    queryFn: async () => {
      const cached = queryClient.getQueryData<AppNotification[]>(
        notificationQueryKey(tenantId, userId),
      );
      const since = cached?.[0]?.createdAt;
      const response = await notificationApi.list({
        unreadOnly: options?.unreadOnly,
        limit: options?.limit,
        since: since && !options?.unreadOnly ? since : undefined,
      });

      if (!since || options?.unreadOnly) {
        return response;
      }

      const merged = [...response];
      for (const item of cached ?? []) {
        if (!merged.some((entry) => entry.id === item.id)) {
          merged.push(item);
        }
      }

      return merged.sort(
        (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
      );
    },
    enabled: canQueryNotifications(tenantId, userId, tenantScoped),
    refetchInterval: notificationPollRefetchInterval,
    refetchIntervalInBackground: false,
    retry: false,
  });
}

export function useMarkNotificationsRead() {
  const notificationApi = useNotificationApi();
  const queryClient = useQueryClient();
  const { tenantId, userId } = useNotificationContext();

  return useMutation({
    mutationFn: (notificationIds: string[]) => notificationApi.markRead(notificationIds),
    meta: { silent: true },
    onMutate: async (notificationIds) => {
      await queryClient.cancelQueries({ queryKey: notificationQueryKey(tenantId, userId) });

      const previous = queryClient.getQueryData<AppNotification[]>(
        notificationQueryKey(tenantId, userId),
      );

      queryClient.setQueryData<AppNotification[]>(notificationQueryKey(tenantId, userId), (current) =>
        (current ?? []).map((notification) =>
          notificationIds.includes(notification.id)
            ? {
                ...notification,
                isRead: true,
                readAt: new Date().toISOString(),
              }
            : notification,
        ),
      );

      queryClient.setQueryData(["notifications", "unread-count", tenantId, userId], (current?: number) =>
        Math.max(0, (current ?? 0) - notificationIds.length),
      );

      return { previous };
    },
    onError: (_error, _ids, context) => {
      if (context?.previous) {
        queryClient.setQueryData(notificationQueryKey(tenantId, userId), context.previous);
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: notificationQueryKey(tenantId, userId) });
      void queryClient.invalidateQueries({
        queryKey: ["notifications", "unread-count", tenantId, userId],
      });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const notificationApi = useNotificationApi();
  const queryClient = useQueryClient();
  const { tenantId, userId } = useNotificationContext();

  return useMutation({
    mutationFn: () => notificationApi.markAllRead(),
    meta: { silent: true },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: notificationQueryKey(tenantId, userId) });

      const previous = queryClient.getQueryData<AppNotification[]>(
        notificationQueryKey(tenantId, userId),
      );

      queryClient.setQueryData<AppNotification[]>(notificationQueryKey(tenantId, userId), (current) =>
        (current ?? []).map((notification) => ({
          ...notification,
          isRead: true,
          readAt: notification.readAt ?? new Date().toISOString(),
        })),
      );

      queryClient.setQueryData(["notifications", "unread-count", tenantId, userId], 0);

      return { previous };
    },
    onError: (_error, _input, context) => {
      if (context?.previous) {
        queryClient.setQueryData(notificationQueryKey(tenantId, userId), context.previous);
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: notificationQueryKey(tenantId, userId) });
      void queryClient.invalidateQueries({
        queryKey: ["notifications", "unread-count", tenantId, userId],
      });
    },
  });
}

export function useOptimisticNotificationPreview() {
  const queryClient = useQueryClient();
  const { tenantId, userId } = useNotificationContext();

  return (notification: Omit<AppNotification, "id" | "optimistic"> & { id?: string }) => {
    const optimistic: AppNotification = {
      id: notification.id ?? `optimistic-${uuidv4()}`,
      tenantId: notification.tenantId ?? tenantId ?? null,
      userId: notification.userId ?? userId ?? "",
      type: notification.type,
      title: notification.title,
      message: notification.message,
      metadata: notification.metadata ?? null,
      readAt: null,
      isRead: false,
      createdAt: notification.createdAt ?? new Date().toISOString(),
      optimistic: true,
    };

    queryClient.setQueryData<AppNotification[]>(notificationQueryKey(tenantId, userId), (current) => [
      optimistic,
      ...(current ?? []).filter((item) => item.id !== optimistic.id),
    ]);

    queryClient.setQueryData(
      ["notifications", "unread-count", tenantId, userId],
      (current?: number) => (current ?? 0) + 1,
    );
  };
}
