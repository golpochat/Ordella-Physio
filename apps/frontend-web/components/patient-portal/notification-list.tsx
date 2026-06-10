import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import type { PatientNotification } from "@/lib/patient-portal-types";
import { formatPatientDateTime } from "@/lib/patient-portal-utils";

const PLACEHOLDER_NOTIFICATIONS: PatientNotification[] = [
  {
    id: "1",
    title: "Appointment reminder",
    message: "Your physiotherapy session is scheduled for tomorrow at 10:00 AM.",
    createdAt: new Date().toISOString(),
    read: false,
  },
  {
    id: "2",
    title: "Invoice available",
    message: "A new invoice has been added to your billing history.",
    createdAt: new Date(Date.now() - 86_400_000).toISOString(),
    read: true,
  },
  {
    id: "3",
    title: "Care note shared",
    message: "Your therapist shared a new treatment summary with you.",
    createdAt: new Date(Date.now() - 172_800_000).toISOString(),
    read: true,
  },
];

export function NotificationList() {
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
              {formatPatientDateTime(notification.createdAt)}
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
