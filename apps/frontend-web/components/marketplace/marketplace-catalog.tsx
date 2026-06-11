"use client";

import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { ProviderList } from "@/components/marketplace/provider-list";
import { useMarketplaceProviders, useTenantIntegrations } from "@/hooks/useMarketplace";

type MarketplaceCatalogProps = {
  detailBasePath: string;
  showTenantStatus?: boolean;
};

export function MarketplaceCatalog({
  detailBasePath,
  showTenantStatus = true,
}: MarketplaceCatalogProps) {
  const providersQuery = useMarketplaceProviders({ platformCatalog: !showTenantStatus });
  const integrationsQuery = useTenantIntegrations({ enabled: showTenantStatus });

  const isLoading = providersQuery.isLoading || (showTenantStatus && integrationsQuery.isLoading);
  const isError = providersQuery.isError || (showTenantStatus && integrationsQuery.isError);

  if (isLoading) {
    return <PageLoading rows={6} />;
  }

  if (isError) {
    return (
      <PageError
        onRetry={() => {
          void providersQuery.refetch();
          if (showTenantStatus) void integrationsQuery.refetch();
        }}
      />
    );
  }

  const providers = providersQuery.data ?? [];
  const integrations = showTenantStatus ? (integrationsQuery.data ?? []) : [];

  if (!providers.length) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        No marketplace providers are available yet.
      </div>
    );
  }

  return (
    <ProviderList
      providers={providers}
      integrations={integrations}
      detailBasePath={detailBasePath}
      showTenantStatus={showTenantStatus}
    />
  );
}
