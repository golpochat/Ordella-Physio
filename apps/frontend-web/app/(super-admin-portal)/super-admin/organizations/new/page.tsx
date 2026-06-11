import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { OrganizationCreateForm } from "@/components/organizations/OrganizationCreateForm";
import { WithPermission } from "@/lib/auth/withPermission";

export default function SuperAdminOrganizationNewPage() {
  return (
    <WithPermission permission="organization.manage">
      <PageHeader
        title="Create organization"
        subtitle="Provision a new organization on the platform."
        action={
          <Button asChild variant="ghost">
            <Link href="/super-admin/organizations">&larr; Back to organizations</Link>
          </Button>
        }
      />
      <OrganizationCreateForm />
    </WithPermission>
  );
}
