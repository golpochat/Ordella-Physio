import { ClinicNotificationList } from "@/components/clinic-portal/notification-list";

export default function ClinicNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="text-muted-foreground">Stay updated on clinic activity.</p>
      </div>
      <ClinicNotificationList />
    </div>
  );
}
