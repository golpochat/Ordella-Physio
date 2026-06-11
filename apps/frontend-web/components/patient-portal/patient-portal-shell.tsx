"use client";

import { PortalNavigationShell } from "@/components/navigation/PortalNavigationShell";
import { usePatientContext } from "@/hooks/usePatientPortal";

export function PatientPortalShell({ children }: { children: React.ReactNode }) {
  const { displayName } = usePatientContext();

  return (
    <PortalNavigationShell portalId="patient" displayName={displayName}>
      {children}
    </PortalNavigationShell>
  );
}
