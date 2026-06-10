import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import type { TherapistNotification } from "@/lib/therapist-portal-types";
import { formatPortalDateTime } from "@/lib/therapist-portal-utils";

const PLACEHOLDER_NOTIFICATIONS: TherapistNotification[] = [
  {
    id: "1",
    title: "New appointment booked",
    message: "A patient booked a session for tomorrow at 2:00 PM.",
    createdAt: new Date().toISOString(),
    read: false,
  },
  {
    id: "2",
    title: "Note review requested",
    message: "Clinic admin flagged a note for your review.",
    createdAt: new Date(Date.now() - 86_400_000).toISOString(),
    read: true,
  },
  {
    id: "3",
    title: "Schedule update",
    message: "Your afternoon appointment was rescheduled.",
    createdAt: new Date(Date.now() - 172_800_000).toISOString(),
    read: true,
  },
];

export function TherapistNotificationList() {
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
