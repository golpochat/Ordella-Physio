"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { PatientStatusBadge } from "@/components/patients/PatientStatusBadge";
import { useDeleteClinicPatient } from "@/hooks/useClinicPortal";
import type { ClinicPatientDetailResponse } from "@/lib/clinic-portal-types";
import { formatPortalDate, getPatientDisplayName } from "@/lib/clinic-portal-utils";

export function ClinicPatientDetail({ detail }: { detail: ClinicPatientDetailResponse }) {
  const router = useRouter();
  const deletePatient = useDeleteClinicPatient();
  const { patient, insurance } = detail;

  const addressParts = [
    patient.addressLine1,
    patient.addressLine2,
    patient.city,
    patient.state,
    patient.postalCode,
    patient.country,
  ].filter(Boolean);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle>{getPatientDisplayName(patient)}</CardTitle>
              <PatientStatusBadge status={patient.status} />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline">
                <Link href={`/clinic/patients/${patient.id}/notes`}>Medical notes</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/clinic/patients/${patient.id}/attachments`}>Attachments</Link>
              </Button>
              <Button asChild>
                <Link href={`/clinic/patients/${patient.id}/edit`}>Edit</Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="font-medium">Email</p>
            <p className="text-muted-foreground">{patient.email ?? "—"}</p>
          </div>
          <div>
            <p className="font-medium">Phone</p>
            <p className="text-muted-foreground">{patient.phone ?? "—"}</p>
          </div>
          <div>
            <p className="font-medium">Date of birth</p>
            <p className="text-muted-foreground">
              {patient.dateOfBirth ? formatPortalDate(patient.dateOfBirth) : "—"}
            </p>
          </div>
          <div>
            <p className="font-medium">Gender</p>
            <p className="text-muted-foreground">{patient.gender}</p>
          </div>
          <div>
            <p className="font-medium">Blood group</p>
            <p className="text-muted-foreground">{patient.bloodGroup ?? "—"}</p>
          </div>
          <div>
            <p className="font-medium">Status</p>
            <PatientStatusBadge status={patient.status} />
          </div>
          <div className="sm:col-span-2">
            <p className="font-medium">Address</p>
            <p className="text-muted-foreground">
              {addressParts.length > 0 ? addressParts.join(", ") : patient.address ?? "—"}
            </p>
          </div>
          <div>
            <p className="font-medium">Emergency contact</p>
            <p className="text-muted-foreground">
              {patient.emergencyContactName
                ? `${patient.emergencyContactName} (${patient.emergencyContactPhone ?? "—"})`
                : "—"}
            </p>
          </div>
          {insurance ? (
            <div className="sm:col-span-2">
              <p className="font-medium">Insurance</p>
              <p className="text-muted-foreground">
                {insurance.providerName} — {insurance.policyNumber} (expires{" "}
                {formatPortalDate(insurance.expiryDate)})
              </p>
            </div>
          ) : null}
        </CardBody>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="destructive"
          disabled={deletePatient.isPending}
          onClick={() => {
            if (!window.confirm("Delete this patient record?")) {
              return;
            }
            deletePatient.mutate(patient.id, {
              onSuccess: () => {
                toast.success("Patient deleted");
                router.push("/clinic/patients");
              },
              onError: () => toast.error("Failed to delete patient"),
            });
          }}
        >
          Delete patient
        </Button>
        <Button asChild variant="outline">
          <Link href="/clinic/patients">Back to patients</Link>
        </Button>
      </div>
    </div>
  );
}
