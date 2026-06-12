"use client";

import { NotificationAnalyticsDashboard } from "@/components/notifications/NotificationAnalyticsDashboard";
import { WithAllPermissions } from "@/lib/auth/withPermission";

export default function NotificationAnalyticsPage() {
  return (
    <WithAllPermissions permissions={["notification.analytics.view"]}>
      <NotificationAnalyticsDashboard />
    </WithAllPermissions>
  );
}
