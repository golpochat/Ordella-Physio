import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { PlatformRoleCreateForm } from "@/components/super-admin-portal/role-create-form";

export default function SuperAdminRoleCreatePage() {
  return (
    <>
      <PageHeader
        title="Create role"
        subtitle="Define a custom platform role. Built-in roles are managed separately."
        action={
          <Button asChild variant="ghost">
            <Link href="/super-admin/roles">&larr; Back to roles</Link>
          </Button>
        }
      />
      <PlatformRoleCreateForm />
    </>
  );
}
