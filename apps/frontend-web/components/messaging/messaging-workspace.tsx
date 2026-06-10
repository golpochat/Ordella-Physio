"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConversationDetail } from "@/components/messaging/conversation-detail";
import { ConversationList } from "@/components/messaging/conversation-list";
import { NewConversationModal } from "@/components/messaging/new-conversation-modal";
import { useConversations, useMessagingContext } from "@/hooks/useMessaging";
import { useMessagingParticipants } from "@/hooks/useMessagingParticipants";

type MessagingWorkspaceProps = {
  className?: string;
};

export function MessagingWorkspace({ className }: MessagingWorkspaceProps) {
  const { userId } = useMessagingContext();
  const conversationsQuery = useConversations();
  const { participants } = useMessagingParticipants();
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [newConversationOpen, setNewConversationOpen] = useState(false);

  const activeConversation =
    conversationsQuery.data?.find((conversation) => conversation.id === activeConversationId) ??
    conversationsQuery.data?.[0] ??
    null;

  const resolvedActiveId = activeConversation?.id ?? null;

  return (
    <div className={className}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Messages</h2>
          <p className="text-sm text-muted-foreground">Real-time secure messaging within your tenant.</p>
        </div>
        <Button onClick={() => setNewConversationOpen(true)}>New conversation</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(240px,1fr)_2fr]">
        <ConversationList
          conversations={conversationsQuery.data ?? []}
          activeId={resolvedActiveId}
          currentUserId={userId ?? ""}
          onSelect={setActiveConversationId}
        />
        <ConversationDetail conversation={activeConversation} />
      </div>

      <NewConversationModal
        open={newConversationOpen}
        onOpenChange={setNewConversationOpen}
        participants={participants}
        onCreated={setActiveConversationId}
      />
    </div>
  );
}
