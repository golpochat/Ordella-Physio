"use client";

import { PortalNavigationShell } from "@/components/navigation/PortalNavigationShell";
import { PatientPortalRouteGuard } from "@/components/patient-portal/patient-portal-route-guard";
import { usePatientContext } from "@/hooks/usePatientPortal";

export function PatientPortalShell({ children }: { children: React.ReactNode }) {
  const { displayName } = usePatientContext();

  return (
    <PortalNavigationShell portalId="patient" displayName={displayName}>
      <PatientPortalRouteGuard>{children}</PatientPortalRouteGuard>
    </PortalNavigationShell>
  );
}
