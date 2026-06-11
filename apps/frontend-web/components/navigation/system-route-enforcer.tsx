"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getStoredAuthUser, getStoredIsAuthenticated } from "@/lib/auth-storage";
import { getPortalForRole, isSystemRole } from "@/lib/auth/roleRedirect";
import { resolveUserRoles } from "@/lib/rbac";
import { isPublicPath } from "@/lib/session-manager";
import { useAuthStore } from "@/store/auth.store";

const SUPER_ADMIN_PREFIX = "/super-admin";

function isSystemSession(user: { role?: string; roles?: string[] } | null): boolean {
  if (!user) {
    return false;
  }

  if (isSystemRole(user.role)) {
    return true;
  }

  return resolveUserRoles(user).includes("SYSTEM");
}

export function SystemRouteEnforcer() {
  const router = useRouter();
  const pathname = usePathname();
  const storeUser = useAuthStore((state) => state.user);
  const storeAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || isPublicPath(pathname)) {
      return;
    }

    const user = storeUser ?? getStoredAuthUser();
    const authenticated = storeAuthenticated || getStoredIsAuthenticated();

    if (!authenticated || !user || !isSystemSession(user)) {
      return;
    }

    if (!pathname.startsWith(SUPER_ADMIN_PREFIX)) {
      router.replace(getPortalForRole("SYSTEM"));
    }
  }, [hydrated, pathname, router, storeAuthenticated, storeUser]);

  return null;
}
