"use client";

import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi, useQueryAuthReady } from "@/hooks/useApi";
import { useTenant } from "@/hooks/useTenant";
import { can, Permission } from "@/lib/permissions";
import { createStaffPortalApi, normalizeList } from "@/lib/staff-portal-api";
import type { UpdateStaffProfilePayload } from "@/lib/staff-portal-types";
import { useAuthStore } from "@/store/auth.store";

export function useStaffPortalApi() {
  const api = useApi();
  return useMemo(() => createStaffPortalApi(api), [api]);
}

export function useStaffContext() {
  const user = useAuthStore((state) => state.user);
  const { tenantId } = useTenant();
  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.email ||
    "Staff";

  return { user, tenantId, displayName };
}

function requireApi(api: ReturnType<typeof createStaffPortalApi> | null) {
  if (!api) throw new Error("API client is required");
  return api;
}

export function useStaffAppointments() {
  const staffApi = useStaffPortalApi();
  const { tenantId } = useStaffContext();
  const authReady = useQueryAuthReady();

  return useQuery({
    queryKey: ["staff", "appointments", tenantId],
    queryFn: async () =>
      normalizeList(
        await requireApi(staffApi).listAppointments({ limit: 100 }),
      ),
    enabled: authReady && Boolean(tenantId),
  });
}

export function useStaffAppointment(id: string) {
  const staffApi = useStaffPortalApi();
  const authReady = useQueryAuthReady();

  return useQuery({
    queryKey: ["staff", "appointments", id],
    queryFn: () => requireApi(staffApi).getAppointment(id),
    enabled: authReady && Boolean(id),
  });
}

export function useStaffPatients() {
  const staffApi = useStaffPortalApi();
  const { tenantId } = useStaffContext();
  const authReady = useQueryAuthReady();

  return useQuery({
    queryKey: ["staff", "patients", tenantId],
    queryFn: async () =>
      normalizeList(await requireApi(staffApi).listPatients({ limit: 100 })),
    enabled: authReady && Boolean(tenantId),
  });
}

export function useStaffPatient(id: string) {
  const staffApi = useStaffPortalApi();
  const authReady = useQueryAuthReady();

  return useQuery({
    queryKey: ["staff", "patients", id],
    queryFn: () => requireApi(staffApi).getPatient(id),
    enabled: authReady && Boolean(id),
  });
}

export function useStaffBilling() {
  const staffApi = useStaffPortalApi();
  const { tenantId, user } = useStaffContext();
  const authReady = useQueryAuthReady();
  const canReadBilling = can(user, Permission.BILLING_READ);

  return useQuery({
    queryKey: ["staff", "billing", tenantId],
    queryFn: async () =>
      normalizeList(await requireApi(staffApi).listBilling()),
    enabled: authReady && Boolean(tenantId) && canReadBilling,
    retry: false,
  });
}

export function useStaffBillingOptional() {
  return useStaffBilling();
}

export function useStaffInvoice(invoiceId: string) {
  const staffApi = useStaffPortalApi();
  const authReady = useQueryAuthReady();

  return useQuery({
    queryKey: ["staff", "billing", invoiceId],
    queryFn: () => requireApi(staffApi).getInvoice(invoiceId),
    enabled: authReady && Boolean(invoiceId),
  });
}

export function useStaffNotes() {
  const staffApi = useStaffPortalApi();
  const { tenantId } = useStaffContext();
  const authReady = useQueryAuthReady();

  return useQuery({
    queryKey: ["staff", "notes", tenantId],
    queryFn: async () =>
      normalizeList(await requireApi(staffApi).listNotes({ limit: 100 })),
    enabled: authReady && Boolean(tenantId),
  });
}

export function useStaffNote(id: string) {
  const staffApi = useStaffPortalApi();
  const authReady = useQueryAuthReady();

  return useQuery({
    queryKey: ["staff", "notes", id],
    queryFn: () => requireApi(staffApi).getNote(id),
    enabled: authReady && Boolean(id),
  });
}

export function useStaffProfile() {
  const staffApi = useStaffPortalApi();
  const authReady = useQueryAuthReady();

  return useQuery({
    queryKey: ["staff", "profile"],
    queryFn: () => requireApi(staffApi).getProfile(),
    enabled: authReady,
  });
}

export function useUpdateStaffProfile() {
  const staffApi = useStaffPortalApi();
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (payload: UpdateStaffProfilePayload) =>
      requireApi(staffApi).updateProfile(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["staff", "profile"] });
      if (user && accessToken) {
        setSession({
          accessToken,
          user: {
            ...user,
            email: response.user.email ?? user.email,
            firstName: response.user.firstName ?? user.firstName,
            lastName: response.user.lastName ?? user.lastName,
          },
        });
      }
    },
  });
}
