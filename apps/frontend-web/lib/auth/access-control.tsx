"use client";

import type { ReactNode } from "react";
import type { AuthPermission } from "@/lib/auth/permissions";
import { userHasPermission } from "@/lib/auth/permissions";
import { userMeetsMinRoleLevel } from "@/lib/auth/role-levels";
import { useAuthStore } from "@/store/auth.store";

export function CanAccess({
  children,
  permission,
  minRoleLevel,
  fallback = null,
}: {
  children: ReactNode;
  permission?: AuthPermission;
  minRoleLevel?: number;
  fallback?: ReactNode;
}) {
  const user = useAuthStore((state) => state.user);

  const allowedByPermission = permission ? userHasPermission(user, permission) : true;
  const allowedByRole =
    minRoleLevel !== undefined ? userMeetsMinRoleLevel(user, minRoleLevel) : true;

  if (!allowedByPermission || !allowedByRole) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
