import { NotificationCenter } from "@/components/notifications/notification-center";

export default function PatientNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="text-muted-foreground">Stay up to date with clinic activity and alerts.</p>
      </div>
      <NotificationCenter />
    </div>
  );
}
