"use client";

import { MessageCircle } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessagingWorkspace } from "@/components/messaging/messaging-workspace";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { useUnreadMessageCount } from "@/hooks/useMessaging";
import { useUiStore } from "@/store/ui.store";

export function MessagingLauncher() {
  const open = useUiStore((state) => state.messagingPanelOpen);
  const setOpen = useUiStore((state) => state.setMessagingPanelOpen);
  const unreadQuery = useUnreadMessageCount();
  const unreadCount = unreadQuery.data ?? 0;

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setOpen(true)}
        aria-label="Open messages"
      >
        <MessageCircle className="h-5 w-5" />
        {unreadCount > 0 ? (
          <Badge className="absolute -right-1 -top-1 min-w-5 justify-center px-1 text-[10px]">
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        ) : null}
      </Button>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent className="max-h-[90vh] max-w-5xl overflow-y-auto">
          <ModalHeader>
            <ModalTitle>Messages</ModalTitle>
          </ModalHeader>
          {open ? <MessagingWorkspace /> : null}
        </ModalContent>
      </Modal>
    </>
  );
}
