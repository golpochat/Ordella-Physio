"use client";

import { StaffPatientList } from "@/components/staff-portal/patient-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useStaffPatients } from "@/hooks/useStaffPortal";

export default function StaffPatientsPage() {
  const { data, isLoading, isError, refetch } = useStaffPatients();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Patient lookup</h1>
        <p className="text-muted-foreground">Read-only access to patient records.</p>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError ? <StaffPatientList patients={data ?? []} /> : null}
    </div>
  );
}
