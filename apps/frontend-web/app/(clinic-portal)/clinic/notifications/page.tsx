import { PageHeader } from "@/components/dashboard/PageHeader";
import { NotificationCenter } from "@/components/notifications/notification-center";

export default function ClinicNotificationsPage() {
  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="Stay up to date with clinic activity and alerts."
      />
      <NotificationCenter />
    </>
  );
}
