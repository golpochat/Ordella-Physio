"use client";

import { PortalNavigationShell } from "@/components/navigation/PortalNavigationShell";
import { useBillingContext } from "@/hooks/useClinicPortal";

export function OrganizationPortalShell({ children }: { children: React.ReactNode }) {
  const billingContextQuery = useBillingContext();
  const organizationName = billingContextQuery.data?.organizationName ?? "Organization";

  return (
    <PortalNavigationShell portalId="organization" displayName={organizationName}>
      {children}
    </PortalNavigationShell>
  );
}
