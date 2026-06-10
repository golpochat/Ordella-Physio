"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import type { TherapistAppointment } from "@/lib/therapist-portal-types";
import { formatPortalDateTime } from "@/lib/therapist-portal-utils";

export type TherapistAppointmentListProps = {
  appointments: TherapistAppointment[];
  emptyTitle?: string;
  emptyDescription?: string;
};

export function TherapistAppointmentList({
  appointments,
  emptyTitle = "No appointments",
  emptyDescription = "Scheduled visits will appear here.",
}: TherapistAppointmentListProps) {
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
                {formatPortalDateTime(appointment.startTime)}
              </p>
              <p className="text-sm text-muted-foreground">Patient: {appointment.patientId}</p>
            </div>
            <Link
              href={`/therapist/appointments/${appointment.id}`}
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
