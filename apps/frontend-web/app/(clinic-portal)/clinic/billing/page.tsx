"use client";

import { ClinicBillingList } from "@/components/clinic-portal/billing-list";
import { ClinicSubscriptionBillingPanel } from "@/components/clinic-portal/subscription-billing-panel";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicBilling } from "@/hooks/useClinicPortal";

export default function ClinicBillingPage() {
  const { data, isLoading, isError, refetch } = useClinicBilling();

  return (
    <>
      <PageHeader
        title="Billing"
        subtitle="Manage your platform subscription and review patient invoices."
      />

      <ClinicSubscriptionBillingPanel />

      <section>
        <h2>Patient Invoices</h2>
        <p>Clinical billing records for your clinic.</p>
        {isLoading ? <PageLoading /> : null}
        {isError ? <PageError onRetry={() => void refetch()} /> : null}
        {!isLoading && !isError ? <ClinicBillingList invoices={data ?? []} /> : null}
      </section>
    </>
  );
}
