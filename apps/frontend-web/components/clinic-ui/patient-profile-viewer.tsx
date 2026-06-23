"use client";

import { Badge } from "@/components/ui/badge";
import { FormErrorBanner } from "@/components/ui/form-feedback";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PortalReadOnlyBadge, PortalRoleGate } from "@/components/navigation/PortalRoleGate";
import { cn } from "@/lib/cn";
import { formatPatientDate, formatPatientDateTime } from "@/lib/patient-portal-utils";
import type { ClinicPatientProfile } from "./types";
import { TenantScopeBanner } from "./tenant-scope-banner";
import { useClinicScope } from "./use-clinic-scope";

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-sm">{value?.trim() || "—"}</p>
    </div>
  );
}

export type PatientProfileViewerProps = {
  patient: ClinicPatientProfile;
  className?: string;
  showTenantBanner?: boolean;
  showClinicalSummary?: boolean;
  clinicalSummary?: string;
  footerNote?: string;
};

export function PatientProfileViewer({
  patient,
  className,
  showTenantBanner = true,
  showClinicalSummary = false,
  clinicalSummary,
  footerNote,
}: PatientProfileViewerProps) {
  const { can, hasTenant, tenantId } = useClinicScope();
  const canRead = can("patients:read") || can("profile:read");
  const canWrite = can("patients:write");
  const fullName = `${patient.firstName} ${patient.lastName}`.trim();

  if (!hasTenant && patient.tenantId && tenantId && patient.tenantId !== tenantId) {
    return <FormErrorBanner>Patient record belongs to a different tenant.</FormErrorBanner>;
  }

  if (!hasTenant) {
    return showTenantBanner ? <TenantScopeBanner /> : null;
  }

  if (!canRead) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
        You do not have permission to view patient profiles.
      </div>
    );
  }

  const addressParts = [
    patient.address?.line1,
    patient.address?.line2,
    [patient.address?.city, patient.address?.state, patient.address?.postalCode].filter(Boolean).join(", "),
    patient.address?.country,
  ].filter(Boolean);

  return (
    <div className={cn("space-y-4", className)}>
      {showTenantBanner ? <TenantScopeBanner /> : null}

      <div className="flex flex-wrap items-center gap-2">
        <PortalRoleGate capability="patients:write" fallback={<PortalReadOnlyBadge />}>
          <Badge variant="secondary">Editable</Badge>
        </PortalRoleGate>
        {patient.isActive === false ? <Badge variant="destructive">Inactive</Badge> : null}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{fullName || "Patient"}</CardTitle>
          <CardDescription>
            {canWrite ? "Full patient profile" : "Read-only patient profile viewer"}
          </CardDescription>
        </CardHeader>
        <CardBody className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" value={patient.email} />
          <Field label="Phone" value={patient.phone} />
          <Field label="Date of birth" value={patient.dateOfBirth ? formatPatientDate(patient.dateOfBirth) : null} />
          <Field label="Gender" value={patient.gender} />
          <Field label="Address" value={addressParts.length ? addressParts.join("\n") : null} />
          <Field label="Emergency contact" value={patient.emergencyContact?.name} />
          <Field label="Emergency phone" value={patient.emergencyContact?.phone} />
          {patient.createdAt ? (
            <Field label="Registered" value={formatPatientDateTime(patient.createdAt)} />
          ) : null}
        </CardBody>
      </Card>

      {showClinicalSummary && clinicalSummary ? (
        <PortalRoleGate capability="notes:read">
          <Card>
            <CardHeader>
              <CardTitle>Clinical summary</CardTitle>
            </CardHeader>
            <CardBody>
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">{clinicalSummary}</p>
            </CardBody>
          </Card>
        </PortalRoleGate>
      ) : null}

      {footerNote ? <p className="text-xs text-muted-foreground">{footerNote}</p> : null}
    </div>
  );
}
