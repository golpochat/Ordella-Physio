"use client";

import Link from "next/link";
import { Card, CardBody } from "@/components/ui/card";
import type { StaffPatient } from "@/lib/staff-portal-types";
import { getPatientDisplayName } from "@/lib/staff-portal-utils";

export function StaffPatientList({ patients }: { patients: StaffPatient[] }) {
  if (!patients.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">No patients found</p>
        <p className="mt-2">Patient records will appear here for lookup.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Read-only patient lookup.</p>
      {patients.map((patient) => (
        <Card key={patient.id}>
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">{getPatientDisplayName(patient)}</p>
              <p className="text-sm text-muted-foreground">{patient.email ?? "No email"}</p>
              {patient.phone ? (
                <p className="text-sm text-muted-foreground">{patient.phone}</p>
              ) : null}
            </div>
            <Link
              href={`/staff/patients/${patient.id}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              View profile
            </Link>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
