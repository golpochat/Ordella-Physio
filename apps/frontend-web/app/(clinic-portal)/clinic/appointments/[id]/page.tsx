"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AIWorkflowSuggestions } from "@/components/ai/AIWorkflowSuggestions";
import { AppointmentAIInsights } from "@/components/ai/AppointmentAIInsights";
import { CopilotEntityProvider } from "@/components/ai/CopilotEntityContext";
import { AppointmentStatusActions } from "@/components/appointments/AppointmentStatusActions";
import { Button } from "@/components/ui/button";
import { ClinicAppointmentDetail } from "@/components/clinic-portal/appointment-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicAppointment } from "@/hooks/useClinicPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { parseAppointmentStatusActionErrors } from "@/lib/appointment-api-errors";
import type { ClinicAppointment } from "@/lib/clinic-portal-types";
import { ApiError } from "@/lib/api-client";

type ClinicAppointmentDetailPageProps = {
  params: { id: string };
};

export default function ClinicAppointmentDetailPage({ params }: ClinicAppointmentDetailPageProps) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useClinicAppointment(params.id);
  const [appointment, setAppointment] = useState<ClinicAppointment | null>(null);

  useEffect(() => {
    if (data) {
      setAppointment(data);
    }
  }, [data]);

  useEffect(() => {
    if (isLoading || !isError) {
      return;
    }

    const parsed = parseAppointmentStatusActionErrors(error);

    if (parsed.forbidden || parsed.tenantMismatch) {
      router.replace("/forbidden");
      return;
    }

    if (parsed.notFound) {
      toast.error(parsed.message ?? "Appointment does not exist.");
      router.replace("/clinic/appointments");
    }
  }, [error, isError, isLoading, router]);

  const detail = appointment ?? data ?? null;

  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/clinic/appointments">&larr; Back to appointments</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError && !(error instanceof ApiError) ? (
        <PageError onRetry={() => void refetch()} />
      ) : null}
      {!isLoading && !isError && detail ? (
        <CopilotEntityProvider entityType="appointment" entityId={detail.id}>
        <div className="space-y-4">
          <ClinicAppointmentDetail appointment={detail} />
          <AppointmentAIInsights appointmentId={detail.id} patientId={detail.patientId} />
          <AIWorkflowSuggestions
            entityType="appointment"
            entityId={detail.id}
            patientId={detail.patientId}
            appointmentId={detail.id}
          />
          <WithPermission permission="appointment.manage">
            <AppointmentStatusActions appointment={detail} onStatusChange={setAppointment} />
          </WithPermission>
        </div>
        </CopilotEntityProvider>
      ) : null}
      {!isLoading && !isError && !detail ? <PageError message="Appointment not found." /> : null}
    </>
  );
}
