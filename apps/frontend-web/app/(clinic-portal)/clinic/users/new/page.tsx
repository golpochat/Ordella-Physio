import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WithPermission } from "@/lib/auth/withPermission";
import { UserCreateForm } from "@/components/users/UserCreateForm";

export default function ClinicUserCreatePage() {
  return (
    <WithPermission permission="user.manage">
      <Button asChild variant="ghost">
        <Link href="/clinic/users">&larr; Back to users</Link>
      </Button>
      <UserCreateForm />
    </WithPermission>
  );
}
