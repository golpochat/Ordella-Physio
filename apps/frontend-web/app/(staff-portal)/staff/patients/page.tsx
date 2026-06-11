"use client";

import { StaffPatientList } from "@/components/staff-portal/patient-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { useStaffPatients } from "@/hooks/useStaffPortal";

export default function StaffPatientsPage() {
  const { data, isLoading, isError, refetch } = useStaffPatients();

  return (
    <ListPage
      title="Patient lookup"
      subtitle="Read-only access to patient records."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <StaffPatientList patients={data ?? []} />
    </ListPage>
  );
}
