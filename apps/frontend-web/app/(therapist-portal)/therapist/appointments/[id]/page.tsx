"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TherapistAppointmentDetail } from "@/components/therapist-portal/appointment-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useTherapistAppointment } from "@/hooks/useTherapistPortal";

type TherapistAppointmentDetailPageProps = {
  params: { id: string };
};

export default function TherapistAppointmentDetailPage({
  params,
}: TherapistAppointmentDetailPageProps) {
  const { data, isLoading, isError, refetch } = useTherapistAppointment(params.id);

  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/therapist/appointments">&larr; Back to appointments</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <TherapistAppointmentDetail appointment={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Appointment not found." /> : null}
    </>
  );
}
