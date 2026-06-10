import { StaffNotificationList } from "@/components/staff-portal/notification-list";

export default function StaffNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="text-muted-foreground">Stay updated on clinic activity.</p>
      </div>
      <StaffNotificationList />
    </div>
  );
}
