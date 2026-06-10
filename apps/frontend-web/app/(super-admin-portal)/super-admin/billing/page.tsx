"use client";

import { PlatformBillingOverview } from "@/components/super-admin-portal/billing-overview";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePlatformBilling } from "@/hooks/useSuperAdminPortal";

export default function SuperAdminBillingPage() {
  const { data, isLoading, isError, refetch } = usePlatformBilling();
  const invoiceCount = Array.isArray(data) ? data.length : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="text-muted-foreground">Global billing overview across tenants.</p>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <PlatformBillingOverview invoiceCount={invoiceCount} /> : null}
    </div>
  );
}
