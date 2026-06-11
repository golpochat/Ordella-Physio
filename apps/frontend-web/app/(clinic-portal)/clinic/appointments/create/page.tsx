import Link from "next/link";
import { ClinicAppointmentCreateForm } from "@/components/clinic-portal/appointment-create-form";
import { Button } from "@/components/ui/button";

export default function ClinicAppointmentCreatePage() {
  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/clinic/appointments">&larr; Back to appointments</Link>
      </Button>
      <ClinicAppointmentCreateForm />
    </>
  );
}
