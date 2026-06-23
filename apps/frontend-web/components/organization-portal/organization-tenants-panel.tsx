"use client";

import { useEffect, useState } from "react";
import { ListPage } from "@/components/dashboard/ListPage";
import { PageError } from "@/components/patient-portal/page-state";
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
    <ListPage
      title="Clinics"
      subtitle={`Manage clinic tenants linked to ${organizationName}.`}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => {
        void refetchBillingContext();
        void refetchTenants();
      }}
    >
      {organizationId ? (
        <>
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
        </>
      ) : null}
    </ListPage>
  );
}
