"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@ordella/shared-ui";
import {
  useConversationMessages,
  useMarkMessageRead,
  useMessageTyping,
  useMessagingContext,
  useSendMessage,
} from "@/hooks/useMessaging";
import type { MessagingConversation } from "@/lib/messaging-types";

type ConversationDetailProps = {
  conversation: MessagingConversation | null;
};

export function ConversationDetail({ conversation }: ConversationDetailProps) {
  const { userId } = useMessagingContext();
  const conversationId = conversation?.id ?? null;
  const messagesQuery = useConversationMessages(conversationId);
  const sendMessage = useSendMessage(conversationId);
  const markRead = useMarkMessageRead();
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const lastMessageId = messagesQuery.data?.items?.at(-1)?.id ?? null;
  const typingMutation = useMessageTyping(conversationId, lastMessageId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesQuery.data?.items?.length]);

  useEffect(() => {
    if (!conversationId || !messagesQuery.data?.items?.length || !userId) return;

    const unread = messagesQuery.data.items.filter(
      (message) => !message.isOwn && !message.isRead && !message.optimistic,
    );

    for (const message of unread) {
      void markRead.mutate(message.id);
    }
  }, [conversationId, messagesQuery.data?.items, userId, markRead]);

  if (!conversation) {
    return (
      <div className="flex h-full min-h-[320px] items-center justify-center rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
        Select a conversation to view messages.
      </div>
    );
  }

  const typingUsers = (messagesQuery.data?.typingUsers ?? []).filter((id) => id !== userId);

  return (
    <div className="flex h-full min-h-[420px] flex-col rounded-lg border">
      <div className="border-b p-4">
        <p className="text-sm font-semibold">Conversation</p>
        <p className="text-xs text-muted-foreground">
          {conversation.participants.length} participant
          {conversation.participants.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {(messagesQuery.data?.items ?? []).map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[85%] rounded-lg border p-3 text-sm",
              message.isOwn ? "ml-auto bg-primary text-primary-foreground" : "bg-muted/40",
              message.optimistic && "opacity-70",
            )}
          >
            <p>{message.content}</p>
            <div className="mt-2 flex items-center justify-between gap-2 text-xs opacity-80">
              <span>{new Date(message.createdAt).toLocaleString()}</span>
              {message.isOwn ? (
                <span>{message.readAt || message.readBy.length > 0 ? "Read" : "Sent"}</span>
              ) : null}
            </div>
          </div>
        ))}
        {typingUsers.length > 0 ? (
          <p className="text-xs text-muted-foreground">Someone is typing…</p>
        ) : null}
        <div ref={bottomRef} />
      </div>

      <form
        className="flex gap-2 border-t p-4"
        onSubmit={(event) => {
          event.preventDefault();
          const content = draft.trim();
          if (!content) return;
          setDraft("");
          void sendMessage.mutateAsync(content);
        }}
      >
        <Input
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            if (lastMessageId) {
              void typingMutation.mutate(true);
            }
          }}
          placeholder="Type a message..."
        />
        <Button type="submit" disabled={sendMessage.isPending || !draft.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
}
