"use client";

import { useEffect } from "react";
import { resolveScopedTenantId } from "@/lib/auth/portal-scope";
import { applyTenantTheme, resolveTenantTheme } from "@/lib/tenant";
import { useTenantStore } from "@/store/tenant.store";
import { useAuthStore } from "@/store/auth.store";

export function useTenant() {
  const tenant = useTenantStore((state) => state.tenant);
  const setTenant = useTenantStore((state) => state.setTenant);
  const user = useAuthStore((state) => state.user);
  const tenantId = resolveScopedTenantId(user?.role, tenant?.id, user?.tenantId);

  useEffect(() => {
    const theme = resolveTenantTheme(tenant);
    applyTenantTheme(theme);
  }, [tenant]);

  return {
    tenant,
    tenantId,
    setTenant,
    theme: resolveTenantTheme(tenant),
  };
}
