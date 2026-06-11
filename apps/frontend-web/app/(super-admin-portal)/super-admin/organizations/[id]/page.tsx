"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { OrganizationStatusActions } from "@/components/organizations/OrganizationStatusActions";
import { OrganizationStatusBadge } from "@/components/organizations/OrganizationStatusBadge";
import { usePlatformOrganization } from "@/hooks/useSuperAdminPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import type { PlatformOrganization } from "@/lib/super-admin-portal-types";

type SuperAdminOrganizationDetailPageProps = {
  params: { id: string };
};

export default function SuperAdminOrganizationDetailPage({
  params,
}: SuperAdminOrganizationDetailPageProps) {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = usePlatformOrganization(params.id);
  const [organization, setOrganization] = useState<PlatformOrganization | null>(null);

  useEffect(() => {
    if (data) {
      setOrganization(data);
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading && (isError || !data)) {
      toast.error("Organization not found.");
      router.replace("/super-admin/organizations");
    }
  }, [data, isError, isLoading, router]);

  return (
    <WithPermission permission="organization.manage">
      <PageHeader
        title={organization?.name ?? "Organization"}
        subtitle="Organization details"
        action={
          <div className="flex flex-wrap gap-2">
            {organization ? (
              <>
                <Button asChild className="btn-primary">
                  <Link href={`/super-admin/organizations/${organization.id}/edit`}>
                    Edit organization
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/super-admin/organizations/${organization.id}/tenants`}>
                    Manage tenants
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/super-admin/organizations/${organization.id}/config`}>
                    Configuration
                  </Link>
                </Button>
              </>
            ) : null}
            <Button asChild variant="ghost">
              <Link href="/super-admin/organizations">&larr; Back to organizations</Link>
            </Button>
          </div>
        }
      />

      {isLoading ? <PageLoading rows={3} /> : null}
      {isError ? <PageError onRetry={() => void refetch()} /> : null}

      {!isLoading && !isError && organization ? (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle>{organization.name}</CardTitle>
                <OrganizationStatusBadge status={organization.status} />
              </div>
            </CardHeader>
            <CardBody className="space-y-3 text-sm">
              <p>
                <span className="text-muted-foreground">Code:</span> {organization.code}
              </p>
              <p>
                <span className="text-muted-foreground">Description:</span>{" "}
                {organization.description || "—"}
              </p>
              <p>
                <span className="text-muted-foreground">Primary contact:</span>{" "}
                {organization.primaryContactName}
              </p>
              <p>
                <span className="text-muted-foreground">Contact email:</span>{" "}
                {organization.primaryContactEmail}
              </p>
              <p>
                <span className="text-muted-foreground">Contact phone:</span>{" "}
                {organization.primaryContactPhone || "—"}
              </p>
              <p>
                <span className="text-muted-foreground">Created:</span>{" "}
                {new Date(organization.createdAt).toLocaleString()}
              </p>
            </CardBody>
          </Card>

          <OrganizationStatusActions
            organization={organization}
            onStatusChange={(updated) => setOrganization(updated)}
          />
        </div>
      ) : null}
    </WithPermission>
  );
}
