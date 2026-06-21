"use client";

import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi, useQueryAuthReady } from "@/hooks/useApi";
import { useBillingContext } from "@/hooks/useClinicPortal";
import { createOrganizationPortalApi } from "@/lib/organization-portal-api";
import type { OrganizationLinkedTenant } from "@/lib/super-admin-portal-types";
import { useAuthStore } from "@/store/auth.store";

function normalizeOrganizationTenantList(
  response: { data: OrganizationLinkedTenant[] } | OrganizationLinkedTenant[],
): OrganizationLinkedTenant[] {
  if (Array.isArray(response)) {
    return response;
  }

  return response.data ?? [];
}

export function useOrganizationPortalApi() {
  const api = useApi();
  return useMemo(() => createOrganizationPortalApi(api), [api]);
}

export function useOrganizationPortalContext() {
  const user = useAuthStore((state) => state.user);
  const billingContextQuery = useBillingContext();
  const organizationId = user?.organizationId ?? null;
  const organizationName =
    billingContextQuery.data?.organizationName ?? user?.organizationId ?? "Organization";

  return {
    user,
    organizationId,
    organizationName,
    isBillingContextLoading: billingContextQuery.isLoading,
    billingContextError: billingContextQuery.isError,
    refetchBillingContext: billingContextQuery.refetch,
  };
}

function requireApi(api: ReturnType<typeof createOrganizationPortalApi> | null) {
  if (!api) {
    throw new Error("API client is required");
  }

  return api;
}

export function useOrganizationPortalLinkedTenants(organizationId: string | null | undefined) {
  const portalApi = useOrganizationPortalApi();
  const authReady = useQueryAuthReady();

  return useQuery({
    queryKey: ["organization-portal", "tenants", organizationId],
    queryFn: async () =>
      normalizeOrganizationTenantList(
        await requireApi(portalApi).listOrganizationTenants(organizationId!),
      ),
    enabled: authReady && Boolean(organizationId),
  });
}

export function useOrganizationPortalUnassignedTenants(organizationId: string | null | undefined) {
  const portalApi = useOrganizationPortalApi();
  const authReady = useQueryAuthReady();

  return useQuery({
    queryKey: ["organization-portal", "tenants", organizationId, "unassigned"],
    queryFn: async () =>
      normalizeOrganizationTenantList(
        await requireApi(portalApi).listUnassignedOrganizationTenants(organizationId!),
      ),
    enabled: authReady && Boolean(organizationId),
  });
}

function invalidateOrganizationPortalTenantQueries(
  queryClient: ReturnType<typeof useQueryClient>,
  organizationId: string,
) {
  queryClient.invalidateQueries({ queryKey: ["organization-portal", "tenants", organizationId] });
}

export function useAssignOrganizationPortalTenant(organizationId: string | null | undefined) {
  const portalApi = useOrganizationPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tenantId: string) =>
      requireApi(portalApi).assignOrganizationTenant(organizationId!, tenantId),
    onSuccess: () => {
      if (organizationId) {
        invalidateOrganizationPortalTenantQueries(queryClient, organizationId);
      }
    },
  });
}

export function useRemoveOrganizationPortalTenant(organizationId: string | null | undefined) {
  const portalApi = useOrganizationPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tenantId: string) =>
      requireApi(portalApi).removeOrganizationTenant(organizationId!, tenantId),
    onSuccess: () => {
      if (organizationId) {
        invalidateOrganizationPortalTenantQueries(queryClient, organizationId);
      }
    },
  });
}
