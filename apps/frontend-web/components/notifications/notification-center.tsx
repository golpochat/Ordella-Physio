"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import {
  useMarkAllNotificationsRead,
  useMarkNotificationsRead,
  useNotifications,
} from "@/hooks/useNotifications";
import { formatPatientDateTime } from "@/lib/patient-portal-utils";

type NotificationCenterProps = {
  viewAllHref?: string;
  compact?: boolean;
};

export function NotificationCenter({ viewAllHref, compact = false }: NotificationCenterProps) {
  const notificationsQuery = useNotifications({ limit: compact ? 8 : 50 });
  const markRead = useMarkNotificationsRead();
  const markAllRead = useMarkAllNotificationsRead();
  const notifications = notificationsQuery.data ?? [];

  if (!notifications.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
        You are all caught up. New alerts will appear here.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {notifications.filter((notification) => !notification.isRead).length} unread
        </p>
        <Button
          variant="outline"
          size="sm"
          disabled={markAllRead.isPending}
          onClick={() => void markAllRead.mutateAsync()}
        >
          Mark all read
        </Button>
      </div>

      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={notification.isRead ? "opacity-80" : "border-primary/30"}
        >
          <CardBody className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{notification.title}</p>
                  {!notification.isRead ? <Badge>New</Badge> : null}
                  {notification.optimistic ? <Badge variant="secondary">Sending</Badge> : null}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
              </div>
              {!notification.isRead ? (
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={markRead.isPending}
                  onClick={() => void markRead.mutateAsync([notification.id])}
                >
                  Mark read
                </Button>
              ) : null}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatPatientDateTime(notification.createdAt)}
            </p>
          </CardBody>
        </Card>
      ))}

      {compact && viewAllHref ? (
        <div className="pt-2 text-center">
          <Link href={viewAllHref} className="text-sm font-medium text-primary hover:underline">
            View all notifications
          </Link>
        </div>
      ) : null}
    </div>
  );
}
