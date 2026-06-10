"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "@ordella/shared-icons";
import { cn } from "@ordella/shared-ui";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/navigation/protected-route";
import { RoleGuard } from "@/components/navigation/role-guard";
import { useAuth } from "@/hooks/useAuth";
import { usePatientContext } from "@/hooks/usePatientPortal";
import { PortalMessagingActions } from "@/components/messaging/portal-messaging-actions";
import { PortalNotificationActions } from "@/components/notifications/portal-notification-actions";
import { PATIENT_PORTAL_NAV } from "@/lib/patient-portal-nav";
import { useUiStore } from "@/store/ui.store";
import { useState } from "react";

export function PatientPortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { user, displayName } = usePatientContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const collapsed = useUiStore((state) => state.sidebarCollapsed);

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["PATIENT"]}>
        <div className="flex min-h-screen">
          <aside
            className={cn(
              "hidden border-r bg-card md:flex md:flex-col",
              collapsed ? "w-16" : "w-64",
            )}
          >
            <div className={cn("border-b p-4", collapsed && "px-2")}>
              {!collapsed ? (
                <>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Patient Portal
                  </p>
                  <p className="text-sm font-semibold">{displayName}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </>
              ) : (
                <p className="text-center text-xs font-semibold">P</p>
              )}
            </div>
            <nav className="flex flex-1 flex-col gap-1 p-3">
              {PATIENT_PORTAL_NAV.map((link) => {
                const active =
                  link.href === "/patient"
                    ? pathname === "/patient"
                    : pathname === link.href || pathname.startsWith(`${link.href}/`);

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
            {!collapsed ? (
              <div className="border-t p-3">
                <Button className="w-full" variant="outline" onClick={() => void logout()}>
                  Logout
                </Button>
              </div>
            ) : null}
          </aside>

          <div className="flex min-h-screen flex-1 flex-col">
            <header className="hidden h-14 items-center justify-end gap-1 border-b bg-card px-4 md:flex">
              <PortalNotificationActions />
              <PortalMessagingActions />
            </header>
            <header className="flex h-14 items-center justify-between border-b bg-card px-4 md:hidden">
              <div>
                <p className="text-sm font-semibold">{displayName}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <div className="flex items-center gap-1">
                <PortalNotificationActions />
                <PortalMessagingActions />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileOpen((open) => !open)}
                  aria-label="Toggle navigation"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </header>

            {mobileOpen ? (
              <div className="border-b bg-card p-4 md:hidden">
                <nav className="flex flex-col gap-1">
                  {PATIENT_PORTAL_NAV.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button className="mt-2" variant="outline" onClick={() => void logout()}>
                    Logout
                  </Button>
                </nav>
              </div>
            ) : null}

            <main className="flex-1 p-4 sm:p-6">{children}</main>
          </div>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}
