"use client";

import { StaffAppointmentList } from "@/components/staff-portal/appointment-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { useStaffAppointments } from "@/hooks/useStaffPortal";
import { partitionStaffAppointments } from "@/lib/staff-portal-utils";

export default function StaffAppointmentsPage() {
  const { data, isLoading, isError, refetch } = useStaffAppointments();
  const { today, upcoming, past } = partitionStaffAppointments(data ?? []);

  return (
    <ListPage
      title="Appointments"
      subtitle="View clinic schedule for front-desk support."
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <section>
        <h2>Today</h2>
        <StaffAppointmentList
          appointments={today}
          emptyTitle="No appointments today"
          emptyDescription="Today's schedule is clear."
        />
      </section>
      <section>
        <h2>Upcoming</h2>
        <StaffAppointmentList
          appointments={upcoming}
          emptyTitle="No upcoming appointments"
          emptyDescription="Future sessions will appear here."
        />
      </section>
      <section>
        <h2>Past</h2>
        <StaffAppointmentList
          appointments={past}
          emptyTitle="No past appointments"
          emptyDescription="Completed sessions will appear here."
        />
      </section>
    </ListPage>
  );
}
