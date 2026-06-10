"use client";

import Link from "next/link";
import { ClinicAppointmentList } from "@/components/clinic-portal/appointment-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { Button } from "@/components/ui/button";
import { useClinicAppointments } from "@/hooks/useClinicPortal";
import { partitionClinicAppointments } from "@/lib/clinic-portal-utils";

export default function ClinicAppointmentsPage() {
  const { data, isLoading, isError, refetch } = useClinicAppointments();
  const { today, upcoming, past } = partitionClinicAppointments(data ?? []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Appointments</h1>
          <p className="text-muted-foreground">View and oversee all clinic appointments.</p>
        </div>
        <Button asChild>
          <Link href="/clinic/appointments/create">Schedule appointment</Link>
        </Button>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}

      {!isLoading && !isError ? (
        <>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Today</h2>
            <ClinicAppointmentList
              appointments={today}
              emptyTitle="No appointments today"
              emptyDescription="Today's schedule is clear."
            />
          </section>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Upcoming</h2>
            <ClinicAppointmentList
              appointments={upcoming}
              emptyTitle="No upcoming appointments"
              emptyDescription="Future sessions will appear here."
            />
          </section>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Past</h2>
            <ClinicAppointmentList
              appointments={past}
              emptyTitle="No past appointments"
              emptyDescription="Completed sessions will appear here."
            />
          </section>
        </>
      ) : null}
    </div>
  );
}
