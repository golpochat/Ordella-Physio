"use client";

import { TherapistBillingList } from "@/components/therapist-portal/billing-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useTherapistBilling } from "@/hooks/useTherapistPortal";

export default function TherapistBillingPage() {
  const { data, isLoading, isError, refetch } = useTherapistBilling();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="text-muted-foreground">View patient invoices and payment status.</p>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <TherapistBillingList invoices={data ?? []} /> : null}
    </div>
  );
}
