"use client";

import { OrganizationSubscriptionBillingPanel } from "@/components/organization-portal/OrganizationSubscriptionBillingPanel";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useBillingContext } from "@/hooks/useClinicPortal";

export default function OrganizationBillingPage() {
  const billingContextQuery = useBillingContext();
  const context = billingContextQuery.data;

  if (billingContextQuery.isLoading) {
    return <PageLoading />;
  }

  if (billingContextQuery.isError) {
    return <PageError onRetry={() => void billingContextQuery.refetch()} />;
  }

  if (context?.billingModel !== "organization-level") {
    return (
      <div className="tenant-create-form-empty-state">
        <p>Organization-level billing is not enabled for this workspace.</p>
      </div>
    );
  }

  return <OrganizationSubscriptionBillingPanel />;
}
