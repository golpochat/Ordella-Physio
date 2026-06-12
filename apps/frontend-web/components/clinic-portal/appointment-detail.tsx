import Link from "next/link";
import { AppointmentStatusBadge } from "@/components/appointments/AppointmentStatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { IfHasPermission } from "@/lib/auth/withPermission";
import type { ClinicAppointment } from "@/lib/clinic-portal-types";
import { formatPortalDateTime } from "@/lib/clinic-portal-utils";

export function ClinicAppointmentDetail({ appointment }: { appointment: ClinicAppointment }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{appointment.type}</CardTitle>
            <AppointmentStatusBadge status={appointment.status} />
          </div>
          <div className="user-list-actions">
            <IfHasPermission permission="audit.view">
              <Button asChild variant="outline" size="sm">
                <Link href={`/clinic/appointments/${appointment.id}/audit`}>View audit log</Link>
              </Button>
            </IfHasPermission>
            <Button asChild variant="outline" size="sm">
              <Link href={`/clinic/appointments/${appointment.id}/reminders`}>Reminders</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`/clinic/appointments/${appointment.id}/edit`}>Edit appointment</Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="space-y-4 text-sm">
        <div>
          <p className="font-medium">When</p>
          <p className="text-muted-foreground">{formatPortalDateTime(appointment.startTime)}</p>
        </div>
        <div>
          <p className="font-medium">Patient</p>
          <p className="text-muted-foreground">{appointment.patientId}</p>
        </div>
        <div>
          <p className="font-medium">Therapist</p>
          <p className="text-muted-foreground">{appointment.therapistId}</p>
        </div>
        <div>
          <p className="font-medium">Location</p>
          <p className="text-muted-foreground">{appointment.locationId}</p>
        </div>
        {appointment.notes ? (
          <div>
            <p className="font-medium">Notes</p>
            <p className="text-muted-foreground">{appointment.notes}</p>
          </div>
        ) : null}
        {appointment.cancellationReason ? (
          <div>
            <p className="font-medium">Cancellation reason</p>
            <p className="text-muted-foreground">{appointment.cancellationReason}</p>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
}
