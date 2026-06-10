import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import type { PharmacyPrescription } from "@/lib/pharmacy-portal-types";
import { formatPortalDateTime } from "@/lib/pharmacy-portal-utils";

export function PharmacyPrescriptionDetail({
  prescription,
}: {
  prescription: PharmacyPrescription;
}) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{prescription.medication}</CardTitle>
            <Badge>{prescription.status}</Badge>
          </div>
        </CardHeader>
        <CardBody className="space-y-4 text-sm">
          <div>
            <p className="font-medium">Patient</p>
            <p className="text-muted-foreground">{prescription.patientName}</p>
          </div>
          <div>
            <p className="font-medium">Dosage</p>
            <p className="text-muted-foreground">{prescription.dosage}</p>
          </div>
          <div>
            <p className="font-medium">Requested</p>
            <p className="text-muted-foreground">
              {formatPortalDateTime(prescription.requestedAt)}
            </p>
          </div>
          {prescription.appointmentId ? (
            <div>
              <p className="font-medium">Linked appointment</p>
              <p className="text-muted-foreground">{prescription.appointmentId}</p>
            </div>
          ) : null}
          <p className="text-xs text-muted-foreground">
            Placeholder detail — approval and dispensing actions will be wired later.
          </p>
        </CardBody>
      </Card>
      <Button asChild variant="outline">
        <Link href="/pharmacy/prescriptions">Back to prescriptions</Link>
      </Button>
    </div>
  );
}
