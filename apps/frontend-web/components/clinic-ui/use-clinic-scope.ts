"use client";

import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";
import {
  getPortalCapabilities,
  portalHasCapability,
  type PortalCapability,
} from "@/lib/portal-capabilities";
import { resolveUserRoles, type PortalRole } from "@/lib/rbac";

export function useClinicScope() {
  const { user } = useAuth();
  const { tenant, tenantId, theme } = useTenant();
  const roles: PortalRole[] = user ? resolveUserRoles(user) : [];
  const capabilities = getPortalCapabilities(roles);

  function can(capability: PortalCapability): boolean {
    return portalHasCapability(roles, capability);
  }

  return {
    user,
    tenant,
    tenantId,
    theme,
    roles,
    capabilities,
    can,
    hasTenant: Boolean(tenantId),
    isReadOnly: (capability: PortalCapability) => !can(capability),
  };
}
