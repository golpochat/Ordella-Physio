"use client";

import { PlatformBillingOverview } from "@/components/super-admin-portal/billing-overview";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError } from "@/components/patient-portal/page-state";
import { usePlatformBilling } from "@/hooks/useSuperAdminPortal";

export default function SuperAdminBillingPage() {
  const { data: metrics, isLoading, isError, refetch } = usePlatformBilling();
  const showError = isError || (!isLoading && metrics == null);

  return (
    <>
      <PageHeader
        title="Billing"
        subtitle="Stripe-live platform revenue and subscription metrics. No plan estimates or database-derived values."
      />

      {showError ? (
        <PageError
          message="Unable to load Stripe-live platform metrics. Verify billing-service credentials and super-admin access."
          onRetry={() => void refetch()}
        />
      ) : (
        <PlatformBillingOverview metrics={metrics ?? null} isLoading={isLoading} />
      )}
    </>
  );
}
