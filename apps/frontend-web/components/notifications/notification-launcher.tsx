"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "@ordella/shared-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { NotificationCenter } from "@/components/notifications/notification-center";
import { useUnreadNotificationCount } from "@/hooks/useNotifications";
import { useUiStore } from "@/store/ui.store";

const PORTAL_NOTIFICATION_PATHS: Record<string, string> = {
  "/patient": "/patient/notifications",
  "/therapist": "/therapist/notifications",
  "/clinic": "/clinic/notifications",
  "/staff": "/staff/notifications",
  "/pharmacy": "/pharmacy/notifications",
  "/user": "/user/notifications",
  "/super-admin": "/super-admin/notifications",
};

function resolveNotificationsPath(pathname: string) {
  const match = Object.entries(PORTAL_NOTIFICATION_PATHS).find(([prefix]) =>
    pathname.startsWith(prefix),
  );
  return match?.[1] ?? "/user/notifications";
}

export function NotificationLauncher() {
  const pathname = usePathname();
  const open = useUiStore((state) => state.notificationPanelOpen);
  const setOpen = useUiStore((state) => state.setNotificationPanelOpen);
  const unreadQuery = useUnreadNotificationCount();
  const unreadCount = unreadQuery.data ?? 0;
  const viewAllHref = resolveNotificationsPath(pathname);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setOpen(true)}
        aria-label="Open notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 ? (
          <Badge className="absolute -right-1 -top-1 min-w-5 justify-center px-1 text-[10px]">
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        ) : null}
      </Button>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent className="max-h-[90vh] max-w-xl overflow-y-auto">
          <ModalHeader>
            <div className="flex items-center justify-between gap-3">
              <ModalTitle>Notifications</ModalTitle>
              <Link href={viewAllHref} className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
          </ModalHeader>
          <NotificationCenter compact viewAllHref={viewAllHref} />
        </ModalContent>
      </Modal>
    </>
  );
}
