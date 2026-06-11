import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClinicStaffCreateForm } from "@/components/clinic-portal/staff-create-form";

export default function ClinicTherapistCreatePage() {
  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/clinic/therapists">&larr; Back to therapists</Link>
      </Button>
      <ClinicStaffCreateForm
        defaultRole="THERAPIST"
        title="Add therapist"
        description="Link an existing user as a therapist for this clinic."
        successRedirect="/clinic/therapists"
      />
    </>
  );
}
