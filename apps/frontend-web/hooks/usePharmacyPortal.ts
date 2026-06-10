"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { useTenant } from "@/hooks/useTenant";
import { createPharmacyPortalApi, normalizeList } from "@/lib/pharmacy-portal-api";
import type { UpdatePharmacyProfilePayload } from "@/lib/pharmacy-portal-types";
import { useAuthStore } from "@/store/auth.store";

export function usePharmacyPortalApi() {
  const api = useApi();
  return useMemo(() => createPharmacyPortalApi(api), [api]);
}

export function usePharmacyContext() {
  const user = useAuthStore((state) => state.user);
  const { tenantId } = useTenant();
  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.email || "Pharmacy";

  return { user, tenantId, displayName };
}

function requireApi(api: ReturnType<typeof createPharmacyPortalApi> | null) {
  if (!api) throw new Error("API client is required");
  return api;
}

export function usePharmacyPatients() {
  const pharmacyApi = usePharmacyPortalApi();
  const { tenantId } = usePharmacyContext();

  return useQuery({
    queryKey: ["pharmacy", "patients", tenantId],
    queryFn: async () => normalizeList(await requireApi(pharmacyApi).listPatients({ limit: 100 })),
    enabled: Boolean(tenantId),
  });
}

export function usePharmacyPatient(id: string) {
  const pharmacyApi = usePharmacyPortalApi();

  return useQuery({
    queryKey: ["pharmacy", "patients", id],
    queryFn: () => requireApi(pharmacyApi).getPatient(id),
    enabled: Boolean(id),
  });
}

export function usePharmacyAppointments() {
  const pharmacyApi = usePharmacyPortalApi();
  const { tenantId } = usePharmacyContext();

  return useQuery({
    queryKey: ["pharmacy", "appointments", tenantId],
    queryFn: async () =>
      normalizeList(await requireApi(pharmacyApi).listAppointments({ limit: 100 })),
    enabled: Boolean(tenantId),
  });
}

export function usePharmacyAppointment(id: string) {
  const pharmacyApi = usePharmacyPortalApi();

  return useQuery({
    queryKey: ["pharmacy", "appointments", id],
    queryFn: () => requireApi(pharmacyApi).getAppointment(id),
    enabled: Boolean(id),
  });
}

export function usePharmacyBilling() {
  const pharmacyApi = usePharmacyPortalApi();
  const { tenantId } = usePharmacyContext();

  return useQuery({
    queryKey: ["pharmacy", "billing", tenantId],
    queryFn: async () => normalizeList(await requireApi(pharmacyApi).listBilling()),
    enabled: Boolean(tenantId),
  });
}

export function usePharmacyInvoice(invoiceId: string) {
  const pharmacyApi = usePharmacyPortalApi();

  return useQuery({
    queryKey: ["pharmacy", "billing", invoiceId],
    queryFn: () => requireApi(pharmacyApi).getInvoice(invoiceId),
    enabled: Boolean(invoiceId),
  });
}

export function usePharmacyPrescriptions() {
  const pharmacyApi = usePharmacyPortalApi();

  return useQuery({
    queryKey: ["pharmacy", "prescriptions"],
    queryFn: () => requireApi(pharmacyApi).listPrescriptions(),
  });
}

export function usePharmacyPrescription(id: string) {
  const pharmacyApi = usePharmacyPortalApi();

  return useQuery({
    queryKey: ["pharmacy", "prescriptions", id],
    queryFn: () => requireApi(pharmacyApi).getPrescription(id),
    enabled: Boolean(id),
  });
}

export function usePharmacyFulfillmentOrders() {
  const pharmacyApi = usePharmacyPortalApi();

  return useQuery({
    queryKey: ["pharmacy", "fulfillment"],
    queryFn: () => requireApi(pharmacyApi).listFulfillmentOrders(),
  });
}

export function usePharmacyFulfillmentOrder(id: string) {
  const pharmacyApi = usePharmacyPortalApi();

  return useQuery({
    queryKey: ["pharmacy", "fulfillment", id],
    queryFn: () => requireApi(pharmacyApi).getFulfillmentOrder(id),
    enabled: Boolean(id),
  });
}

export function usePharmacyProfile() {
  const pharmacyApi = usePharmacyPortalApi();

  return useQuery({
    queryKey: ["pharmacy", "profile"],
    queryFn: () => requireApi(pharmacyApi).getProfile(),
  });
}

export function useUpdatePharmacyProfile() {
  const pharmacyApi = usePharmacyPortalApi();
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (payload: UpdatePharmacyProfilePayload) =>
      requireApi(pharmacyApi).updateProfile(payload),
    onSuccess: (profile) => {
      queryClient.invalidateQueries({ queryKey: ["pharmacy", "profile"] });
      if (user && accessToken && refreshToken) {
        setSession({
          accessToken,
          refreshToken,
          user: {
            ...user,
            email: profile.email ?? user.email,
            firstName: profile.firstName ?? user.firstName,
            lastName: profile.lastName ?? user.lastName,
          },
        });
      }
    },
  });
}
