"use client";

import { PortalNavigationShell } from "@/components/navigation/PortalNavigationShell";
import { useSuperAdminContext } from "@/hooks/useSuperAdminPortal";

export function SuperAdminShell({ children }: { children: React.ReactNode }) {
  const { displayName } = useSuperAdminContext();

  return (
    <PortalNavigationShell portalId="super-admin" displayName={displayName}>
      {children}
    </PortalNavigationShell>
  );
}
