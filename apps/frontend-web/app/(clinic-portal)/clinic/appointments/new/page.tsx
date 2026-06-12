"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { AppointmentCreateForm } from "@/components/appointments/AppointmentCreateForm";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicAppointmentNewPage() {
  return (
    <WithPermission permission="appointment.manage">
      <PageHeader
        title="Schedule appointment"
        subtitle="Book a new appointment for a patient."
        action={
          <Button asChild variant="ghost">
            <Link href="/clinic/appointments">&larr; Back to appointments</Link>
          </Button>
        }
      />
      <AppointmentCreateForm />
    </WithPermission>
  );
}
