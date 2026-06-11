"use client";

import { TherapistPatientList } from "@/components/therapist-portal/patient-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { useTherapistPatients } from "@/hooks/useTherapistPortal";

export default function TherapistPatientsPage() {
  const { data, isLoading, isError, refetch } = useTherapistPatients();

  return (
    <ListPage
      title="Patients"
      subtitle="Your active patient caseload."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <TherapistPatientList patients={data ?? []} />
    </ListPage>
  );
}
