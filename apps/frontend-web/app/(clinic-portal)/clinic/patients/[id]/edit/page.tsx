"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { PatientEditForm } from "@/components/patients/PatientEditForm";
import { useClinicPatient } from "@/hooks/useClinicPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { parsePatientFetchErrors } from "@/lib/clinic-patient-api-errors";
import { ApiError } from "@/lib/api-client";

type ClinicPatientEditPageProps = {
  params: { id: string };
};

export default function ClinicPatientEditPage({ params }: ClinicPatientEditPageProps) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useClinicPatient(params.id);

  const patientName = data?.patient
    ? `${data.patient.firstName} ${data.patient.lastName}`.trim()
    : "Patient";

  useEffect(() => {
    if (isLoading || !isError) {
      return;
    }

    const parsed = parsePatientFetchErrors(error);

    if (parsed.forbidden || parsed.tenantMismatch) {
      router.replace("/forbidden");
      return;
    }

    if (parsed.notFound) {
      toast.error(parsed.message ?? "Patient does not exist.");
      router.replace("/clinic/patients");
    }
  }, [error, isError, isLoading, router]);

  return (
    <WithPermission permission="patient.manage">
      <PageHeader
        title={data?.patient ? `Edit — ${patientName}` : "Edit patient"}
        subtitle="Update patient demographics, contact details, and insurance."
        action={
          <Button asChild variant="ghost">
            <Link href={`/clinic/patients/${params.id}`}>&larr; Back to patient</Link>
          </Button>
        }
      />

      {isLoading ? <PageLoading rows={4} /> : null}
      {isError && !(error instanceof ApiError) ? (
        <PageError onRetry={() => void refetch()} />
      ) : null}
      {!isLoading && !isError && data ? <PatientEditForm detail={data} /> : null}
    </WithPermission>
  );
}
