"use client";

import { PortalNavigationShell } from "@/components/navigation/PortalNavigationShell";
import { usePharmacyContext } from "@/hooks/usePharmacyPortal";

export function PharmacyPortalShell({ children }: { children: React.ReactNode }) {
  const { displayName } = usePharmacyContext();

  return (
    <PortalNavigationShell portalId="pharmacy" displayName={displayName}>
      {children}
    </PortalNavigationShell>
  );
}
