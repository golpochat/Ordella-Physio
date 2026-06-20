import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { PharmacyFulfillmentWorkflow } from "@/components/pharmacy-portal/fulfillment-workflow";
import type { PharmacyPrescription } from "@/lib/pharmacy-portal-types";
import { formatPortalDateTime } from "@/lib/pharmacy-portal-utils";

export function PharmacyPrescriptionDetail({
  prescription,
  onIssue,
  isIssuing,
}: {
  prescription: PharmacyPrescription;
  onIssue?: () => void;
  isIssuing?: boolean;
}) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{prescription.medicationName}</CardTitle>
            <Badge>{prescription.status}</Badge>
          </div>
        </CardHeader>
        <CardBody className="space-y-4 text-sm">
          <div>
            <p className="font-medium">Patient</p>
            <p className="text-muted-foreground">{prescription.patientId}</p>
          </div>
          <div>
            <p className="font-medium">Therapist</p>
            <p className="text-muted-foreground">{prescription.therapistId}</p>
          </div>
          <div>
            <p className="font-medium">Dosage</p>
            <p className="text-muted-foreground">
              {prescription.dosage} · {prescription.frequency} · {prescription.duration}
            </p>
          </div>
          {prescription.notes ? (
            <div>
              <p className="font-medium">Notes</p>
              <p className="text-muted-foreground">{prescription.notes}</p>
            </div>
          ) : null}
          <div>
            <p className="font-medium">Created</p>
            <p className="text-muted-foreground">{formatPortalDateTime(prescription.createdAt)}</p>
          </div>
        </CardBody>
      </Card>

      {prescription.status === "DRAFT" ? (
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href={`/pharmacy/prescriptions/${prescription.id}/edit`}>Edit draft</Link>
          </Button>
          {onIssue ? (
            <Button className="btn-primary" disabled={isIssuing} onClick={onIssue}>
              Issue prescription
            </Button>
          ) : null}
        </div>
      ) : null}

      {prescription.status === "ISSUED" || prescription.status === "DISPENSED" ? (
        <PharmacyFulfillmentWorkflow prescription={prescription} />
      ) : null}

      <Button asChild variant="outline">
        <Link href="/pharmacy/prescriptions">Back to prescriptions</Link>
      </Button>
    </div>
  );
}
