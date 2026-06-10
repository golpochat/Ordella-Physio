import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import type { StaffAppointment } from "@/lib/staff-portal-types";
import { formatPortalDateTime } from "@/lib/staff-portal-utils";

export function StaffAppointmentDetail({ appointment }: { appointment: StaffAppointment }) {
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
        <p className="text-xs text-muted-foreground">View only</p>
      </CardBody>
    </Card>
  );
}
