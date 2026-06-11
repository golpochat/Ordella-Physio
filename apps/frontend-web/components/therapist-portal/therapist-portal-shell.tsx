"use client";

import { PortalNavigationShell } from "@/components/navigation/PortalNavigationShell";
import { useTherapistContext } from "@/hooks/useTherapistPortal";

export function TherapistPortalShell({ children }: { children: React.ReactNode }) {
  const { displayName } = useTherapistContext();

  return (
    <PortalNavigationShell portalId="therapist" displayName={displayName}>
      {children}
    </PortalNavigationShell>
  );
}
