"use client";

import { Card } from "@/components/dashboard/Card";
import { ListPage } from "@/components/dashboard/ListPage";
import { PlatformBillingOverview } from "@/components/super-admin-portal/billing-overview";
import { usePlatformBilling } from "@/hooks/useSuperAdminPortal";

export default function SuperAdminBillingPage() {
  const { data: metrics, isLoading, isError, refetch } = usePlatformBilling();

  return (
    <ListPage
      title="Billing"
      subtitle="Global billing overview across tenants."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <Card>
        <PlatformBillingOverview metrics={metrics ?? null} />
      </Card>
    </ListPage>
  );
}
