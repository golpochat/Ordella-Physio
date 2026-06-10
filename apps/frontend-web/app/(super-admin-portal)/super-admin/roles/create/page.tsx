import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlatformRoleCreateForm } from "@/components/super-admin-portal/role-create-form";

export default function SuperAdminRoleCreatePage() {
  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/super-admin/roles">&larr; Back to roles</Link>
      </Button>
      <PlatformRoleCreateForm />
    </div>
  );
}
