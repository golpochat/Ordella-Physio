"use client";

import { ClinicBillingList } from "@/components/clinic-portal/billing-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicBilling } from "@/hooks/useClinicPortal";

export default function ClinicBillingPage() {
  const { data, isLoading, isError, refetch } = useClinicBilling();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="text-muted-foreground">Review invoices and payment status.</p>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <ClinicBillingList invoices={data ?? []} /> : null}
    </div>
  );
}
