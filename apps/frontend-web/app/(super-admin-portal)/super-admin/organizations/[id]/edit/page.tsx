"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { OrganizationEditForm } from "@/components/organizations/OrganizationEditForm";
import { Button } from "@/components/ui/button";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { usePlatformOrganization } from "@/hooks/useSuperAdminPortal";
import { WithPermission } from "@/lib/auth/withPermission";

type SuperAdminOrganizationEditPageProps = {
  params: { id: string };
};

export default function SuperAdminOrganizationEditPage({ params }: SuperAdminOrganizationEditPageProps) {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = usePlatformOrganization(params.id);

  useEffect(() => {
    if (!isLoading && (isError || !data)) {
      toast.error("Organization not found.");
      router.replace("/super-admin/organizations");
    }
  }, [data, isError, isLoading, router]);

  return (
    <WithPermission permission="organization.manage">
      <PageHeader
        title={data?.name ? `Edit ${data.name}` : "Edit organization"}
        subtitle="Update organization details and status."
        action={
          <Button asChild variant="ghost">
            <Link href="/super-admin/organizations">&larr; Back to organizations</Link>
          </Button>
        }
      />

      {isLoading ? <PageLoading rows={3} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}
      {!isLoading && !isError && data ? <OrganizationEditForm organization={data} /> : null}
    </WithPermission>
  );
}
