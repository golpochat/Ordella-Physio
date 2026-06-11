"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ProtectedRoute } from "@/components/navigation/protected-route";
import { RoleGuard } from "@/components/navigation/role-guard";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Topbar } from "@/components/navigation/Topbar";
import { useAuth } from "@/hooks/useAuth";
import {
  getPortalNavConfig,
  getPortalPageMeta,
  type PortalId,
  type PortalNavConfig,
} from "@/lib/portal-navigation";
import { getPrimaryPortalRole } from "@/lib/nav-roles";
import { TenantSuspendedBanner } from "@/components/tenants/TenantSuspendedBanner";
import { useUiStore } from "@/store/ui.store";
import { cn } from "@/lib/cn";

export type PortalNavigationShellProps = {
  portalId: PortalId;
  config?: PortalNavConfig;
  children: React.ReactNode;
  displayName?: string;
  requireRoles?: boolean;
};

function getDisplayName(
  user: ReturnType<typeof useAuth>["user"],
  fallback: string,
): string {
  const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim();
  return name || user?.email || fallback;
}

export function PortalNavigationShell({
  portalId,
  config: configProp,
  children,
  displayName: displayNameProp,
  requireRoles = true,
}: PortalNavigationShellProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const config = configProp ?? getPortalNavConfig(portalId);
  const mobileNavOpen = useUiStore((state) => state.mobileNavOpen);
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname, setMobileNavOpen]);

  const pageMeta = useMemo(
    () => getPortalPageMeta(portalId, pathname, config),
    [portalId, pathname, config],
  );

  const displayName =
    displayNameProp ?? getDisplayName(user, getPrimaryPortalRole(user));

  if (!hydrated) {
    return null;
  }

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={requireRoles && config.allowedRoles.length ? config.allowedRoles : undefined}>
        <div className={cn("dashboard-portal", portalId === "super-admin" && "super-admin-portal")}>
          <Sidebar
            config={config}
            displayName={displayName}
            email={user?.email}
          />

          {mobileNavOpen ? (
            <div className="nav-drawer-overlay md:hidden">
              <button
                type="button"
                className="nav-drawer-backdrop"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close navigation overlay"
              />
              <Sidebar
                config={config}
                displayName={displayName}
                email={user?.email}
                mobile
                onNavigate={() => setMobileNavOpen(false)}
              />
            </div>
          ) : null}

          <div className="dashboard-main">
            <Topbar
              title={pageMeta.title}
              settingsHref={config.settingsHref}
              profileHref={config.profileHref}
            />
            <main className="dashboard-content">
              <TenantSuspendedBanner />
              <div className="dashboard-page">{children}</div>
            </main>
          </div>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}
