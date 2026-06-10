import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import { formatPortalDateTime } from "@/lib/user-portal-utils";

const PLACEHOLDER_NOTIFICATIONS = [
  {
    id: "1",
    title: "Appointment reminder",
    message: "You have a session scheduled for tomorrow at 10:00 AM.",
    createdAt: new Date().toISOString(),
    read: false,
  },
  {
    id: "2",
    title: "Invoice available",
    message: "A new invoice has been posted to your account.",
    createdAt: new Date(Date.now() - 86_400_000).toISOString(),
    read: true,
  },
  {
    id: "3",
    title: "Note shared",
    message: "Your therapist shared a new clinical note.",
    createdAt: new Date(Date.now() - 172_800_000).toISOString(),
    read: true,
  },
];

export function UserNotificationList() {
  return (
    <div className="space-y-3">
      {PLACEHOLDER_NOTIFICATIONS.map((notification) => (
        <Card key={notification.id}>
          <CardBody className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium">{notification.title}</p>
              {!notification.read ? <Badge>New</Badge> : null}
            </div>
            <p className="text-sm text-muted-foreground">{notification.message}</p>
            <p className="text-xs text-muted-foreground">
              {formatPortalDateTime(notification.createdAt)}
            </p>
          </CardBody>
        </Card>
      ))}
      <p className="text-center text-xs text-muted-foreground">
        Notifications are placeholder UI until the communication service is wired.
      </p>
    </div>
  );
}
