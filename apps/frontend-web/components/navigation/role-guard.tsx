"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { canAccessRoute, type PortalRole } from "@/lib/rbac";
import { useAuthStore } from "@/store/auth.store";

export type RoleGuardProps = {
  children: ReactNode;
  allowedRoles?: PortalRole[];
};

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const roles = user?.roles ?? [];

  const hasAccess =
    (!allowedRoles || allowedRoles.some((role) => roles.includes(role))) &&
    canAccessRoute(pathname, roles);

  useEffect(() => {
    if (user && !hasAccess) {
      router.replace("/");
    }
  }, [hasAccess, router, user]);

  if (!user || !hasAccess) {
    return null;
  }

  return <>{children}</>;
}
