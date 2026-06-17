"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FulfillmentWorkflow } from "@/components/clinic-pharmacy/fulfillment-workflow";
import { PrescriptionAuditPanel } from "@/components/clinic-pharmacy/audit-panel";
import { PrescriptionStatusBadge } from "@/components/clinic-pharmacy/status-badges";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import {
  useClinicPrescription,
  useClinicPrescriptionAuditLogs,
} from "@/hooks/useClinicPharmacy";
import { WithPermission } from "@/lib/auth/withPermission";
import { adminRoutes } from "@/lib/routes";

export default function ClinicPharmacyFulfillmentPage() {
  const params = useParams<{ id: string }>();
  const prescriptionId = params.id;
  const { data, isLoading, isError, refetch } = useClinicPrescription(prescriptionId);
  const auditQuery = useClinicPrescriptionAuditLogs(prescriptionId);

  return (
    <WithPermission permission="prescriptions.read">
      <ListPage
        title="Fulfillment workflow"
        subtitle="Staff fulfillment actions for issued prescriptions."
        action={
          <Button asChild variant="secondary">
            <Link href={adminRoutes.pharmacyPrescription(prescriptionId)}>Back to prescription</Link>
          </Button>
        }
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
      >
        {data ? (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold">{data.medicationName}</h2>
              <PrescriptionStatusBadge status={data.status} />
            </div>

            <FulfillmentWorkflow prescription={data} />

            <section className="space-y-3">
              <h3 className="font-medium">Audit log</h3>
              <PrescriptionAuditPanel logs={auditQuery.data ?? []} />
            </section>
          </div>
        ) : null}
      </ListPage>
    </WithPermission>
  );
}
