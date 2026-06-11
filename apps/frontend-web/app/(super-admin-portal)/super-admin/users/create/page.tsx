import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { PlatformUserCreateForm } from "@/components/super-admin-portal/user-create-form";

export default function SuperAdminUserCreatePage() {
  return (
    <>
      <PageHeader
        title="Create user"
        subtitle="Register a new user for a tenant via the auth service."
        action={
          <Button asChild variant="ghost">
            <Link href="/super-admin/users">&larr; Back to users</Link>
          </Button>
        }
      />
      <PlatformUserCreateForm />
    </>
  );
}
