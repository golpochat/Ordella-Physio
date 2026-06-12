"use client";

import { SearchSettingsPanel } from "@/components/search/SearchSettingsPanel";
import { WithAllPermissions } from "@/lib/auth/withPermission";

export default function SearchSettingsPage() {
  return (
    <WithAllPermissions permissions={["search.admin"]}>
      <SearchSettingsPanel />
    </WithAllPermissions>
  );
}
