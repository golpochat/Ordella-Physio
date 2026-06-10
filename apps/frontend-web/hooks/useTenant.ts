"use client";

import { useEffect } from "react";
import { applyTenantTheme, resolveTenantTheme } from "@/lib/tenant";
import { useTenantStore } from "@/store/tenant.store";
import { useAuthStore } from "@/store/auth.store";

export function useTenant() {
  const tenant = useTenantStore((state) => state.tenant);
  const setTenant = useTenantStore((state) => state.setTenant);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const theme = resolveTenantTheme(tenant);
    applyTenantTheme(theme);
  }, [tenant]);

  return {
    tenant,
    tenantId: tenant?.id ?? user?.tenantId ?? null,
    setTenant,
    theme: resolveTenantTheme(tenant),
  };
}
