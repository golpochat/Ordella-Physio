"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { StaffAppointmentList } from "@/components/staff-portal/appointment-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import {
  useStaffAppointments,
  useStaffBilling,
  useStaffContext,
  useStaffNotes,
  useStaffPatients,
} from "@/hooks/useStaffPortal";
import { partitionStaffAppointments } from "@/lib/staff-portal-utils";

export function StaffHomeOverview() {
  const { displayName } = useStaffContext();
  const appointmentsQuery = useStaffAppointments();
  const patientsQuery = useStaffPatients();
  const notesQuery = useStaffNotes();
  const billingQuery = useStaffBilling();

  const isLoading =
    appointmentsQuery.isLoading ||
    patientsQuery.isLoading ||
    notesQuery.isLoading ||
    billingQuery.isLoading;
  const isError =
    appointmentsQuery.isError ||
    patientsQuery.isError ||
    notesQuery.isError ||
    billingQuery.isError;

  if (isLoading) {
    return <PageLoading rows={5} />;
  }

  if (isError) {
    return (
      <PageError
        onRetry={() => {
          void appointmentsQuery.refetch();
          void patientsQuery.refetch();
          void notesQuery.refetch();
          void billingQuery.refetch();
        }}
      />
    );
  }

  const { today, upcoming } = partitionStaffAppointments(appointmentsQuery.data ?? []);
  const patients = patientsQuery.data ?? [];
  const notes = notesQuery.data ?? [];
  const invoices = billingQuery.data ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Welcome, {displayName}</h1>
        <p className="text-muted-foreground">
          Front-desk support for scheduling, patients, and clinic coordination.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Today</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{today.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upcoming</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{upcoming.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Patients</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{patients.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Invoices</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{invoices.length}</p>
          </CardBody>
        </Card>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Today&apos;s appointments</h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/staff/appointments">View all</Link>
          </Button>
        </div>
        <StaffAppointmentList
          appointments={today}
          emptyTitle="No appointments today"
          emptyDescription="The clinic schedule is clear for today."
        />
      </section>

      <p className="text-sm text-muted-foreground">
        {notes.length} clinical notes available for read-only reference.
      </p>
    </div>
  );
}
