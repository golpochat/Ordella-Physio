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

export function usePharmacyPrescriptions(filters?: {
  patientId?: string;
  status?: import("@/lib/clinic-pharmacy-types").PrescriptionStatus;
}) {
  const pharmacyApi = usePharmacyPortalApi();

  return useQuery({
    queryKey: ["pharmacy", "prescriptions", filters],
    queryFn: () => requireApi(pharmacyApi).listPrescriptions(filters),
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

export function usePharmacyFulfillmentOrders(filters?: {
  fulfillmentStatus?: import("@/lib/clinic-pharmacy-types").FulfillmentStatus;
}) {
  const pharmacyApi = usePharmacyPortalApi();

  return useQuery({
    queryKey: ["pharmacy", "fulfillment", filters],
    queryFn: () => requireApi(pharmacyApi).listFulfillmentOrders(filters),
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
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ["pharmacy", "profile", user?.id],
    queryFn: () => requireApi(pharmacyApi).getProfile(),
    enabled: Boolean(user?.id),
    retry: false,
  });
}

export function useUpdatePharmacyProfile() {
  const pharmacyApi = usePharmacyPortalApi();
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (payload: UpdatePharmacyProfilePayload) =>
      requireApi(pharmacyApi).updateProfile(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["pharmacy", "profile"] });
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

export function useCreatePharmacyPrescription() {
  const pharmacyApi = usePharmacyPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: import("@/lib/clinic-pharmacy-types").CreateClinicPrescriptionPayload) =>
      requireApi(pharmacyApi).createPrescription(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pharmacy", "prescriptions"] });
    },
  });
}

export function useUpdatePharmacyPrescription(id: string) {
  const pharmacyApi = usePharmacyPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: import("@/lib/clinic-pharmacy-types").UpdateClinicPrescriptionPayload) =>
      requireApi(pharmacyApi).updatePrescription(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pharmacy", "prescriptions"] });
      void queryClient.invalidateQueries({ queryKey: ["pharmacy", "prescriptions", id] });
    },
  });
}

export function useIssuePharmacyPrescription() {
  const pharmacyApi = usePharmacyPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => requireApi(pharmacyApi).issuePrescription(id),
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: ["pharmacy", "prescriptions"] });
      void queryClient.invalidateQueries({ queryKey: ["pharmacy", "prescriptions", id] });
      void queryClient.invalidateQueries({ queryKey: ["pharmacy", "fulfillment"] });
    },
  });
}

export function useStartPharmacyFulfillment(prescriptionId: string) {
  const pharmacyApi = usePharmacyPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload?: import("@/lib/clinic-pharmacy-types").FulfillmentActionPayload) =>
      requireApi(pharmacyApi).startFulfillment(prescriptionId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pharmacy", "fulfillment"] });
      void queryClient.invalidateQueries({ queryKey: ["pharmacy", "fulfillment", prescriptionId] });
      void queryClient.invalidateQueries({ queryKey: ["pharmacy", "prescriptions", prescriptionId] });
    },
  });
}

export function useCompletePharmacyFulfillment(prescriptionId: string) {
  const pharmacyApi = usePharmacyPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload?: import("@/lib/clinic-pharmacy-types").FulfillmentActionPayload) =>
      requireApi(pharmacyApi).completeFulfillment(prescriptionId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pharmacy", "fulfillment"] });
      void queryClient.invalidateQueries({ queryKey: ["pharmacy", "fulfillment", prescriptionId] });
      void queryClient.invalidateQueries({ queryKey: ["pharmacy", "prescriptions", prescriptionId] });
    },
  });
}

export function useFailPharmacyFulfillment(prescriptionId: string) {
  const pharmacyApi = usePharmacyPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload?: import("@/lib/clinic-pharmacy-types").FulfillmentActionPayload) =>
      requireApi(pharmacyApi).failFulfillment(prescriptionId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pharmacy", "fulfillment"] });
      void queryClient.invalidateQueries({ queryKey: ["pharmacy", "fulfillment", prescriptionId] });
      void queryClient.invalidateQueries({ queryKey: ["pharmacy", "prescriptions", prescriptionId] });
    },
  });
}

export function useRetryPharmacyFulfillment(prescriptionId: string) {
  const pharmacyApi = usePharmacyPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => requireApi(pharmacyApi).retryFulfillment(prescriptionId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pharmacy", "fulfillment"] });
      void queryClient.invalidateQueries({ queryKey: ["pharmacy", "fulfillment", prescriptionId] });
      void queryClient.invalidateQueries({ queryKey: ["pharmacy", "prescriptions", prescriptionId] });
    },
  });
}
