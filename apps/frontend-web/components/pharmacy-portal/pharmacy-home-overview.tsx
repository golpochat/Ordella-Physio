"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import {
  usePharmacyAppointments,
  usePharmacyBilling,
  usePharmacyContext,
  usePharmacyFulfillmentOrders,
  usePharmacyPatients,
  usePharmacyPrescriptions,
} from "@/hooks/usePharmacyPortal";
import { getTodaysAppointments } from "@/lib/pharmacy-portal-utils";

export function PharmacyHomeOverview() {
  const { displayName } = usePharmacyContext();
  const prescriptionsQuery = usePharmacyPrescriptions();
  const fulfillmentQuery = usePharmacyFulfillmentOrders();
  const patientsQuery = usePharmacyPatients();
  const appointmentsQuery = usePharmacyAppointments();
  const billingQuery = usePharmacyBilling();

  const isLoading =
    prescriptionsQuery.isLoading ||
    fulfillmentQuery.isLoading ||
    patientsQuery.isLoading ||
    appointmentsQuery.isLoading ||
    billingQuery.isLoading;
  const isError =
    prescriptionsQuery.isError ||
    fulfillmentQuery.isError ||
    patientsQuery.isError ||
    appointmentsQuery.isError ||
    billingQuery.isError;

  if (isLoading) {
    return <PageLoading rows={5} />;
  }

  if (isError) {
    return (
      <PageError
        onRetry={() => {
          void prescriptionsQuery.refetch();
          void fulfillmentQuery.refetch();
          void patientsQuery.refetch();
          void appointmentsQuery.refetch();
          void billingQuery.refetch();
        }}
      />
    );
  }

  const prescriptions = prescriptionsQuery.data ?? [];
  const fulfillment = fulfillmentQuery.data ?? [];
  const patients = patientsQuery.data ?? [];
  const appointments = appointmentsQuery.data ?? [];
  const invoices = billingQuery.data ?? [];
  const pendingRx = prescriptions.filter((item) => item.status === "PENDING").length;
  const activeFulfillment = fulfillment.filter(
    (item) => item.status !== "DELIVERED",
  ).length;
  const todaysAppointments = getTodaysAppointments(appointments);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Welcome, {displayName}</h1>
        <p className="text-muted-foreground">
          Prescription requests, fulfillment, and patient lookup for your pharmacy.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending Rx</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{pendingRx}</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Fulfillment</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{activeFulfillment}</p>
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
            <CardTitle className="text-base">Today&apos;s visits</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{todaysAppointments.length}</p>
          </CardBody>
        </Card>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Quick actions</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/pharmacy/prescriptions">Prescriptions</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/pharmacy/fulfillment">Fulfillment</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/pharmacy/patients">Patient lookup</Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {invoices.length} billing records available for view-only reference.
        </p>
      </section>
    </div>
  );
}
