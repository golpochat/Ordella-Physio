"use client";

import { useMemo } from "react";
import { createApiClient } from "@/lib/api-client";
import { getApiClientContext } from "@/lib/api-session";
import { useAuthStore } from "@/store/auth.store";
import { useTenantStore } from "@/store/tenant.store";
import { useUiStore } from "@/store/ui.store";

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
