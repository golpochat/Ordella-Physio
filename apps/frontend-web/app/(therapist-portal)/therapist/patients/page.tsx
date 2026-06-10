"use client";

import { TherapistPatientList } from "@/components/therapist-portal/patient-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useTherapistPatients } from "@/hooks/useTherapistPortal";

export default function TherapistPatientsPage() {
  const { data, isLoading, isError, refetch } = useTherapistPatients();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Patients</h1>
        <p className="text-muted-foreground">Your active patient caseload.</p>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <TherapistPatientList patients={data ?? []} /> : null}
    </div>
  );
}
