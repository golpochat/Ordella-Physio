"use client";

import { cn } from "@ordella/shared-ui";
import { Badge } from "@/components/ui/badge";
import type { MessagingConversation } from "@/lib/messaging-types";

type ConversationListProps = {
  conversations: MessagingConversation[];
  activeId: string | null;
  currentUserId: string;
  onSelect: (conversationId: string) => void;
};

function conversationTitle(conversation: MessagingConversation, currentUserId: string) {
  const others = conversation.participants.filter((participant) => participant.userId !== currentUserId);
  if (!others.length) return "Conversation";
  return others.map((participant) => `${participant.role} · ${participant.userId.slice(0, 8)}`).join(", ");
}

export function ConversationList({
  conversations,
  activeId,
  currentUserId,
  onSelect,
}: ConversationListProps) {
  if (!conversations.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
        No conversations yet. Start a new message to connect with your team.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {conversations.map((conversation) => {
        const active = conversation.id === activeId;
        const unread = conversation.unreadCount ?? 0;

        return (
          <button
            key={conversation.id}
            type="button"
            onClick={() => onSelect(conversation.id)}
            className={cn(
              "w-full rounded-lg border p-3 text-left transition-colors",
              active ? "border-primary bg-primary/5" : "hover:bg-muted/40",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium">{conversationTitle(conversation, currentUserId)}</p>
              {unread > 0 ? <Badge>{unread}</Badge> : null}
            </div>
            {conversation.lastMessage ? (
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{conversation.lastMessage.content}</p>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
