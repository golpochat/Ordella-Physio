"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePlatformSystemHealth } from "@/hooks/useSuperAdminPortal";

export function PlatformSystemHealth() {
  const { data, isLoading, isError, refetch } = usePlatformSystemHealth();

  if (isLoading) {
    return <PageLoading rows={4} />;
  }

  if (isError) {
    return <PageError onRetry={() => void refetch()} />;
  }

  const services = data ?? [];

  return (
    <div className="space-y-3">
      {services.map((service) => (
        <Card key={service.service}>
          <CardBody className="flex items-center justify-between gap-4">
            <p className="font-medium">{service.service}</p>
            <Badge>{service.status}</Badge>
          </CardBody>
        </Card>
      ))}
      <p className="text-sm text-muted-foreground">
        Health checks probe service `/health` endpoints. Unknown status means the route is not yet
        exposed or reachable.
      </p>
    </div>
  );
}
