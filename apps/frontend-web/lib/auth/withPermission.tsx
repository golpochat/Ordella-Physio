"use client";

import type { ComponentType, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { can, canAll, type PermissionValue } from "@/lib/permissions";
import { getStoredAuthUser, getStoredIsAuthenticated } from "@/lib/auth-storage";
import { useAuthStore } from "@/store/auth.store";

export type WithPermissionOptions = {
  permission: string;
  fallback?: ReactNode;
};

export function WithPermission({
  children,
  permission,
  fallback,
}: {
  children: ReactNode;
  permission: string;
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
  const allowed = authenticated && can(user, permission);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!authenticated || !user) {
      router.replace("/login");
      return;
    }

    if (!allowed) {
      router.replace("/access-denied");
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

export function withPermission<P extends object>(
  Component: ComponentType<P>,
  options: WithPermissionOptions,
): ComponentType<P> {
  return function PermissionProtectedComponent(props: P) {
    return (
      <WithPermission permission={options.permission} fallback={options.fallback}>
        <Component {...props} />
      </WithPermission>
    );
  };
}

export function IfHasPermission({
  children,
  permission,
}: {
  children: ReactNode;
  permission: string;
}) {
  const storeUser = useAuthStore((state) => state.user);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const user = storeUser ?? (hydrated ? getStoredAuthUser() : null);
  if (!hydrated || !can(user, permission)) {
    return null;
  }

  return <>{children}</>;
}

export function WithAllPermissions({
  children,
  permissions,
  fallback,
}: {
  children: ReactNode;
  permissions: string[];
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
  const allowed =
    authenticated && permissions.every((permission) => can(user, permission as PermissionValue));

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!authenticated || !user) {
      router.replace("/login");
      return;
    }

    if (!allowed) {
      router.replace("/access-denied");
    }
  }, [allowed, authenticated, hydrated, permissions, router, user]);

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
