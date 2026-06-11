"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ProviderDetail } from "@/components/marketplace/provider-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useMarketplaceProviders } from "@/hooks/useMarketplace";
import { Button } from "@/components/ui/button";

export default function SuperAdminMarketplaceProviderPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const providersQuery = useMarketplaceProviders({ platformCatalog: true });

  if (providersQuery.isLoading) {
    return (
      <>
        <PageHeader
          title="Marketplace"
          subtitle="Provider configuration and availability."
        />
        <PageLoading rows={4} />
      </>
    );
  }

  if (providersQuery.isError) {
    return (
      <>
        <PageHeader
          title="Marketplace"
          subtitle="Provider configuration and availability."
          action={
            <Button asChild variant="outline">
              <Link href="/super-admin/marketplace">Back to marketplace</Link>
            </Button>
          }
        />
        <PageError onRetry={() => void providersQuery.refetch()} />
      </>
    );
  }

  const provider = providersQuery.data?.find((entry) => entry.slug === slug);

  if (!provider) {
    return (
      <>
        <PageHeader
          title="Provider not found"
          subtitle="The requested marketplace provider could not be loaded."
          action={
            <Button asChild variant="outline">
              <Link href="/super-admin/marketplace">Back to marketplace</Link>
            </Button>
          }
        />
        <PageError message="Provider not found." />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={provider.name}
        subtitle="Provider configuration and availability."
        action={
          <Button asChild variant="outline">
            <Link href="/super-admin/marketplace">Back to marketplace</Link>
          </Button>
        }
      />
      <Card>
        <ProviderDetail provider={provider} allowConnect={false} />
      </Card>
    </>
  );
}
