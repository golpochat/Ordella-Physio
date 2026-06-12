"use client";

import Link from "next/link";
import { EntityAuditLogPanel } from "@/components/audit/EntityAuditLogPanel";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useClinicAppointment } from "@/hooks/useClinicPortal";
import { WithAllPermissions } from "@/lib/auth/withPermission";
import { formatPortalDateTime } from "@/lib/clinic-portal-utils";

type ClinicAppointmentAuditPageProps = {
  params: { id: string };
};

export default function ClinicAppointmentAuditPage({ params }: ClinicAppointmentAuditPageProps) {
  const appointmentQuery = useClinicAppointment(params.id);
  const appointmentLabel = appointmentQuery.data
    ? `${appointmentQuery.data.type} · ${formatPortalDateTime(appointmentQuery.data.startTime)}`
    : "Appointment";

  return (
    <WithAllPermissions permissions={["appointment.manage", "audit.view"]}>
      <ListPage
        title={`Audit log — ${appointmentLabel}`}
        subtitle="Immutable activity history for this appointment."
        action={
          <Button asChild variant="ghost">
            <Link href={`/clinic/appointments/${params.id}`}>&larr; Back to appointment</Link>
          </Button>
        }
        isLoading={appointmentQuery.isLoading}
        isError={appointmentQuery.isError}
        onRetry={() => void appointmentQuery.refetch()}
        loadingRows={4}
      >
        <EntityAuditLogPanel entityType="APPOINTMENT" entityId={params.id} />
      </ListPage>
    </WithAllPermissions>
  );
}
