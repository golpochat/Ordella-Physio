"use client";

import { PortalNavigationShell } from "@/components/navigation/PortalNavigationShell";
import { useClinicContext } from "@/hooks/useClinicPortal";

export function ClinicPortalShell({ children }: { children: React.ReactNode }) {
  const { displayName } = useClinicContext();

  return (
    <PortalNavigationShell portalId="clinic" displayName={displayName}>
      {children}
    </PortalNavigationShell>
  );
}
