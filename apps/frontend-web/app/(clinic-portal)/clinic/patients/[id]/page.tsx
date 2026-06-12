"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AIWorkflowSuggestions } from "@/components/ai/AIWorkflowSuggestions";
import { CopilotEntityProvider } from "@/components/ai/CopilotEntityContext";
import { PatientAIInsights } from "@/components/ai/PatientAIInsights";
import { ClinicPatientDetail } from "@/components/clinic-portal/patient-detail";
import { PatientStatusActions } from "@/components/patients/PatientStatusActions";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicPatient } from "@/hooks/useClinicPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { parsePatientFetchErrors } from "@/lib/clinic-patient-api-errors";
import type { ClinicPatient, ClinicPatientDetailResponse } from "@/lib/clinic-portal-types";
import { ApiError } from "@/lib/api-client";

type ClinicPatientDetailPageProps = {
  params: { id: string };
};

export default function ClinicPatientDetailPage({ params }: ClinicPatientDetailPageProps) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useClinicPatient(params.id);
  const [patient, setPatient] = useState<ClinicPatient | null>(null);

  useEffect(() => {
    if (data?.patient) {
      setPatient(data.patient);
    }
  }, [data]);

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

  const detail: ClinicPatientDetailResponse | null =
    patient && data ? { ...data, patient } : data ?? null;

  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/clinic/patients">&larr; Back to patients</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError && !(error instanceof ApiError) ? (
        <PageError onRetry={() => void refetch()} />
      ) : null}
      {!isLoading && !isError && detail ? (
        <CopilotEntityProvider entityType="patient" entityId={detail.patient.id}>
        <div className="space-y-4">
          <ClinicPatientDetail detail={detail} />
          <PatientAIInsights patientId={detail.patient.id} />
          <AIWorkflowSuggestions
            entityType="patient"
            entityId={detail.patient.id}
            patientId={detail.patient.id}
          />
          <WithPermission permission="patient.manage">
            <PatientStatusActions patient={detail.patient} onStatusChange={setPatient} />
          </WithPermission>
        </div>
        </CopilotEntityProvider>
      ) : null}
      {!isLoading && !isError && !detail ? <PageError message="Patient not found." /> : null}
    </>
  );
}
