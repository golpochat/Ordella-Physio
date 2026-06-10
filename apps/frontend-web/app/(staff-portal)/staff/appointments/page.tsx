"use client";

import { StaffAppointmentList } from "@/components/staff-portal/appointment-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useStaffAppointments } from "@/hooks/useStaffPortal";
import { partitionStaffAppointments } from "@/lib/staff-portal-utils";

export default function StaffAppointmentsPage() {
  const { data, isLoading, isError, refetch } = useStaffAppointments();
  const { today, upcoming, past } = partitionStaffAppointments(data ?? []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <p className="text-muted-foreground">View clinic schedule for front-desk support.</p>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}

      {!isLoading && !isError ? (
        <>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Today</h2>
            <StaffAppointmentList
              appointments={today}
              emptyTitle="No appointments today"
              emptyDescription="Today's schedule is clear."
            />
          </section>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Upcoming</h2>
            <StaffAppointmentList
              appointments={upcoming}
              emptyTitle="No upcoming appointments"
              emptyDescription="Future sessions will appear here."
            />
          </section>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Past</h2>
            <StaffAppointmentList
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
