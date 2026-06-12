"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { RoleEditForm } from "@/components/roles/RoleEditForm";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicRole } from "@/hooks/useUserRolePortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { parseRoleFetchErrors } from "@/lib/user-role-api-errors";
import { ApiError } from "@/lib/api-client";

type ClinicRoleEditPageProps = {
  params: { id: string };
};

export default function ClinicRoleEditPage({ params }: ClinicRoleEditPageProps) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useClinicRole(params.id);

  useEffect(() => {
    if (isLoading || !isError) {
      return;
    }

    const parsed = parseRoleFetchErrors(error);

    if (parsed.forbidden || parsed.tenantMismatch) {
      router.replace("/forbidden");
      return;
    }

    if (parsed.notFound) {
      toast.error(parsed.message ?? "Role does not exist.");
      router.replace("/clinic/roles");
    }
  }, [error, isError, isLoading, router]);

  return (
    <WithPermission permission="role.manage">
      <PageHeader
        title={data?.role.name ? `Edit ${data.role.name}` : "Edit role"}
        subtitle="Update role details and assigned permissions."
        action={
          <Button asChild variant="ghost">
            <Link href="/clinic/roles">&larr; Back to roles</Link>
          </Button>
        }
      />

      {isLoading ? <PageLoading rows={4} /> : null}
      {isError && !(error instanceof ApiError) ? (
        <PageError onRetry={() => void refetch()} />
      ) : null}
      {!isLoading && !isError && data ? (
        <RoleEditForm role={data.role} assignedPermissions={data.permissions} />
      ) : null}
    </WithPermission>
  );
}
