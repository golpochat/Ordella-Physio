"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createApiClient } from "@/lib/api-client";
import {
  isSystemPortalUser,
  resolveScopedTenantId,
  shouldUseTenantScopedApi,
} from "@/lib/auth/portal-scope";
import { getApiClientContext } from "@/lib/api-session";
import { createMarketplaceApi } from "@/lib/marketplace-api";
import { useAuthStore } from "@/store/auth.store";
import { useTenantStore } from "@/store/tenant.store";

function useMarketplaceApi() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const userRole = useAuthStore((s) => s.user?.role);
  const userRoles = useAuthStore((s) => s.user?.roles);
  const userTenantId = useAuthStore((s) => s.user?.tenantId);
  const tenantFromStore = useTenantStore((s) => s.tenant?.id);
  const tenantId = resolveScopedTenantId(userRole, tenantFromStore, userTenantId);

  return useMemo(
    () => createMarketplaceApi(createApiClient(() => getApiClientContext())),
    [accessToken, tenantId, userRole, userRoles],
  );
}

export function useMarketplaceProviders(options?: {
  enabled?: boolean;
  platformCatalog?: boolean;
}) {
  const api = useMarketplaceApi();
  const userRole = useAuthStore((s) => s.user?.role);
  const tenantScoped = shouldUseTenantScopedApi(userRole);
  const platformCatalog = options?.platformCatalog ?? false;
  const canLoad =
    options?.enabled !== false &&
    Boolean(userRole) &&
    (platformCatalog ? isSystemPortalUser(userRole) : tenantScoped);

  return useQuery({
    queryKey: ["marketplace", "providers", platformCatalog ? "platform" : "tenant"],
    queryFn: () => api.listProviders(),
    enabled: canLoad,
  });
}

export function useTenantIntegrations(options?: { enabled?: boolean }) {
  const api = useMarketplaceApi();
  const userRole = useAuthStore((s) => s.user?.role);
  const userTenantId = useAuthStore((s) => s.user?.tenantId);
  const tenantFromStore = useTenantStore((s) => s.tenant?.id);
  const tenantId = resolveScopedTenantId(userRole, tenantFromStore, userTenantId);
  const tenantScoped = shouldUseTenantScopedApi(userRole);

  return useQuery({
    queryKey: ["marketplace", "tenant-integrations", tenantId],
    queryFn: () => api.listTenantIntegrations(),
    enabled: options?.enabled !== false && tenantScoped && Boolean(tenantId),
  });
}

export function useIntegrationUsageLogs(integrationId?: string) {
  const api = useMarketplaceApi();
  return useQuery({
    queryKey: ["marketplace", "usage-logs", integrationId],
    queryFn: () => api.usageLogs(integrationId),
  });
}

export function useConnectIntegration() {
  const api = useMarketplaceApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { providerId: string; apiKey?: string; apiSecret?: string }) =>
      api.connect(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["marketplace", "tenant-integrations"] });
    },
  });
}

export function useDisconnectIntegration() {
  const api = useMarketplaceApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (integrationId: string) => api.disconnect(integrationId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["marketplace", "tenant-integrations"] });
    },
  });
}
