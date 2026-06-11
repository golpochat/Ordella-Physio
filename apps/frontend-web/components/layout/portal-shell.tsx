"use client";

import { useMemo } from "react";
import { PortalNavigationShell } from "@/components/navigation/PortalNavigationShell";
import { useAuth } from "@/hooks/useAuth";
import { createNavConfigFromLinks } from "@/lib/portal-navigation";
import { MAIN_NAV_LINKS } from "@/lib/navigation";
import { getPrimaryPortalRole } from "@/lib/nav-roles";

export function PortalShell({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const config = useMemo(
    () => createNavConfigFromLinks("Ordella", MAIN_NAV_LINKS),
    [],
  );
  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() ||
    user?.email ||
    getPrimaryPortalRole(user);

  return (
    <PortalNavigationShell
      portalId="legacy"
      config={config}
      displayName={displayName}
      requireRoles={false}
    >
      {children}
    </PortalNavigationShell>
  );
}
