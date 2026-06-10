import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlatformTenantCreateForm } from "@/components/super-admin-portal/tenant-create-form";

export default function SuperAdminTenantCreatePage() {
  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/super-admin/tenants">&larr; Back to tenants</Link>
      </Button>
      <PlatformTenantCreateForm />
    </div>
  );
}
