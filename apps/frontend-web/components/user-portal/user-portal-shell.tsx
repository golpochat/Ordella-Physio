"use client";

import { PortalNavigationShell } from "@/components/navigation/PortalNavigationShell";
import { useUserPortalContext } from "@/hooks/useUserPortal";

export function UserPortalShell({ children }: { children: React.ReactNode }) {
  const { displayName } = useUserPortalContext();

  return (
    <PortalNavigationShell portalId="user" displayName={displayName}>
      {children}
    </PortalNavigationShell>
  );
}
