"use client";

import type { ComponentType, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { userMeetsMinRoleLevel } from "@/lib/auth/role-levels";
import { getStoredAuthUser, getStoredIsAuthenticated } from "@/lib/auth-storage";
import { useAuthStore } from "@/store/auth.store";

export type WithRoleOptions = {
  minRoleLevel: number;
  fallback?: ReactNode;
};

export function WithRole({
  children,
  minRoleLevel,
  fallback,
}: {
  children: ReactNode;
  minRoleLevel: number;
  fallback?: ReactNode;
}) {
  const router = useRouter();
  const storeUser = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const user = storeUser ?? (hydrated ? getStoredAuthUser() : null);
  const authenticated = isAuthenticated || (hydrated ? getStoredIsAuthenticated() : false);
  const allowed = authenticated && userMeetsMinRoleLevel(user, minRoleLevel);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!authenticated || !user) {
      router.replace("/login");
      return;
    }

    if (!allowed) {
      router.replace("/forbidden");
    }
  }, [allowed, authenticated, hydrated, router, user]);

  if (!hydrated || !user || !allowed) {
    return (
      fallback ?? (
        <div className="auth-mfa-loading">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      )
    );
  }

  return <>{children}</>;
}

export function withRole<P extends object>(
  Component: ComponentType<P>,
  options: WithRoleOptions,
): ComponentType<P> {
  return function RoleProtectedComponent(props: P) {
    return (
      <WithRole minRoleLevel={options.minRoleLevel} fallback={options.fallback}>
        <Component {...props} />
      </WithRole>
    );
  };
}
