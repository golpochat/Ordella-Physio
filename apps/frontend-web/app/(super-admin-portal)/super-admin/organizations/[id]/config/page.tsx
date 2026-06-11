"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { OrganizationConfigEditor } from "@/components/organizations/OrganizationConfigEditor";
import { Button } from "@/components/ui/button";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import {
  usePlatformOrganization,
  usePlatformOrganizationConfigNamespaces,
} from "@/hooks/useSuperAdminPortal";
import { ApiError } from "@/lib/api-client";
import { parseOrganizationConfigErrors } from "@/lib/organization-api-errors";
import { WithPermission } from "@/lib/auth/withPermission";

type SuperAdminOrganizationConfigPageProps = {
  params: { id: string };
};

export default function SuperAdminOrganizationConfigPage({
  params,
}: SuperAdminOrganizationConfigPageProps) {
  const router = useRouter();
  const organizationQuery = usePlatformOrganization(params.id);
  const namespacesQuery = usePlatformOrganizationConfigNamespaces(params.id);

  const isLoading = organizationQuery.isLoading || namespacesQuery.isLoading;
  const loadError = organizationQuery.error ?? namespacesQuery.error;

  useEffect(() => {
    if (isLoading || !loadError) {
      return;
    }

    const parsed = parseOrganizationConfigErrors(loadError);
    if (parsed.orgNotFound || (loadError instanceof ApiError && loadError.status === 404)) {
      toast.error("Organization not found.");
      router.replace("/super-admin/organizations");
      return;
    }

    if (parsed.forbidden || (loadError instanceof ApiError && loadError.status === 403)) {
      router.replace("/forbidden");
    }
  }, [isLoading, loadError, router]);

  useEffect(() => {
    if (!organizationQuery.isLoading && !organizationQuery.isError && !organizationQuery.data) {
      toast.error("Organization not found.");
      router.replace("/super-admin/organizations");
    }
  }, [organizationQuery.data, organizationQuery.isError, organizationQuery.isLoading, router]);

  return (
    <WithPermission permission="organization.manage">
      <PageHeader
        title={
          organizationQuery.data?.name
            ? `Configuration — ${organizationQuery.data.name}`
            : "Organization configuration"
        }
        subtitle="Manage branding, features, integrations, and preferences."
        action={
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="ghost">
              <Link href={`/super-admin/organizations/${params.id}`}>&larr; Back to organization</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/super-admin/organizations">&larr; All organizations</Link>
            </Button>
          </div>
        }
      />

      {isLoading ? <PageLoading rows={4} /> : null}
      {loadError && !isLoading ? (
        <PageError
          onRetry={() => {
            void organizationQuery.refetch();
            void namespacesQuery.refetch();
          }}
        />
      ) : null}

      {!isLoading && !loadError && organizationQuery.data ? (
        <OrganizationConfigEditor
          organizationId={params.id}
          organizationName={organizationQuery.data.name}
          onForbidden={() => router.replace("/forbidden")}
          onOrgNotFound={() => {
            toast.error("Organization not found.");
            router.replace("/super-admin/organizations");
          }}
        />
      ) : null}
    </WithPermission>
  );
}
