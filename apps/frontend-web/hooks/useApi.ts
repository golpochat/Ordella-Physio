"use client";

import { useEffect, useMemo, useState } from "react";
import { createApiClient } from "@/lib/api-client";
import { getApiClientContext } from "@/lib/api-session";
import { useAuthStore } from "@/store/auth.store";
import { useTenantStore } from "@/store/tenant.store";
import { useUiStore } from "@/store/ui.store";
import { useTenant } from "@/hooks/useTenant";

export function useApi() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const userRole = useAuthStore((state) => state.user?.role);
  const userRoles = useAuthStore((state) => state.user?.roles);
  const userTenantId = useAuthStore((state) => state.user?.tenantId);
  const tenantId = useTenantStore((state) => state.tenant?.id) ?? userTenantId;
  const correlationId = useUiStore((state) => state.correlationId);

  return useMemo(() => createApiClient(() => getApiClientContext(correlationId)), [
    accessToken,
    correlationId,
    tenantId,
    userRole,
    userRoles,
    userTenantId,
  ]);
}

/** Wait for persisted auth + tenant before firing tenant-scoped API queries. */
export function useQueryAuthReady(): boolean {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { tenantId } = useTenant();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated && isAuthenticated && Boolean(accessToken) && Boolean(tenantId);
}
