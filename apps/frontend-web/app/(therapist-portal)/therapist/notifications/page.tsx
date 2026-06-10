import { TherapistNotificationList } from "@/components/therapist-portal/notification-list";

export default function TherapistNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="text-muted-foreground">Stay updated on schedule and clinic activity.</p>
      </div>
      <TherapistNotificationList />
    </div>
  );
}
