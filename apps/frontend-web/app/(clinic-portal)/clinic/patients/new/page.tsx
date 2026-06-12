"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PatientCreateForm } from "@/components/patients/PatientCreateForm";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicPatientNewPage() {
  return (
    <WithPermission permission="patient.manage">
      <PageHeader
        title="Register patient"
        subtitle="Create a new patient record for your clinic."
        action={
          <Button asChild variant="ghost">
            <Link href="/clinic/patients">&larr; Back to patients</Link>
          </Button>
        }
      />
      <PatientCreateForm />
    </WithPermission>
  );
}
