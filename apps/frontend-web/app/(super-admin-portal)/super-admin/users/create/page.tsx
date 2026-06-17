import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { PlatformUserCreateForm } from "@/components/super-admin-portal/user-create-form";

type SuperAdminUserCreatePageProps = {
  searchParams?: {
    mode?: string;
    tenantId?: string;
  };
};

export default function SuperAdminUserCreatePage({ searchParams }: SuperAdminUserCreatePageProps) {
  const isPlatformMode = searchParams?.mode === "platform";

  return (
    <>
      <PageHeader
        title={isPlatformMode ? "Create platform operator" : "Create tenant user"}
        subtitle={
          isPlatformMode
            ? "Register a SYSTEM user for SaaS platform administration."
            : "Register a staff or admin user for a clinic tenant."
        }
        action={
          <Button asChild variant="ghost">
            <Link
              href={
                searchParams?.tenantId
                  ? `/super-admin/tenants/${searchParams.tenantId}`
                  : "/super-admin/users"
              }
            >
              &larr; Back
            </Link>
          </Button>
        }
      />
      <PlatformUserCreateForm
        mode={isPlatformMode ? "platform" : "tenant"}
        initialTenantId={searchParams?.tenantId}
      />
    </>
  );
}
