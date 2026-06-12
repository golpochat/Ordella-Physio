"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useApi } from "@/hooks/useApi";
import { useTenant } from "@/hooks/useTenant";
import { shouldUseTenantScopedApi } from "@/lib/auth/portal-scope";
import { createMessagingApi } from "@/lib/messaging-api";
import type { CreateConversationPayload, MessagingMessage } from "@/lib/messaging-types";
import { useAuthStore } from "@/store/auth.store";

const POLL_INTERVAL_MS = 15_000;
const UNREAD_POLL_INTERVAL_MS = 60_000;
const UNREAD_POLL_BACKOFF_MS = 120_000;

function unreadCountRefetchInterval(query: { state: { error: unknown } }) {
  return query.state.error ? UNREAD_POLL_BACKOFF_MS : UNREAD_POLL_INTERVAL_MS;
}

function messagingPollRefetchInterval(query: { state: { error: unknown } }) {
  return query.state.error ? UNREAD_POLL_BACKOFF_MS : POLL_INTERVAL_MS;
}

export function useMessagingApi() {
  const api = useApi();
  return useMemo(() => createMessagingApi(api), [api]);
}

export function useMessagingContext() {
  const user = useAuthStore((state) => state.user);
  const { tenantId } = useTenant();
  const tenantScoped = shouldUseTenantScopedApi(user?.role);
  return { user, tenantId, userId: user?.id ?? null, role: user?.role ?? "STAFF", tenantScoped };
}

function canQueryMessaging(
  tenantId: string | null | undefined,
  userId: string | null,
  tenantScoped: boolean,
) {
  return tenantScoped && Boolean(tenantId && userId);
}

export function useUnreadMessageCount() {
  const messagingApi = useMessagingApi();
  const { tenantId, userId, tenantScoped } = useMessagingContext();

  return useQuery({
    queryKey: ["messaging", "unread-count", tenantId, userId],
    queryFn: () => messagingApi.unreadCount(),
    enabled: canQueryMessaging(tenantId, userId, tenantScoped),
    refetchInterval: unreadCountRefetchInterval,
    refetchIntervalInBackground: false,
    retry: false,
    select: (response) => response.count,
  });
}

export function useConversations() {
  const messagingApi = useMessagingApi();
  const { tenantId, userId, tenantScoped } = useMessagingContext();

  return useQuery({
    queryKey: ["messaging", "conversations", tenantId, userId],
    queryFn: () => messagingApi.listConversations(),
    enabled: canQueryMessaging(tenantId, userId, tenantScoped),
    refetchInterval: messagingPollRefetchInterval,
    refetchIntervalInBackground: false,
    retry: false,
  });
}

export function useConversation(conversationId: string | null) {
  const messagingApi = useMessagingApi();
  const { tenantId, userId, tenantScoped } = useMessagingContext();

  return useQuery({
    queryKey: ["messaging", "conversation", tenantId, userId, conversationId],
    queryFn: () => messagingApi.getConversation(conversationId!),
    enabled: canQueryMessaging(tenantId, userId, tenantScoped) && Boolean(conversationId),
    refetchInterval: messagingPollRefetchInterval,
    refetchIntervalInBackground: false,
    retry: false,
  });
}

export function useConversationMessages(conversationId: string | null) {
  const messagingApi = useMessagingApi();
  const { tenantId, userId, tenantScoped } = useMessagingContext();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["messaging", "messages", tenantId, userId, conversationId],
    queryFn: async () => {
      const cached = queryClient.getQueryData<{ items: MessagingMessage[]; typingUsers: string[] }>([
        "messaging",
        "messages",
        tenantId,
        userId,
        conversationId,
      ]);
      const since = cached?.items?.at(-1)?.createdAt;
      const response = await messagingApi.listMessages(conversationId!, since ? { since } : undefined);

      if (!since || !cached?.items?.length) {
        return response;
      }

      const merged = [...cached.items];
      for (const message of response.items) {
        if (!merged.some((item) => item.id === message.id)) {
          merged.push(message);
        }
      }

      return { items: merged, typingUsers: response.typingUsers };
    },
    enabled: canQueryMessaging(tenantId, userId, tenantScoped) && Boolean(conversationId),
    refetchInterval: messagingPollRefetchInterval,
    refetchIntervalInBackground: false,
    retry: false,
  });

  return query;
}

export function useCreateConversation() {
  const messagingApi = useMessagingApi();
  const queryClient = useQueryClient();
  const { tenantId, userId } = useMessagingContext();

  return useMutation({
    mutationFn: (payload: CreateConversationPayload) => messagingApi.createConversation(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["messaging", "conversations", tenantId, userId] });
      void queryClient.invalidateQueries({ queryKey: ["messaging", "unread-count", tenantId, userId] });
    },
  });
}

export function useSendMessage(conversationId: string | null) {
  const messagingApi = useMessagingApi();
  const queryClient = useQueryClient();
  const { tenantId, userId } = useMessagingContext();

  return useMutation({
    mutationFn: async (content: string) => {
      if (!conversationId) throw new Error("Conversation is required");
      return messagingApi.sendMessage(conversationId, content);
    },
    onMutate: async (content) => {
      if (!conversationId || !userId) return;

      await queryClient.cancelQueries({
        queryKey: ["messaging", "messages", tenantId, userId, conversationId],
      });

      const previous = queryClient.getQueryData<{ items: MessagingMessage[]; typingUsers: string[] }>([
        "messaging",
        "messages",
        tenantId,
        userId,
        conversationId,
      ]);

      const optimisticMessage: MessagingMessage = {
        id: `optimistic-${uuidv4()}`,
        conversationId,
        senderId: userId,
        content,
        createdAt: new Date().toISOString(),
        readAt: null,
        readBy: [],
        isOwn: true,
        isRead: true,
        optimistic: true,
      };

      queryClient.setQueryData(["messaging", "messages", tenantId, userId, conversationId], {
        items: [...(previous?.items ?? []), optimisticMessage],
        typingUsers: previous?.typingUsers ?? [],
      });

      return { previous };
    },
    onError: (_error, _content, context) => {
      if (!conversationId || !context?.previous) return;
      queryClient.setQueryData(
        ["messaging", "messages", tenantId, userId, conversationId],
        context.previous,
      );
    },
    onSuccess: (message) => {
      if (!conversationId) return;

      queryClient.setQueryData(
        ["messaging", "messages", tenantId, userId, conversationId],
        (current?: { items: MessagingMessage[]; typingUsers: string[] }) => {
          const items = (current?.items ?? []).filter((item) => !item.optimistic);
          const exists = items.some((item) => item.id === message.id);
          return {
            items: exists ? items : [...items, message],
            typingUsers: current?.typingUsers ?? [],
          };
        },
      );

      void queryClient.invalidateQueries({ queryKey: ["messaging", "conversations", tenantId, userId] });
      void queryClient.invalidateQueries({ queryKey: ["messaging", "unread-count", tenantId, userId] });
    },
  });
}

export function useMarkMessageRead() {
  const messagingApi = useMessagingApi();
  const queryClient = useQueryClient();
  const { tenantId, userId } = useMessagingContext();

  return useMutation({
    mutationFn: (messageId: string) => messagingApi.markRead(messageId),
    meta: { silent: true },
    onSuccess: (_data, messageId) => {
      queryClient.setQueryData(
        ["messaging", "unread-count", tenantId, userId],
        (current?: number) => Math.max(0, (current ?? 0) - 1),
      );

      queryClient.setQueryData(
        ["messaging", "conversations", tenantId, userId],
        (current?: Awaited<ReturnType<typeof messagingApi.listConversations>>) =>
          current?.map((conversation) =>
            conversation.lastMessage?.id === messageId
              ? { ...conversation, unreadCount: Math.max(0, (conversation.unreadCount ?? 0) - 1) }
              : conversation,
          ),
      );

      queryClient.setQueriesData<{ items: MessagingMessage[]; typingUsers: string[] }>(
        { queryKey: ["messaging", "messages", tenantId, userId] },
        (current) =>
          current
            ? {
                ...current,
                items: current.items.map((message) =>
                  message.id === messageId ? { ...message, isRead: true } : message,
                ),
              }
            : current,
      );
    },
  });
}

export function useMessageTyping(conversationId: string | null, lastMessageId: string | null) {
  const messagingApi = useMessagingApi();

  return useMutation({
    mutationFn: (isTyping: boolean) => {
      if (!lastMessageId) return Promise.resolve({ success: true });
      return messagingApi.setTyping(lastMessageId, isTyping);
    },
    meta: { silent: true, conversationId },
  });
}
