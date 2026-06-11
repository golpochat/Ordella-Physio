"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@ordella/shared-ui";
import { ProtectedRoute } from "@/components/navigation/protected-route";
import { Topbar } from "@/components/layout/topbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { DASHBOARD_NAV_LINKS, getDashboardTitle } from "@/lib/dashboard-nav";
import { resolveUserRoles } from "@/lib/rbac";
import { getPortalForRole } from "@/lib/auth/roleRedirect";
import { getStoredAuthUser } from "@/lib/auth-storage";
import { useAuthStore } from "@/store/auth.store";
import { useUiStore } from "@/store/ui.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const storeUser = useAuthStore((state) => state.user);
  const collapsed = useUiStore((state) => state.sidebarCollapsed);
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
  const primaryRole = roles[0] ?? "Guest";
  const dashboardTitle = getDashboardTitle(pathname);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <aside
          className={cn(
            "hidden border-r bg-card md:flex md:flex-col",
            collapsed ? "w-16" : "w-64",
          )}
        >
          <div className={cn("border-b p-4", collapsed && "px-2 text-center")}>
            {!collapsed ? (
              <>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Role
                </p>
                <p className="text-sm font-semibold">{primaryRole}</p>
                <p className="mt-1 text-xs text-muted-foreground">{dashboardTitle}</p>
              </>
            ) : (
              <p className="text-xs font-semibold">{primaryRole.charAt(0)}</p>
            )}
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-3">
            {DASHBOARD_NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {collapsed ? link.label.charAt(0) : link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <MobileNav links={DASHBOARD_NAV_LINKS} />

        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
