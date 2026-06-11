"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PortalNavigationShell } from "@/components/navigation/PortalNavigationShell";
import { getPortalForRole } from "@/lib/auth/roleRedirect";
import { getStoredAuthUser } from "@/lib/auth-storage";
import { createNavConfigFromLinks } from "@/lib/portal-navigation";
import { DASHBOARD_NAV_LINKS, getDashboardTitle } from "@/lib/dashboard-nav";
import { resolveUserRoles } from "@/lib/rbac";
import { useAuthStore } from "@/store/auth.store";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const storeUser = useAuthStore((state) => state.user);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const user = storeUser ?? (hydrated ? getStoredAuthUser() : null);
  const roles = user ? resolveUserRoles(user) : [];

  useEffect(() => {
    if (!hydrated || !roles.includes("SYSTEM")) {
      return;
    }

    router.replace(getPortalForRole("SYSTEM"));
  }, [hydrated, roles, router]);

  const config = useMemo(
    () => createNavConfigFromLinks("Dashboard", DASHBOARD_NAV_LINKS),
    [],
  );

  const displayName = roles[0] ?? "Guest";
  const pageTitle = getDashboardTitle(pathname);

  if (!hydrated) {
    return null;
  }

  return (
    <PortalNavigationShell
      portalId="legacy"
      config={{
        ...config,
        brandTitle: pageTitle,
      }}
      displayName={displayName}
      requireRoles={false}
    >
      {children}
    </PortalNavigationShell>
  );
}
