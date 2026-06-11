"use client";

import { PharmacyPatientList } from "@/components/pharmacy-portal/patient-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { usePharmacyPatients } from "@/hooks/usePharmacyPortal";

export default function PharmacyPatientsPage() {
  const { data, isLoading, isError, refetch } = usePharmacyPatients();

  return (
    <ListPage
      title="Patient lookup"
      subtitle="Read-only access to patient records."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <PharmacyPatientList patients={data ?? []} />
    </ListPage>
  );
}
