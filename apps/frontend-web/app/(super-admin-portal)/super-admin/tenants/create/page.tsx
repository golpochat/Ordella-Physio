import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { PlatformTenantCreateForm } from "@/components/super-admin-portal/tenant-create-form";

export default function SuperAdminTenantCreatePage() {
  return (
    <>
      <PageHeader
        title="Create tenant"
        subtitle="Provision a new clinic tenant on the platform."
        action={
          <Button asChild variant="ghost">
            <Link href="/super-admin/tenants">&larr; Back to tenants</Link>
          </Button>
        }
      />
      <PlatformTenantCreateForm />
    </>
  );
}
