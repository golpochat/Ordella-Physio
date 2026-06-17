"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { PortalCapability } from "@/lib/portal-capabilities";
import { portalHasCapability } from "@/lib/portal-capabilities";
import { resolveUserRoles, type PortalRole } from "@/lib/rbac";

export type PortalRoleGateProps = {
  capability?: PortalCapability | string;
  roles?: PortalRole[];
  fallback?: ReactNode;
  children: ReactNode;
};

export function PortalRoleGate({
  capability,
  roles: requiredRoles,
  fallback = null,
  children,
}: PortalRoleGateProps) {
  const { user } = useAuth();
  const roles = user ? resolveUserRoles(user) : [];
  const permissions = user?.permissions ?? [];
  const effectiveRole = user?.effectiveRole;

  if (requiredRoles?.length && !requiredRoles.some((role) => roles.includes(role))) {
    return <>{fallback}</>;
  }

  if (capability && !portalHasCapability(roles, capability, permissions, effectiveRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export function PortalReadOnlyBadge() {
  return <span className="dashboard-badge-muted">Read-only</span>;
}
