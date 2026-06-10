import { NotificationList } from "@/components/patient-portal/notification-list";

export default function PatientNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="text-muted-foreground">Stay updated on appointments, billing, and care notes.</p>
      </div>
      <NotificationList />
    </div>
  );
}
