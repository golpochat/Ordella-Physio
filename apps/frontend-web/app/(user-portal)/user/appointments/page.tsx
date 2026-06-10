"use client";

import { UserAppointmentList } from "@/components/user-portal/appointment-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useUserAppointments } from "@/hooks/useUserPortal";
import { partitionUserAppointments } from "@/lib/user-portal-utils";

export default function UserAppointmentsPage() {
  const { data, isLoading, isError, refetch } = useUserAppointments();
  const { today, upcoming, past } = partitionUserAppointments(data ?? []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <p className="text-muted-foreground">Read-only view of your scheduled visits.</p>
      </div>

      {isLoading ? <PageLoading /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}

      {!isLoading && !isError ? (
        <>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Today</h2>
            <UserAppointmentList
              appointments={today}
              emptyTitle="No appointments today"
              emptyDescription="You have nothing scheduled for today."
            />
          </section>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Upcoming</h2>
            <UserAppointmentList
              appointments={upcoming}
              emptyTitle="No upcoming appointments"
              emptyDescription="Future sessions will appear here."
            />
          </section>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Past</h2>
            <UserAppointmentList
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
