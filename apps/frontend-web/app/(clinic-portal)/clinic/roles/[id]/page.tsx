"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { RoleDeleteButton } from "@/components/roles/RoleDeleteButton";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { useClinicRole } from "@/hooks/useUserRolePortal";
import { WithPermission } from "@/lib/auth/withPermission";
import { parseRoleFetchErrors } from "@/lib/user-role-api-errors";
import { ApiError } from "@/lib/api-client";

type ClinicRoleDetailPageProps = {
  params: { id: string };
};

function formatCreatedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ClinicRoleDetailPage({ params }: ClinicRoleDetailPageProps) {
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
        title={data?.role.name ?? "Role details"}
        subtitle="View role details and assigned permissions."
        action={
          <div className="user-list-actions">
            <Button asChild variant="ghost">
              <Link href="/clinic/roles">&larr; Back to roles</Link>
            </Button>
            {data ? (
              <Button asChild>
                <Link href={`/clinic/roles/${data.role.id}/edit`}>Edit role</Link>
              </Button>
            ) : null}
          </div>
        }
      />

      {isLoading ? <PageLoading rows={3} /> : null}
      {isError && !(error instanceof ApiError) ? (
        <PageError onRetry={() => void refetch()} />
      ) : null}
      {!isLoading && !isError && data ? (
        <Card>
          <CardHeader>
            <CardTitle>{data.role.name}</CardTitle>
            <CardDescription>Role code: {data.role.code}</CardDescription>
          </CardHeader>
          <CardBody>
            <dl className="tenant-create-form">
              <div className="tenant-create-form-field">
                <dt className="dashboard-section-title">Description</dt>
                <dd className="dashboard-cell-muted">{data.role.description ?? "—"}</dd>
              </div>
              <div className="tenant-create-form-field">
                <dt className="dashboard-section-title">System role</dt>
                <dd className="dashboard-cell-muted">{data.role.isSystem ? "Yes" : "No"}</dd>
              </div>
              <div className="tenant-create-form-field">
                <dt className="dashboard-section-title">Created</dt>
                <dd className="dashboard-cell-muted">{formatCreatedAt(data.role.createdAt)}</dd>
              </div>
              <div className="tenant-create-form-field">
                <dt className="dashboard-section-title">Permissions</dt>
                <dd>
                  {data.permissions.length === 0 ? (
                    <p className="dashboard-cell-muted">No permissions assigned.</p>
                  ) : (
                    <ul className="role-permission-list">
                      {data.permissions.map((permission) => (
                        <li key={permission} className="role-permission-code">
                          {permission}
                        </li>
                      ))}
                    </ul>
                  )}
                </dd>
              </div>
            </dl>
            <div className="tenant-create-form-actions">
              <RoleDeleteButton role={data.role} />
            </div>
          </CardBody>
        </Card>
      ) : null}
    </WithPermission>
  );
}
