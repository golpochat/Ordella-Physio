import { UserNotificationList } from "@/components/user-portal/notification-list";

export default function UserNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="text-muted-foreground">Stay updated on your account activity.</p>
      </div>
      <UserNotificationList />
    </div>
  );
}
