import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import { formatPortalDateTime } from "@/lib/super-admin-portal-utils";

const PLACEHOLDER_NOTIFICATIONS = [
  {
    id: "1",
    title: "New tenant provisioned",
    message: "A new clinic tenant was created on the platform.",
    createdAt: new Date().toISOString(),
    read: false,
  },
  {
    id: "2",
    title: "Service health alert",
    message: "Billing service health check returned unknown status.",
    createdAt: new Date(Date.now() - 86_400_000).toISOString(),
    read: true,
  },
  {
    id: "3",
    title: "Role policy update",
    message: "Built-in role permissions were reviewed.",
    createdAt: new Date(Date.now() - 172_800_000).toISOString(),
    read: true,
  },
];

export function PlatformNotificationList() {
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
