"use client";

import Link from "next/link";
import { ClinicAppointmentList } from "@/components/clinic-portal/appointment-list";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useClinicAppointments } from "@/hooks/useClinicPortal";
import { partitionClinicAppointments } from "@/lib/clinic-portal-utils";

export default function ClinicAppointmentsPage() {
  const { data, isLoading, isError, refetch } = useClinicAppointments();
  const { today, upcoming, past } = partitionClinicAppointments(data ?? []);

  return (
    <ListPage
      title="Appointments"
      subtitle="View and oversee all clinic appointments."
      action={
        <Button asChild>
          <Link href="/clinic/appointments/create">Schedule appointment</Link>
        </Button>
      }
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      <section>
        <h2>Today</h2>
        <ClinicAppointmentList
          appointments={today}
          emptyTitle="No appointments today"
          emptyDescription="Today's schedule is clear."
        />
      </section>
      <section>
        <h2>Upcoming</h2>
        <ClinicAppointmentList
          appointments={upcoming}
          emptyTitle="No upcoming appointments"
          emptyDescription="Future sessions will appear here."
        />
      </section>
      <section>
        <h2>Past</h2>
        <ClinicAppointmentList
          appointments={past}
          emptyTitle="No past appointments"
          emptyDescription="Completed sessions will appear here."
        />
      </section>
    </ListPage>
  );
}
