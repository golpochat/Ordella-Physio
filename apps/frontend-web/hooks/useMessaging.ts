"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useApi } from "@/hooks/useApi";
import { useTenant } from "@/hooks/useTenant";
import { createMessagingApi } from "@/lib/messaging-api";
import type { CreateConversationPayload, MessagingMessage } from "@/lib/messaging-types";
import { useAuthStore } from "@/store/auth.store";

const POLL_INTERVAL_MS = 4_000;

export function useMessagingApi() {
  const api = useApi();
  return useMemo(() => createMessagingApi(api), [api]);
}

export function useMessagingContext() {
  const user = useAuthStore((state) => state.user);
  const { tenantId } = useTenant();
  return { user, tenantId, userId: user?.id ?? null, role: user?.role ?? "STAFF" };
}

export function useUnreadMessageCount() {
  const messagingApi = useMessagingApi();
  const { tenantId, userId } = useMessagingContext();

  return useQuery({
    queryKey: ["messaging", "unread-count", tenantId, userId],
    queryFn: () => messagingApi.unreadCount(),
    enabled: Boolean(tenantId && userId),
    refetchInterval: POLL_INTERVAL_MS,
    select: (response) => response.count,
  });
}

export function useConversations() {
  const messagingApi = useMessagingApi();
  const { tenantId, userId } = useMessagingContext();

  return useQuery({
    queryKey: ["messaging", "conversations", tenantId, userId],
    queryFn: () => messagingApi.listConversations(),
    enabled: Boolean(tenantId && userId),
    refetchInterval: POLL_INTERVAL_MS,
  });
}

export function useConversation(conversationId: string | null) {
  const messagingApi = useMessagingApi();
  const { tenantId, userId } = useMessagingContext();

  return useQuery({
    queryKey: ["messaging", "conversation", tenantId, userId, conversationId],
    queryFn: () => messagingApi.getConversation(conversationId!),
    enabled: Boolean(tenantId && userId && conversationId),
    refetchInterval: POLL_INTERVAL_MS,
  });
}

export function useConversationMessages(conversationId: string | null) {
  const messagingApi = useMessagingApi();
  const { tenantId, userId } = useMessagingContext();
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
    enabled: Boolean(tenantId && userId && conversationId),
    refetchInterval: POLL_INTERVAL_MS,
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
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["messaging", "conversations", tenantId, userId] });
      void queryClient.invalidateQueries({ queryKey: ["messaging", "unread-count", tenantId, userId] });
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
    meta: { conversationId },
  });
}
