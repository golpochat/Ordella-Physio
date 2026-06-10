"use client";

import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { createApiClient } from "@/lib/api-client";
import { useAuthStore } from "@/store/auth.store";
import { useTenantStore } from "@/store/tenant.store";
import { useUiStore } from "@/store/ui.store";

export function useApi() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const userTenantId = useAuthStore((state) => state.user?.tenantId);
  const tenantId = useTenantStore((state) => state.tenant?.id) ?? userTenantId;
  const correlationId = useUiStore((state) => state.correlationId);

  return useMemo(
    () =>
      createApiClient(() => ({
        accessToken,
        tenantId: tenantId ?? null,
        correlationId: correlationId ?? uuidv4(),
      })),
    [accessToken, tenantId, userTenantId, correlationId],
  );
}
