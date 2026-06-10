"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { IntegrationStatusBadge } from "@/components/marketplace/integration-status-badge";
import type { IntegrationProvider, TenantIntegration } from "@/lib/marketplace-types";

type ProviderListProps = {
  providers: IntegrationProvider[];
  integrations: TenantIntegration[];
  detailBasePath: string;
  showTenantStatus?: boolean;
};

function findIntegration(integrations: TenantIntegration[], providerId: string) {
  return integrations.find((entry) => entry.providerId === providerId);
}

export function ProviderList({
  providers,
  integrations,
  detailBasePath,
  showTenantStatus = true,
}: ProviderListProps) {
  const categories = [...new Set(providers.map((provider) => provider.category))].sort();

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <section key={category} className="space-y-4">
          <h2 className="text-lg font-semibold">{category}</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {providers
              .filter((provider) => provider.category === category)
              .map((provider) => {
                const integration = findIntegration(integrations, provider.id);
                const href = `${detailBasePath}/${provider.slug}`;

                return (
                  <Link key={provider.id} href={href} className="block">
                    <Card className="h-full transition-colors hover:border-primary/40">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-base">{provider.name}</CardTitle>
                          <Badge variant="outline">{provider.authType}</Badge>
                        </div>
                      </CardHeader>
                      <CardBody className="space-y-3 text-sm text-muted-foreground">
                        <p>{provider.description}</p>
                        {showTenantStatus && integration ? (
                          <IntegrationStatusBadge status={integration.status} />
                        ) : null}
                        {showTenantStatus && !integration ? (
                          <Badge variant="secondary">Not connected</Badge>
                        ) : null}
                      </CardBody>
                    </Card>
                  </Link>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}
