import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClinicStaffCreateForm } from "@/components/clinic-portal/staff-create-form";

export default function ClinicStaffCreatePage() {
  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/clinic/staff">&larr; Back to staff</Link>
      </Button>
      <ClinicStaffCreateForm
        defaultRole="STAFF"
        title="Add staff member"
        description="Link an existing user as clinic staff."
        successRedirect="/clinic/staff"
      />
    </div>
  );
}
