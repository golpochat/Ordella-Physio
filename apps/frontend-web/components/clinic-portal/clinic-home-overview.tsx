"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { ClinicAppointmentList } from "@/components/clinic-portal/appointment-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import {
  useClinicAppointments,
  useClinicBilling,
  useClinicContext,
  useClinicPatients,
  useClinicTherapists,
} from "@/hooks/useClinicPortal";
import { partitionClinicAppointments } from "@/lib/clinic-portal-utils";

export function ClinicHomeOverview() {
  const { displayName } = useClinicContext();
  const appointmentsQuery = useClinicAppointments();
  const patientsQuery = useClinicPatients();
  const therapistsQuery = useClinicTherapists();
  const billingQuery = useClinicBilling();

  const isLoading =
    appointmentsQuery.isLoading ||
    patientsQuery.isLoading ||
    therapistsQuery.isLoading ||
    billingQuery.isLoading;
  const isError =
    appointmentsQuery.isError ||
    patientsQuery.isError ||
    therapistsQuery.isError ||
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
          void therapistsQuery.refetch();
          void billingQuery.refetch();
        }}
      />
    );
  }

  const { today, upcoming } = partitionClinicAppointments(appointmentsQuery.data ?? []);
  const patients = patientsQuery.data ?? [];
  const therapists = therapistsQuery.data ?? [];
  const invoices = billingQuery.data ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Welcome, {displayName}</h1>
        <p className="text-muted-foreground">
          Manage therapists, patients, appointments, and clinic operations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Therapists</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{therapists.length}</p>
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
            <CardTitle className="text-base">Today</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{today.length}</p>
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
            <Link href="/clinic/appointments">View all</Link>
          </Button>
        </div>
        <ClinicAppointmentList
          appointments={today}
          emptyTitle="No appointments today"
          emptyDescription="Scheduled visits will appear here."
        />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Upcoming appointments</h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/clinic/appointments">View all</Link>
          </Button>
        </div>
        <ClinicAppointmentList
          appointments={upcoming.slice(0, 3)}
          emptyTitle="No upcoming appointments"
          emptyDescription="Future sessions will appear here."
        />
      </section>
    </div>
  );
}
