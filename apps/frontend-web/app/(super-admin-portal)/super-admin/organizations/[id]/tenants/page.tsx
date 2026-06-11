"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { OrganizationTenantAssignForm } from "@/components/organizations/OrganizationTenantAssignForm";
import { OrganizationTenantList } from "@/components/organizations/OrganizationTenantList";
import {
  useOrganizationLinkedTenants,
  usePlatformOrganization,
} from "@/hooks/useSuperAdminPortal";
import { WithPermission } from "@/lib/auth/withPermission";
import type { OrganizationLinkedTenant } from "@/lib/super-admin-portal-types";

type SuperAdminOrganizationTenantsPageProps = {
  params: { id: string };
};

export default function SuperAdminOrganizationTenantsPage({
  params,
}: SuperAdminOrganizationTenantsPageProps) {
  const router = useRouter();
  const {
    data: organization,
    isLoading: isOrganizationLoading,
    isError: isOrganizationError,
    refetch: refetchOrganization,
  } = usePlatformOrganization(params.id);
  const {
    data: linkedTenants = [],
    isLoading: isTenantsLoading,
    isError: isTenantsError,
    refetch: refetchTenants,
  } = useOrganizationLinkedTenants(params.id);
  const [tenants, setTenants] = useState<OrganizationLinkedTenant[]>([]);

  useEffect(() => {
    setTenants(linkedTenants);
  }, [linkedTenants]);

  useEffect(() => {
    if (!isOrganizationLoading && (isOrganizationError || !organization)) {
      toast.error("Organization not found.");
      router.replace("/super-admin/organizations");
    }
  }, [organization, isOrganizationError, isOrganizationLoading, router]);

  const isLoading = isOrganizationLoading || isTenantsLoading;
  const isError = isOrganizationError || isTenantsError;

  return (
    <WithPermission permission="organization.manage">
      <PageHeader
        title={organization?.name ?? "Organization tenants"}
        subtitle="Manage tenants linked to this organization"
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
      {isError ? (
        <PageError
          onRetry={() => {
            void refetchOrganization();
            void refetchTenants();
          }}
        />
      ) : null}

      {!isLoading && !isError && organization ? (
        <div className="space-y-4">
          <OrganizationTenantAssignForm
            organizationId={organization.id}
            onAssigned={(tenant) => {
              setTenants((current) => {
                if (current.some((entry) => entry.id === tenant.id)) {
                  return current;
                }

                return [...current, tenant];
              });
            }}
          />
          <OrganizationTenantList
            organizationId={organization.id}
            tenants={tenants}
            onTenantRemoved={(tenantId) => {
              setTenants((current) => current.filter((tenant) => tenant.id !== tenantId));
            }}
          />
        </div>
      ) : null}
    </WithPermission>
  );
}
