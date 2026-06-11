"use client";

import { Card } from "@/components/dashboard/Card";
import { ListPage } from "@/components/dashboard/ListPage";
import { PlatformBillingOverview } from "@/components/super-admin-portal/billing-overview";
import { usePlatformBilling } from "@/hooks/useSuperAdminPortal";

export default function SuperAdminBillingPage() {
  const { data, isLoading, isError, refetch } = usePlatformBilling();
  const invoiceCount = Array.isArray(data) ? data.length : 0;

  return (
    <ListPage
      title="Billing"
      subtitle="Global billing overview across tenants."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <Card>
        <PlatformBillingOverview invoiceCount={invoiceCount} />
      </Card>
    </ListPage>
  );
}
