import type { createApiClient } from "@/lib/api-client";
import type {
  CreateConversationPayload,
  MessagingConversation,
  MessagingMessage,
  MessagingMessagesResponse,
} from "@/lib/messaging-types";

export type MessagingApiClient = ReturnType<typeof createApiClient>;

export function createMessagingApi(api: MessagingApiClient) {
  return {
    listConversations() {
      return api.get<MessagingConversation[]>("messaging", "/conversations");
    },

    getConversation(id: string) {
      return api.get<MessagingConversation>("messaging", `/conversations/${id}`);
    },

    createConversation(payload: CreateConversationPayload) {
      return api.post<MessagingConversation>("messaging", "/conversations", payload);
    },

    listMessages(conversationId: string, params?: { since?: string; cursor?: string }) {
      return api.get<MessagingMessagesResponse>("messaging", `/conversations/${conversationId}/messages`, {
        params,
      });
    },

    sendMessage(conversationId: string, content: string) {
      return api.post<MessagingMessage>("messaging", `/conversations/${conversationId}/messages`, { content });
    },

    markRead(messageId: string) {
      return api.post<MessagingMessage>("messaging", `/messages/${messageId}/read`);
    },

    setTyping(messageId: string, isTyping: boolean) {
      return api.post<{ success: boolean }>("messaging", `/messages/${messageId}/typing`, { isTyping });
    },

    unreadCount() {
      return api.get<{ count: number }>("messaging", "/unread-count");
    },
  };
}
