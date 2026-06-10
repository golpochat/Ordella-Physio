"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { getStoredIsAuthenticated } from "@/lib/auth-storage";
import { getResolvedTenantId } from "@/lib/session-manager";
import { resolveUserRoles } from "@/lib/rbac";
import { useAuthStore } from "@/store/auth.store";

export type ProtectedRouteProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const router = useRouter();
  const storeAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const isAuthenticated = storeAuthenticated || (hydrated && getStoredIsAuthenticated());
  const roles = user ? resolveUserRoles(user) : [];
  const tenantId = hydrated ? getResolvedTenantId() : user?.tenantId ?? null;
  const requiresTenant = !roles.includes("SYSTEM");
  const hasValidSession = Boolean(isAuthenticated && user && (!requiresTenant || tenantId));

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
