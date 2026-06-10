import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import type { TherapistPatient } from "@/lib/therapist-portal-types";
import { formatPortalDate, getPatientDisplayName } from "@/lib/therapist-portal-utils";

export function TherapistPatientDetail({ patient }: { patient: TherapistPatient }) {
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
        {patient.notes ? (
          <div className="sm:col-span-2">
            <p className="font-medium">Notes</p>
            <p className="text-muted-foreground">{patient.notes}</p>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
}
