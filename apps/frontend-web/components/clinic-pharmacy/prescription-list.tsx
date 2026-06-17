"use client";

import Link from "next/link";
import { PrescriptionStatusBadge } from "@/components/clinic-pharmacy/status-badges";
import { Card, CardBody } from "@/components/ui/card";
import type { ClinicPrescription } from "@/lib/clinic-pharmacy-types";
import { formatPortalDateTime } from "@/lib/pharmacy-portal-utils";
import { adminRoutes } from "@/lib/routes";

export function PrescriptionListTable({ prescriptions }: { prescriptions: ClinicPrescription[] }) {
  if (!prescriptions.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">No prescriptions</p>
        <p className="mt-2">Create a prescription to begin the pharmacy workflow.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {prescriptions.map((prescription) => (
        <Card key={prescription.id}>
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{prescription.medicationName}</p>
                <PrescriptionStatusBadge status={prescription.status} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Patient {prescription.patientId} · {prescription.dosage} · {prescription.frequency}
              </p>
              <p className="text-xs text-muted-foreground">
                Created {formatPortalDateTime(prescription.createdAt)}
              </p>
            </div>
            <Link
              href={adminRoutes.pharmacyPrescription(prescription.id)}
              className="text-sm font-medium text-primary hover:underline"
            >
              View prescription
            </Link>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
