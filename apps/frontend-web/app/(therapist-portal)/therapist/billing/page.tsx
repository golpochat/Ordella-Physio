"use client";

import { TherapistBillingList } from "@/components/therapist-portal/billing-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { useTherapistBilling } from "@/hooks/useTherapistPortal";

export default function TherapistBillingPage() {
  const { data, isLoading, isError, refetch } = useTherapistBilling();

  return (
    <ListPage
      title="Billing"
      subtitle="View patient invoices and payment status."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <TherapistBillingList invoices={data ?? []} />
    </ListPage>
  );
}
