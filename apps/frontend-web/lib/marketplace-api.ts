import type { createApiClient } from "@/lib/api-client";
import type {
  ConnectIntegrationResponse,
  IntegrationProvider,
  IntegrationUsageLog,
  TenantIntegration,
} from "@/lib/marketplace-types";

export type MarketplaceApiClient = ReturnType<typeof createApiClient>;

export function createMarketplaceApi(api: MarketplaceApiClient) {
  return {
    listProviders() {
      return api.get<IntegrationProvider[]>("marketplace", "/providers");
    },

    listTenantIntegrations() {
      return api.get<TenantIntegration[]>("marketplace", "/tenant-integrations");
    },

    connect(payload: { providerId: string; apiKey?: string; apiSecret?: string }) {
      return api.post<ConnectIntegrationResponse>(
        "marketplace",
        "/tenant-integrations/connect",
        payload,
      );
    },

    disconnect(integrationId: string) {
      return api.post<{ disconnected: boolean; integrationId: string }>(
        "marketplace",
        "/tenant-integrations/disconnect",
        { integrationId },
      );
    },

    usageLogs(integrationId?: string) {
      return api.get<IntegrationUsageLog[]>("marketplace", "/usage-logs", {
        params: integrationId ? { integrationId } : undefined,
      });
    },
  };
}
