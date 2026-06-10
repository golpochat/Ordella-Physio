import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import type { StaffPatient } from "@/lib/staff-portal-types";
import { formatPortalDate, getPatientDisplayName } from "@/lib/staff-portal-utils";

export function StaffPatientDetail({ patient }: { patient: StaffPatient }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{getPatientDisplayName(patient)}</CardTitle>
      </CardHeader>
      <CardBody className="grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <p className="font-medium">Email</p>
          <p className="text-muted-foreground">{patient.email ?? "Not provided"}</p>
        </div>
        <div>
          <p className="font-medium">Phone</p>
          <p className="text-muted-foreground">{patient.phone ?? "Not provided"}</p>
        </div>
        <div>
          <p className="font-medium">Date of birth</p>
          <p className="text-muted-foreground">
            {patient.dateOfBirth ? formatPortalDate(patient.dateOfBirth) : "Not provided"}
          </p>
        </div>
        <div>
          <p className="font-medium">Gender</p>
          <p className="text-muted-foreground">{patient.gender}</p>
        </div>
        {patient.address ? (
          <div className="sm:col-span-2">
            <p className="font-medium">Address</p>
            <p className="text-muted-foreground">{patient.address}</p>
          </div>
        ) : null}
        <p className="text-xs text-muted-foreground sm:col-span-2">Read-only staff view</p>
      </CardBody>
    </Card>
  );
}
