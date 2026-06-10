"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import type { PharmacyPrescription } from "@/lib/pharmacy-portal-types";
import { formatPortalDateTime } from "@/lib/pharmacy-portal-utils";

export function PharmacyPrescriptionList({
  prescriptions,
}: {
  prescriptions: PharmacyPrescription[];
}) {
  if (!prescriptions.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">No prescription requests</p>
        <p className="mt-2">Incoming requests from clinicians will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Placeholder data — prescription service integration coming soon.
      </p>
      {prescriptions.map((prescription) => (
        <Card key={prescription.id}>
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{prescription.medication}</p>
                <Badge>{prescription.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{prescription.patientName}</p>
              <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
              <p className="text-xs text-muted-foreground">
                Requested {formatPortalDateTime(prescription.requestedAt)}
              </p>
            </div>
            <Link
              href={`/pharmacy/prescriptions/${prescription.id}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              View request
            </Link>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
