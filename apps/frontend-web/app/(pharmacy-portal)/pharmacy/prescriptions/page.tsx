"use client";

import { PharmacyPrescriptionList } from "@/components/pharmacy-portal/prescription-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { usePharmacyPrescriptions } from "@/hooks/usePharmacyPortal";

export default function PharmacyPrescriptionsPage() {
  const { data, isLoading, isError, refetch } = usePharmacyPrescriptions();

  return (
    <ListPage
      title="Prescription requests"
      subtitle="Review incoming prescription requests from clinicians."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <PharmacyPrescriptionList prescriptions={data ?? []} />
    </ListPage>
  );
}
