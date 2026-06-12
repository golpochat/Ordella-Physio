import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StaffCreateForm } from "@/components/staff/StaffCreateForm";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicStaffNewPage() {
  return (
    <WithPermission permission="user.manage">
      <Button asChild variant="ghost">
        <Link href="/clinic/staff">&larr; Back to staff</Link>
      </Button>
      <StaffCreateForm />
    </WithPermission>
  );
}
