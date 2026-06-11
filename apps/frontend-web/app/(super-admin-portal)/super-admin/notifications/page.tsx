import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { NotificationCenter } from "@/components/notifications/notification-center";

export default function SuperAdminNotificationsPage() {
  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="Platform-wide and tenant support notifications."
      />
      <Card>
        <NotificationCenter />
      </Card>
    </>
  );
}
