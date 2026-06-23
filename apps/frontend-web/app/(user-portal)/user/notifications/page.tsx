import { ListPage } from "@/components/dashboard/ListPage";
import { NotificationCenter } from "@/components/notifications/notification-center";

export default function UserNotificationsPage() {
  return (
    <ListPage
      title="Notifications"
      subtitle="Stay up to date with clinic activity and alerts."
    >
      <NotificationCenter />
    </ListPage>
  );
}
