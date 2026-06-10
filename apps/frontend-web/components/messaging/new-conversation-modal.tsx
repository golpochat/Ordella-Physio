"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { useCreateConversation, useMessagingContext } from "@/hooks/useMessaging";
import { filterParticipantsByRole, searchParticipants } from "@/lib/messaging-participants";
import type { MessagingParticipantOption } from "@/lib/messaging-types";

type NewConversationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participants: MessagingParticipantOption[];
  onCreated: (conversationId: string) => void;
};

export function NewConversationModal({
  open,
  onOpenChange,
  participants,
  onCreated,
}: NewConversationModalProps) {
  const { userId, role } = useMessagingContext();
  const createConversation = useCreateConversation();
  const [query, setQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [initialMessage, setInitialMessage] = useState("");

  const filtered = useMemo(() => {
    const scoped = filterParticipantsByRole(role, participants).filter(
      (participant) => participant.userId !== userId,
    );
    return searchParticipants(scoped, query);
  }, [participants, query, role, userId]);

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>New conversation</ModalTitle>
          <ModalDescription>Search users in your tenant to start a secure conversation.</ModalDescription>
        </ModalHeader>

        <div className="space-y-4">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, role, or user ID"
          />

          <div className="max-h-48 space-y-2 overflow-y-auto rounded-lg border p-2">
            {filtered.length ? (
              filtered.map((participant) => (
                <button
                  key={participant.userId}
                  type="button"
                  onClick={() => setSelectedUserId(participant.userId)}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm ${
                    selectedUserId === participant.userId ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <p className="font-medium">{participant.label}</p>
                  <p className="text-xs opacity-80">{participant.role}</p>
                </button>
              ))
            ) : (
              <p className="px-2 py-4 text-sm text-muted-foreground">No users match your search.</p>
            )}
          </div>

          <Input
            value={initialMessage}
            onChange={(event) => setInitialMessage(event.target.value)}
            placeholder="Optional first message"
          />
        </div>

        <ModalFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={!selectedUserId || createConversation.isPending}
            onClick={() => {
              const selected = filtered.find((participant) => participant.userId === selectedUserId);
              if (!selected) return;

              createConversation.mutate(
                {
                  participants: [{ userId: selected.userId, role: selected.role }],
                  initialMessage: initialMessage.trim() || undefined,
                },
                {
                  onSuccess: (conversation) => {
                    toast.success("Conversation created");
                    onCreated(conversation.id);
                    onOpenChange(false);
                    setQuery("");
                    setSelectedUserId(null);
                    setInitialMessage("");
                  },
                  onError: () => toast.error("Failed to create conversation"),
                },
              );
            }}
          >
            Start conversation
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
