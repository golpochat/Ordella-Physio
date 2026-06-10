"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createApiClient } from "@/lib/api-client";
import { createMarketplaceApi } from "@/lib/marketplace-api";
import { useAuthStore } from "@/store/auth.store";

function useMarketplaceApi() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const tenantId = useAuthStore((s) => s.user?.tenantId);

  return useMemo(
    () =>
      createMarketplaceApi(
        createApiClient(() => ({
          accessToken,
          tenantId,
        })),
      ),
    [accessToken, tenantId],
  );
}

export function useMarketplaceProviders() {
  const api = useMarketplaceApi();
  return useQuery({
    queryKey: ["marketplace", "providers"],
    queryFn: () => api.listProviders(),
  });
}

export function useTenantIntegrations() {
  const api = useMarketplaceApi();
  return useQuery({
    queryKey: ["marketplace", "tenant-integrations"],
    queryFn: () => api.listTenantIntegrations(),
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
