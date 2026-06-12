"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FileList } from "@/components/files/FileList";
import { FileUploadField } from "@/components/files/FileUploadField";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useClinicPatient } from "@/hooks/useClinicPortal";
import { WithAllPermissions } from "@/lib/auth/withPermission";
import { getPatientDisplayName } from "@/lib/clinic-portal-utils";

type ClinicPatientAttachmentsPageProps = {
  params: { id: string };
};

export default function ClinicPatientAttachmentsPage({ params }: ClinicPatientAttachmentsPageProps) {
  const router = useRouter();
  const patientQuery = useClinicPatient(params.id);
  const [fileListKey, setFileListKey] = useState(0);

  useEffect(() => {
    if (!patientQuery.error) {
      return;
    }

    router.replace("/clinic/patients");
    toast.error("Patient does not exist.");
  }, [patientQuery.error, router]);

  const patientName = patientQuery.data?.patient
    ? getPatientDisplayName(patientQuery.data.patient)
    : "Patient";

  return (
    <WithAllPermissions permissions={["patient.attachments", "files.view"]}>
      <ListPage
        title={`Attachments — ${patientName}`}
        subtitle="Upload and manage patient documents via secure file storage."
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
        <WithAllPermissions permissions={["files.upload"]}>
          <FileUploadField
            entityType="PATIENT"
            entityId={params.id}
            onUploaded={() => setFileListKey((value) => value + 1)}
          />
        </WithAllPermissions>

        <FileList key={fileListKey} entityType="PATIENT" entityId={params.id} />
      </ListPage>
    </WithAllPermissions>
  );
}
