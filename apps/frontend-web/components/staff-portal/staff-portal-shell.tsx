"use client";

import { PortalNavigationShell } from "@/components/navigation/PortalNavigationShell";
import { useStaffContext } from "@/hooks/useStaffPortal";

export function StaffPortalShell({ children }: { children: React.ReactNode }) {
  const { displayName } = useStaffContext();

  return (
    <PortalNavigationShell portalId="staff" displayName={displayName}>
      {children}
    </PortalNavigationShell>
  );
}
