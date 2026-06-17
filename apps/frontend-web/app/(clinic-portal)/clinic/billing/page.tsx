"use client";

import { BillingManagedByOrganization } from "@/components/billing/BillingManagedByOrganization";
import { ClinicSubscriptionBillingPanel } from "@/components/clinic-portal/subscription-billing-panel";
import { ClinicBillingList } from "@/components/clinic-portal/billing-list";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useBillingContext, useClinicBilling } from "@/hooks/useClinicPortal";

export default function ClinicBillingPage() {
  const billingContextQuery = useBillingContext();
  const { data, isLoading, isError, refetch } = useClinicBilling();

  const context = billingContextQuery.data;
  const isOrganizationBilling = context?.billingModel === "organization-level";

  return (
    <>
      <PageHeader
        title="Billing"
        subtitle={
          isOrganizationBilling
            ? "Patient invoices for your clinic. Platform billing is managed by your organization."
            : "Manage your platform subscription and review patient invoices."
        }
      />

      {billingContextQuery.isLoading ? <PageLoading /> : null}
      {billingContextQuery.isError ? (
        <PageError onRetry={() => void billingContextQuery.refetch()} />
      ) : null}

      {!billingContextQuery.isLoading && !billingContextQuery.isError ? (
        isOrganizationBilling && context ? (
          <BillingManagedByOrganization context={context} />
        ) : (
          <ClinicSubscriptionBillingPanel />
        )
      ) : null}

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
