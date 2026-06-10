import { PlatformNotificationList } from "@/components/super-admin-portal/notification-list";

export default function SuperAdminNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="text-muted-foreground">Platform activity and alerts.</p>
      </div>
      <PlatformNotificationList />
    </div>
  );
}
