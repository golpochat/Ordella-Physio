"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentList } from "@/components/patient-portal/appointment-list";
import { BillingList } from "@/components/patient-portal/billing-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import {
  usePatientAppointments,
  usePatientBilling,
  usePatientContext,
  usePatientNotes,
} from "@/hooks/usePatientPortal";
import { splitAppointments } from "@/lib/patient-portal-utils";

export function PatientHomeOverview() {
  const { displayName } = usePatientContext();
  const appointmentsQuery = usePatientAppointments();
  const billingQuery = usePatientBilling();
  const notesQuery = usePatientNotes();

  const isLoading = appointmentsQuery.isLoading || billingQuery.isLoading || notesQuery.isLoading;
  const isError = appointmentsQuery.isError || billingQuery.isError || notesQuery.isError;

  if (isLoading) {
    return <PageLoading rows={5} />;
  }

  if (isError) {
    return (
      <PageError
        onRetry={() => {
          void appointmentsQuery.refetch();
          void billingQuery.refetch();
          void notesQuery.refetch();
        }}
      />
    );
  }

  const { upcoming, past } = splitAppointments(appointmentsQuery.data ?? []);
  const invoices = billingQuery.data ?? [];
  const notes = notesQuery.data ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Welcome back, {displayName}</h1>
        <p className="text-muted-foreground">
          Your appointments, billing, and care notes in one place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            <CardTitle className="text-base">Past visits</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{past.length}</p>
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
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notes</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{notes.length}</p>
          </CardBody>
        </Card>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Upcoming appointments</h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/patient/appointments">View all</Link>
          </Button>
        </div>
        <AppointmentList
          appointments={upcoming.slice(0, 3)}
          emptyTitle="No upcoming appointments"
          emptyDescription="Book your next session through the clinic."
        />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Recent billing</h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/patient/billing">View all</Link>
          </Button>
        </div>
        <BillingList invoices={invoices.slice(0, 3)} />
      </section>
    </div>
  );
}
