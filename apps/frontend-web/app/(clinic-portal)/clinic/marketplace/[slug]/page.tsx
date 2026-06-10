"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ProviderDetail } from "@/components/marketplace/provider-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useMarketplaceProviders, useTenantIntegrations } from "@/hooks/useMarketplace";
import { Button } from "@/components/ui/button";

export default function ClinicMarketplaceProviderPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const providersQuery = useMarketplaceProviders();
  const integrationsQuery = useTenantIntegrations();

  if (providersQuery.isLoading || integrationsQuery.isLoading) {
    return <PageLoading rows={4} />;
  }

  if (providersQuery.isError || integrationsQuery.isError) {
    return (
      <PageError
        onRetry={() => {
          void providersQuery.refetch();
          void integrationsQuery.refetch();
        }}
      />
    );
  }

  const provider = providersQuery.data?.find((entry) => entry.slug === slug);

  if (!provider) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Provider not found.</p>
        <Button asChild variant="outline">
          <Link href="/clinic/marketplace">Back to marketplace</Link>
        </Button>
      </div>
    );
  }

  const integration = integrationsQuery.data?.find((entry) => entry.providerId === provider.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{provider.name}</h1>
          <p className="text-muted-foreground">Manage this integration for your clinic.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/clinic/marketplace">Back to marketplace</Link>
        </Button>
      </div>
      <ProviderDetail provider={provider} integration={integration} />
    </div>
  );
}
