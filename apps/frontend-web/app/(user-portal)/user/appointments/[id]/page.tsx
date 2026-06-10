"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserAppointmentDetail } from "@/components/user-portal/appointment-detail";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useUserAppointment } from "@/hooks/useUserPortal";

type UserAppointmentDetailPageProps = {
  params: { id: string };
};

export default function UserAppointmentDetailPage({ params }: UserAppointmentDetailPageProps) {
  const { data, isLoading, isError, refetch } = useUserAppointment(params.id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/user/appointments">&larr; Back to appointments</Link>
      </Button>

      {isLoading ? <PageLoading rows={2} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <UserAppointmentDetail appointment={data} /> : null}
      {!isLoading && !isError && !data ? <PageError message="Appointment not found." /> : null}
    </div>
  );
}
