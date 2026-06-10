import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import type { PatientAppointment } from "@/lib/patient-portal-types";
import { formatPatientDateTime } from "@/lib/patient-portal-utils";

export function AppointmentDetail({ appointment }: { appointment: PatientAppointment }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle>{appointment.type}</CardTitle>
          <Badge>{appointment.status}</Badge>
        </div>
      </CardHeader>
      <CardBody className="space-y-4 text-sm">
        <div>
          <p className="font-medium">When</p>
          <p className="text-muted-foreground">{formatPatientDateTime(appointment.startTime)}</p>
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
