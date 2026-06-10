"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ProviderDetail } from "@/components/marketplace/provider-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useMarketplaceProviders } from "@/hooks/useMarketplace";
import { Button } from "@/components/ui/button";

export default function SuperAdminMarketplaceProviderPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const providersQuery = useMarketplaceProviders();

  if (providersQuery.isLoading) {
    return <PageLoading rows={4} />;
  }

  if (providersQuery.isError) {
    return <PageError onRetry={() => void providersQuery.refetch()} />;
  }

  const provider = providersQuery.data?.find((entry) => entry.slug === slug);

  if (!provider) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Provider not found.</p>
        <Button asChild variant="outline">
          <Link href="/super-admin/marketplace">Back to marketplace</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{provider.name}</h1>
          <p className="text-muted-foreground">Provider configuration and availability.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/super-admin/marketplace">Back to marketplace</Link>
        </Button>
      </div>
      <ProviderDetail provider={provider} allowConnect={false} />
    </div>
  );
}
