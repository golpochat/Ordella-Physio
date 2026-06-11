"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ProviderDetail } from "@/components/marketplace/provider-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useMarketplaceProviders, useTenantIntegrations } from "@/hooks/useMarketplace";
import { Button } from "@/components/ui/button";

export default function ClinicMarketplaceProviderPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const providersQuery = useMarketplaceProviders();
  const integrationsQuery = useTenantIntegrations();

  const backAction = (
    <Button asChild variant="outline">
      <Link href="/clinic/marketplace">Back to marketplace</Link>
    </Button>
  );

  if (providersQuery.isLoading || integrationsQuery.isLoading) {
    return (
      <>
        <PageHeader
          title="Integration"
          subtitle="Manage this integration for your clinic."
          action={backAction}
        />
        <PageLoading rows={4} />
      </>
    );
  }

  if (providersQuery.isError || integrationsQuery.isError) {
    return (
      <>
        <PageHeader
          title="Integration"
          subtitle="Manage this integration for your clinic."
          action={backAction}
        />
        <PageError
          onRetry={() => {
            void providersQuery.refetch();
            void integrationsQuery.refetch();
          }}
        />
      </>
    );
  }

  const provider = providersQuery.data?.find((entry) => entry.slug === slug);

  if (!provider) {
    return (
      <>
        <PageHeader title="Provider not found" action={backAction} />
        <p>Provider not found.</p>
      </>
    );
  }

  const integration = integrationsQuery.data?.find((entry) => entry.providerId === provider.id);

  return (
    <>
      <PageHeader
        title={provider.name}
        subtitle="Manage this integration for your clinic."
        action={backAction}
      />
      <ProviderDetail provider={provider} integration={integration} />
    </>
  );
}
