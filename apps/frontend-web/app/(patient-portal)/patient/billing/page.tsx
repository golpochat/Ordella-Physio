"use client";

import { BillingList } from "@/components/patient-portal/billing-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePatientBilling } from "@/hooks/usePatientPortal";

export default function PatientBillingPage() {
  const { data, isLoading, isError, refetch } = usePatientBilling();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Billing history</h1>
        <p className="text-muted-foreground">Review invoices and payment status.</p>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <BillingList invoices={data ?? []} /> : null}
    </div>
  );
}
