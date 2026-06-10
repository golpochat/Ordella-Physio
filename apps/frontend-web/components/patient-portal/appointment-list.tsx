"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import type { PatientAppointment } from "@/lib/patient-portal-types";
import { formatPatientDateTime } from "@/lib/patient-portal-utils";

export type AppointmentListProps = {
  appointments: PatientAppointment[];
  detailBasePath?: string;
  emptyTitle?: string;
  emptyDescription?: string;
};

export function AppointmentList({
  appointments,
  detailBasePath = "/patient/appointments",
  emptyTitle = "No appointments",
  emptyDescription = "You do not have any appointments in this section yet.",
}: AppointmentListProps) {
  if (!appointments.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">{emptyTitle}</p>
        <p className="mt-2">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {appointments.map((appointment) => (
        <Card key={appointment.id}>
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{appointment.type}</p>
                <Badge>{appointment.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {formatPatientDateTime(appointment.startTime)}
              </p>
            </div>
            <Link
              href={`${detailBasePath}/${appointment.id}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              View details
            </Link>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
