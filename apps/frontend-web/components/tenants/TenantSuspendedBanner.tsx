"use client";

import { useUiStore } from "@/store/ui.store";

export function TenantSuspendedBanner() {
  const tenantSuspended = useUiStore((state) => state.tenantSuspended);

  if (!tenantSuspended) {
    return null;
  }

  return (
    <div className="tenant-suspended-banner" role="alert">
      Your tenant is suspended. Please contact support.
    </div>
  );
}
