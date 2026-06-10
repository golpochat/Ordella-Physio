import { NotificationCenter } from "@/components/notifications/notification-center";

export default function SuperAdminNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="text-muted-foreground">Platform-wide and tenant support notifications.</p>
      </div>
      <NotificationCenter />
    </div>
  );
}
