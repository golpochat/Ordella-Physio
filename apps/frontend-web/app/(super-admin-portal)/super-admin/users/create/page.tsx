import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlatformUserCreateForm } from "@/components/super-admin-portal/user-create-form";

export default function SuperAdminUserCreatePage() {
  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/super-admin/users">&larr; Back to users</Link>
      </Button>
      <PlatformUserCreateForm />
    </div>
  );
}
