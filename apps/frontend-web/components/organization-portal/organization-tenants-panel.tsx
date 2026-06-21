"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { OrganizationPortalTenantAssignForm } from "@/components/organization-portal/organization-tenant-assign-form";
import { OrganizationPortalTenantList } from "@/components/organization-portal/organization-tenant-list";
import {
  useOrganizationPortalContext,
  useOrganizationPortalLinkedTenants,
} from "@/hooks/useOrganizationPortal";
import type { OrganizationLinkedTenant } from "@/lib/super-admin-portal-types";

export function OrganizationTenantsPanel() {
  const {
    organizationId,
    organizationName,
    isBillingContextLoading,
    billingContextError,
    refetchBillingContext,
  } = useOrganizationPortalContext();
  const {
    data: linkedTenants = [],
    isLoading: isTenantsLoading,
    isError: isTenantsError,
    refetch: refetchTenants,
  } = useOrganizationPortalLinkedTenants(organizationId);
  const [tenants, setTenants] = useState<OrganizationLinkedTenant[]>([]);

  useEffect(() => {
    setTenants(linkedTenants);
  }, [linkedTenants]);

  const isLoading = isBillingContextLoading || isTenantsLoading;
  const isError = billingContextError || isTenantsError;

  if (!organizationId && !isLoading) {
    return (
      <PageError message="Your account is not linked to an organization. Contact platform support." />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clinics"
        subtitle={`Manage clinic tenants linked to ${organizationName}.`}
      />

      {isLoading ? <PageLoading rows={4} /> : null}
      {isError ? (
        <PageError
          onRetry={() => {
            void refetchBillingContext();
            void refetchTenants();
          }}
        />
      ) : null}

      {!isLoading && !isError && organizationId ? (
        <div className="space-y-4">
          <OrganizationPortalTenantAssignForm
            organizationId={organizationId}
            onAssigned={(tenant) => {
              setTenants((current) => {
                if (current.some((entry) => entry.id === tenant.id)) {
                  return current;
                }

                return [...current, tenant];
              });
            }}
          />
          <OrganizationPortalTenantList
            organizationId={organizationId}
            tenants={tenants}
            onTenantRemoved={(tenantId) => {
              setTenants((current) => current.filter((tenant) => tenant.id !== tenantId));
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
