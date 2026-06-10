"use client";

import { useTenantStore } from "@/store/tenant.store";
import { useAuthStore } from "@/store/auth.store";

export function useTenant() {
  const tenant = useTenantStore((state) => state.tenant);
  const setTenant = useTenantStore((state) => state.setTenant);
  const clearTenant = useTenantStore((state) => state.clearTenant);
  const userTenantId = useAuthStore((state) => state.user?.tenantId ?? null);

  return {
    tenant,
    tenantId: tenant?.id ?? userTenantId,
    setTenant,
    clearTenant,
  };
}
