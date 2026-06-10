import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import type { PortalUserAppointment } from "@/lib/user-portal-types";
import { formatPortalDateTime } from "@/lib/user-portal-utils";

export function UserAppointmentDetail({ appointment }: { appointment: PortalUserAppointment }) {
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
        <p className="text-xs text-muted-foreground">Read-only</p>
      </CardBody>
    </Card>
  );
}
