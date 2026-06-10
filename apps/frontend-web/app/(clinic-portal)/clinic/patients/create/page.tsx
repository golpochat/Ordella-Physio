import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClinicPatientCreateForm } from "@/components/clinic-portal/patient-create-form";

export default function ClinicPatientCreatePage() {
  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/clinic/patients">&larr; Back to patients</Link>
      </Button>
      <ClinicPatientCreateForm />
    </div>
  );
}
