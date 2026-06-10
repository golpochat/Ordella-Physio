import Link from "next/link";
import { ClinicAppointmentCreateForm } from "@/components/clinic-portal/appointment-create-form";
import { Button } from "@/components/ui/button";

export default function ClinicAppointmentCreatePage() {
  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/clinic/appointments">&larr; Back to appointments</Link>
      </Button>
      <ClinicAppointmentCreateForm />
    </div>
  );
}
