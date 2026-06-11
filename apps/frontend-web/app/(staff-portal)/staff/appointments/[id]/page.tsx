"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StaffAppointmentDetail } from "@/components/staff-portal/appointment-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useStaffAppointment } from "@/hooks/useStaffPortal";

type StaffAppointmentDetailPageProps = {
  params: { id: string };
};

export default function StaffAppointmentDetailPage({ params }: StaffAppointmentDetailPageProps) {
  const { data, isLoading, isError, refetch } = useStaffAppointment(params.id);

  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/staff/appointments">&larr; Back to appointments</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <StaffAppointmentDetail appointment={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Appointment not found." /> : null}
    </>
  );
}
