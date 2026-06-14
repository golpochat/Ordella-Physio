"use client";

import { StaffPatientList } from "@/components/staff-portal/patient-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { PortalReadOnlyBadge, PortalRoleGate } from "@/components/navigation/PortalRoleGate";
import { useStaffPatients } from "@/hooks/useStaffPortal";

export default function StaffPatientsPage() {
  const { data, isLoading, isError, refetch } = useStaffPatients();

  return (
    <ListPage
      title="Patient lookup"
      subtitle="Search and view patient records."
      action={
        <PortalRoleGate capability="patients:write" fallback={<PortalReadOnlyBadge />}>
          <span className="text-sm text-muted-foreground">Full patient management</span>
        </PortalRoleGate>
      }
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <StaffPatientList patients={data ?? []} />
    </ListPage>
  );
}
