"use client";

import Link from "next/link";
import { EntityAuditLogPanel } from "@/components/audit/EntityAuditLogPanel";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useClinicPatient } from "@/hooks/useClinicPortal";
import { WithAllPermissions } from "@/lib/auth/withPermission";
import { getPatientDisplayName } from "@/lib/clinic-portal-utils";

type ClinicPatientAuditPageProps = {
  params: { id: string };
};

export default function ClinicPatientAuditPage({ params }: ClinicPatientAuditPageProps) {
  const patientQuery = useClinicPatient(params.id);
  const patientName = patientQuery.data?.patient
    ? getPatientDisplayName(patientQuery.data.patient)
    : "Patient";

  return (
    <WithAllPermissions permissions={["patient.view", "audit.view"]}>
      <ListPage
        title={`Audit log — ${patientName}`}
        subtitle="Immutable activity history for this patient."
        action={
          <Button asChild variant="ghost">
            <Link href={`/clinic/patients/${params.id}`}>&larr; Back to patient</Link>
          </Button>
        }
        isLoading={patientQuery.isLoading}
        isError={patientQuery.isError}
        onRetry={() => void patientQuery.refetch()}
        loadingRows={4}
      >
        <EntityAuditLogPanel entityType="PATIENT" entityId={params.id} />
      </ListPage>
    </WithAllPermissions>
  );
}
