"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { getStoredIsAuthenticated } from "@/lib/auth-storage";
import { isSystemRole } from "@/lib/auth/roleRedirect";
import { getResolvedTenantId } from "@/lib/session-manager";
import { resolveUserRoles } from "@/lib/rbac";
import { useAuthStore } from "@/store/auth.store";

export type ProtectedRouteProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const storeAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const isAuthenticated = storeAuthenticated || (hydrated && getStoredIsAuthenticated());
  const roles = user ? resolveUserRoles(user) : [];
  const tenantId = hydrated ? getResolvedTenantId() : user?.tenantId ?? null;
  const systemUser = isSystemRole(user?.role) || roles.includes("SYSTEM");
  const requiresTenant = !systemUser;
  const hasValidSession = Boolean(isAuthenticated && user && (!requiresTenant || tenantId));

  useEffect(() => {
    if (!hydrated || !isAuthenticated || !user) {
      return;
    }

    if (user.role !== "SYSTEM" && !tenantId) {
      router.replace("/login?reason=missing-tenant");
      return;
    }

    if (systemUser && !pathname.startsWith("/super-admin")) {
      router.replace("/super-admin");
    }
  }, [hydrated, isAuthenticated, pathname, router, systemUser, tenantId, user]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!hasValidSession) {
      router.replace("/login");
    }
  }, [hasValidSession, hydrated, router]);

  if (!hydrated || !hasValidSession) {
    return (
      fallback ?? (
        <div className="space-y-3 p-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full" />
        </div>
      )
    );
  }

  return <>{children}</>;
}
