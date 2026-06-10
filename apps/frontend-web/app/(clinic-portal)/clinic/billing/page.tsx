"use client";

import { ClinicBillingList } from "@/components/clinic-portal/billing-list";
import { ClinicSubscriptionBillingPanel } from "@/components/clinic-portal/subscription-billing-panel";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicBilling } from "@/hooks/useClinicPortal";

export default function ClinicBillingPage() {
  const { data, isLoading, isError, refetch } = useClinicBilling();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="text-muted-foreground">
          Manage your platform subscription and review patient invoices.
        </p>
      </div>

      <ClinicSubscriptionBillingPanel />

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Patient Invoices</h2>
          <p className="text-sm text-muted-foreground">Clinical billing records for your clinic.</p>
        </div>
        {isLoading ? <PageLoading /> : null}
        {isError ? <PageError onRetry={() => void refetch()} /> : null}
        {!isLoading && !isError ? <ClinicBillingList invoices={data ?? []} /> : null}
      </div>
    </div>
  );
}
