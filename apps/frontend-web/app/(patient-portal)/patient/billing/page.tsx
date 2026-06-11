"use client";

import { BillingList } from "@/components/patient-portal/billing-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { usePatientBilling } from "@/hooks/usePatientPortal";

export default function PatientBillingPage() {
  const { data, isLoading, isError, refetch } = usePatientBilling();

  return (
    <ListPage
      title="Billing history"
      subtitle="Review invoices and payment status."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <BillingList invoices={data ?? []} />
    </ListPage>
  );
}
