"use client";

import { SearchAnalyticsDashboard } from "@/components/search/SearchAnalyticsDashboard";
import { WithAllPermissions } from "@/lib/auth/withPermission";

export default function SearchAnalyticsPage() {
  return (
    <WithAllPermissions permissions={["search.admin"]}>
      <SearchAnalyticsDashboard />
    </WithAllPermissions>
  );
}
