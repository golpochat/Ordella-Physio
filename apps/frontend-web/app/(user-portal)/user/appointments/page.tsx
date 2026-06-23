"use client";

import { ListPage } from "@/components/dashboard/ListPage";
import { UserAppointmentList } from "@/components/user-portal/appointment-list";
import { useUserAppointments } from "@/hooks/useUserPortal";
import { partitionUserAppointments } from "@/lib/user-portal-utils";

export default function UserAppointmentsPage() {
  const { data, isLoading, isError, refetch } = useUserAppointments();
  const { today, upcoming, past } = partitionUserAppointments(data ?? []);

  return (
    <ListPage
      title="Appointments"
      subtitle="Read-only view of your scheduled visits."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <section>
        <h2>Today</h2>
        <UserAppointmentList
          appointments={today}
          emptyTitle="No appointments today"
          emptyDescription="You have nothing scheduled for today."
        />
      </section>
      <section>
        <h2>Upcoming</h2>
        <UserAppointmentList
          appointments={upcoming}
          emptyTitle="No upcoming appointments"
          emptyDescription="Future sessions will appear here."
        />
      </section>
      <section>
        <h2>Past</h2>
        <UserAppointmentList
          appointments={past}
          emptyTitle="No past appointments"
          emptyDescription="Completed sessions will appear here."
        />
      </section>
    </ListPage>
  );
}
