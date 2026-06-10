"use client";

import { PharmacyPatientList } from "@/components/pharmacy-portal/patient-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePharmacyPatients } from "@/hooks/usePharmacyPortal";

export default function PharmacyPatientsPage() {
  const { data, isLoading, isError, refetch } = usePharmacyPatients();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Patient lookup</h1>
        <p className="text-muted-foreground">Read-only access to patient records.</p>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <PharmacyPatientList patients={data ?? []} /> : null}
    </div>
  );
}
