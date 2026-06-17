"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { OrganizationSubscriptionBillingPanel } from "@/components/organization-portal/OrganizationSubscriptionBillingPanel";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useBillingContext } from "@/hooks/useClinicPortal";

export default function OrganizationBillingPage() {
  const router = useRouter();
  const billingContextQuery = useBillingContext();
  const context = billingContextQuery.data;

  useEffect(() => {
    if (context?.billingModel === "tenant-level") {
      router.replace("/clinic/billing");
    }
  }, [context?.billingModel, router]);

  if (billingContextQuery.isLoading) {
    return <PageLoading />;
  }

  if (billingContextQuery.isError) {
    return <PageError onRetry={() => void billingContextQuery.refetch()} />;
  }

  if (context?.billingModel !== "organization-level") {
    return <PageLoading />;
  }

  return <OrganizationSubscriptionBillingPanel />;
}
