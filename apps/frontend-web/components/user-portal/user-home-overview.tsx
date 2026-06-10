"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAppointmentList } from "@/components/user-portal/appointment-list";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import {
  useUserAppointments,
  useUserBilling,
  useUserNotes,
  useUserPortalContext,
} from "@/hooks/useUserPortal";
import { partitionUserAppointments } from "@/lib/user-portal-utils";

export function UserHomeOverview() {
  const { displayName } = useUserPortalContext();
  const appointmentsQuery = useUserAppointments();
  const billingQuery = useUserBilling();
  const notesQuery = useUserNotes();

  const isLoading =
    appointmentsQuery.isLoading || billingQuery.isLoading || notesQuery.isLoading;
  const isError =
    appointmentsQuery.isError || billingQuery.isError || notesQuery.isError;

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

  const { today, upcoming } = partitionUserAppointments(appointmentsQuery.data ?? []);
  const invoices = billingQuery.data ?? [];
  const notes = notesQuery.data ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Welcome, {displayName}</h1>
        <p className="text-muted-foreground">
          Your appointments, billing, and account information in one place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <Link href="/user/appointments">View all</Link>
          </Button>
        </div>
        <UserAppointmentList
          appointments={today}
          emptyTitle="No appointments today"
          emptyDescription="You have no sessions scheduled for today."
        />
      </section>

      <p className="text-sm text-muted-foreground">
        {notes.length} notes available for read-only reference.
      </p>
    </div>
  );
}
