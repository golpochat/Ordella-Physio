"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { PrescriptionAuditPanel } from "@/components/clinic-pharmacy/audit-panel";
import { PrescriptionStatusBadge } from "@/components/clinic-pharmacy/status-badges";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import {
  useCancelClinicPrescription,
  useClinicPrescription,
  useClinicPrescriptionAuditLogs,
  useIssueClinicPrescription,
} from "@/hooks/useClinicPharmacy";
import { WithPermission } from "@/lib/auth/withPermission";
import { formatPortalDateTime } from "@/lib/pharmacy-portal-utils";
import { adminRoutes } from "@/lib/routes";

export default function ClinicPharmacyDetailPage() {
  const params = useParams<{ id: string }>();
  const prescriptionId = params.id;
  const { data, isLoading, isError, refetch } = useClinicPrescription(prescriptionId);
  const auditQuery = useClinicPrescriptionAuditLogs(prescriptionId);
  const issueMutation = useIssueClinicPrescription();
  const cancelMutation = useCancelClinicPrescription();

  async function handleIssue() {
    try {
      await issueMutation.mutateAsync(prescriptionId);
      toast.success("Prescription issued");
      void refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to issue prescription");
    }
  }

  async function handleCancel() {
    try {
      await cancelMutation.mutateAsync(prescriptionId);
      toast.success("Prescription cancelled");
      void refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to cancel prescription");
    }
  }

  return (
    <WithPermission permission="prescriptions.read">
      <ListPage
        title="Prescription detail"
        subtitle="Review prescription data, issue to pharmacy, and inspect audit history."
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
      >
        {data ? (
          <div className="space-y-6">
            <Card>
              <CardBody className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold">{data.medicationName}</h2>
                  <PrescriptionStatusBadge status={data.status} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {data.dosage} · {data.frequency} · {data.duration}
                </p>
                <p className="text-sm">Patient: {data.patientId}</p>
                <p className="text-sm">Therapist: {data.therapistId}</p>
                {data.notes ? <p className="text-sm">{data.notes}</p> : null}
                <p className="text-xs text-muted-foreground">
                  Created {formatPortalDateTime(data.createdAt)}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <WithPermission permission="prescriptions.issue">
                    <Button
                      type="button"
                      className="btn-primary"
                      disabled={data.status !== "DRAFT" || issueMutation.isPending}
                      onClick={() => void handleIssue()}
                    >
                      Issue prescription
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={
                        data.status === "DISPENSED" ||
                        data.status === "CANCELLED" ||
                        cancelMutation.isPending
                      }
                      onClick={() => void handleCancel()}
                    >
                      Cancel
                    </Button>
                  </WithPermission>
                  <Button asChild variant="secondary">
                    <Link href={adminRoutes.pharmacyFulfillment(prescriptionId)}>Fulfillment</Link>
                  </Button>
                </div>
              </CardBody>
            </Card>

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
