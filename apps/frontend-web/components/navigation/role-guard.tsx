"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { canAccessRoute, resolveUserRoles, type PortalRole } from "@/lib/rbac";
import { isSystemRole } from "@/lib/auth/roleRedirect";
import { getStoredAuthUser, getStoredIsAuthenticated } from "@/lib/auth-storage";
import { getResolvedTenantId } from "@/lib/session-manager";
import { useAuthStore } from "@/store/auth.store";
import { Skeleton } from "@/components/ui/skeleton";

export type RoleGuardProps = {
  children: ReactNode;
  allowedRoles?: PortalRole[];
};

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const storeUser = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const storedAuthenticated = hydrated ? getStoredIsAuthenticated() : false;
  const user = storeUser ?? (hydrated ? getStoredAuthUser() : null);
  const authenticated = isAuthenticated || storedAuthenticated;
  const roles = user ? resolveUserRoles(user) : [];

  const tenantId = hydrated ? getResolvedTenantId() : user?.tenantId ?? null;
  const systemUser = isSystemRole(user?.role) || roles.includes("SYSTEM");
  const requiresTenant = !systemUser;
  const hasTenant = !requiresTenant || Boolean(tenantId);

  const hasAccess =
    authenticated &&
    user &&
    hasTenant &&
    (!allowedRoles || allowedRoles.some((role) => roles.includes(role))) &&
    canAccessRoute(pathname, roles);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!authenticated || !user) {
      router.replace("/login");
      return;
    }

    if (!hasAccess) {
      router.replace("/forbidden");
    }
  }, [authenticated, hasAccess, hydrated, roles, router, user]);

  if (!hydrated || !user || !hasAccess) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-96" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return <>{children}</>;
}
