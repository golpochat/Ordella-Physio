"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { PatientAttachmentList } from "@/components/patients/attachments/PatientAttachmentList";
import { PatientAttachmentUploader } from "@/components/patients/attachments/PatientAttachmentUploader";
import { useClinicPatient, useClinicPatientAttachments } from "@/hooks/useClinicPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { parsePatientAttachmentListErrors } from "@/lib/clinic-patient-api-errors";
import { getPatientDisplayName } from "@/lib/clinic-portal-utils";

type ClinicPatientAttachmentsPageProps = {
  params: { id: string };
};

export default function ClinicPatientAttachmentsPage({ params }: ClinicPatientAttachmentsPageProps) {
  const router = useRouter();
  const patientQuery = useClinicPatient(params.id);
  const attachmentsQuery = useClinicPatientAttachments(params.id);

  useEffect(() => {
    if (!attachmentsQuery.error) {
      return;
    }

    const parsed = parsePatientAttachmentListErrors(attachmentsQuery.error);

    if (parsed.forbidden || parsed.tenantMismatch) {
      router.replace("/forbidden");
      return;
    }

    if (parsed.patientNotFound) {
      toast.error(parsed.toastError ?? "Patient does not exist.");
      router.replace("/clinic/patients");
      return;
    }

    if (parsed.toastError) {
      toast.error(parsed.toastError);
    }
  }, [attachmentsQuery.error, router]);

  const patientName = patientQuery.data?.patient
    ? getPatientDisplayName(patientQuery.data.patient)
    : "Patient";

  const attachments = attachmentsQuery.data?.data ?? [];

  return (
    <WithPermission permission="patient.attachments">
      <ListPage
        title={`Attachments — ${patientName}`}
        subtitle="Upload and manage patient documents and images."
        action={
          <Button asChild variant="ghost">
            <Link href={`/clinic/patients/${params.id}`}>&larr; Back to patient</Link>
          </Button>
        }
        isLoading={attachmentsQuery.isLoading || patientQuery.isLoading}
        isError={attachmentsQuery.isError}
        onRetry={() => void attachmentsQuery.refetch()}
        loadingRows={4}
      >
        <PatientAttachmentUploader
          patientId={params.id}
          disabled={attachmentsQuery.isFetching}
          onUploaded={() => void attachmentsQuery.refetch()}
        />

        <PatientAttachmentList
          patientId={params.id}
          attachments={attachments}
          isBusy={attachmentsQuery.isFetching}
          onChanged={() => void attachmentsQuery.refetch()}
        />
      </ListPage>
    </WithPermission>
  );
}
