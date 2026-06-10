"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { useTenant } from "@/hooks/useTenant";
import {
  createClinicPortalApi,
  normalizeList,
  normalizeStaffList,
} from "@/lib/clinic-portal-api";
import type {
  CancelClinicSubscriptionPayload,
  CreateClinicAppointmentPayload,
  CreateClinicPatientPayload,
  CreateClinicSubscriptionPayload,
  CreateClinicStaffPayload,
  UpdateClinicPatientPayload,
  UpdateClinicProfilePayload,
  UpdateClinicStaffRolePayload,
} from "@/lib/clinic-portal-types";
import { useAuthStore } from "@/store/auth.store";

export function useClinicPortalApi() {
  const api = useApi();
  const { tenantId } = useTenant();
  return useMemo(
    () => (tenantId ? createClinicPortalApi(api, tenantId) : null),
    [api, tenantId],
  );
}

export function useClinicContext() {
  const user = useAuthStore((state) => state.user);
  const { tenantId } = useTenant();
  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.email || "Clinic Admin";

  return { user, tenantId, displayName };
}

function requireApi(api: ReturnType<typeof createClinicPortalApi> | null) {
  if (!api) throw new Error("Tenant context is required");
  return api;
}

export function useClinicStaff() {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "staff", tenantId],
    queryFn: async () => normalizeStaffList(await requireApi(clinicApi).listStaff()),
    enabled: Boolean(tenantId && clinicApi),
  });
}

export function useClinicTherapists() {
  const staffQuery = useClinicStaff();
  return {
    ...staffQuery,
    data: (staffQuery.data ?? []).filter((member) => member.role === "THERAPIST"),
  };
}

export function useClinicStaffOnly() {
  const staffQuery = useClinicStaff();
  return {
    ...staffQuery,
    data: (staffQuery.data ?? []).filter((member) => member.role === "STAFF"),
  };
}

export function useClinicStaffMember(staffId: string) {
  const clinicApi = useClinicPortalApi();

  return useQuery({
    queryKey: ["clinic", "staff", staffId],
    queryFn: () => requireApi(clinicApi).getStaffMember(staffId),
    enabled: Boolean(staffId && clinicApi),
  });
}

export function useCreateClinicStaff() {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateClinicStaffPayload) => requireApi(clinicApi).createStaff(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clinic", "staff"] }),
  });
}

export function useUpdateClinicStaffRole(staffId: string) {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateClinicStaffRolePayload) =>
      requireApi(clinicApi).updateStaffRole(staffId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "staff"] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "staff", staffId] });
    },
  });
}

export function useDeleteClinicStaff() {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (staffId: string) => requireApi(clinicApi).deleteStaff(staffId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clinic", "staff"] }),
  });
}

export function useClinicPatients() {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "patients", tenantId],
    queryFn: async () => normalizeList(await requireApi(clinicApi).listPatients({ limit: 100 })),
    enabled: Boolean(tenantId && clinicApi),
  });
}

export function useClinicPatient(id: string) {
  const clinicApi = useClinicPortalApi();

  return useQuery({
    queryKey: ["clinic", "patients", id],
    queryFn: () => requireApi(clinicApi).getPatient(id),
    enabled: Boolean(id && clinicApi),
  });
}

export function useCreateClinicPatient() {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateClinicPatientPayload) => requireApi(clinicApi).createPatient(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clinic", "patients"] }),
  });
}

export function useUpdateClinicPatient(id: string) {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateClinicPatientPayload) =>
      requireApi(clinicApi).updatePatient(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "patients"] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "patients", id] });
    },
  });
}

export function useDeleteClinicPatient() {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => requireApi(clinicApi).deletePatient(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clinic", "patients"] }),
  });
}

export function useClinicAppointments() {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "appointments", tenantId],
    queryFn: async () => normalizeList(await requireApi(clinicApi).listAppointments({ limit: 100 })),
    enabled: Boolean(tenantId && clinicApi),
  });
}

export function useClinicAppointment(id: string) {
  const clinicApi = useClinicPortalApi();

  return useQuery({
    queryKey: ["clinic", "appointments", id],
    queryFn: () => requireApi(clinicApi).getAppointment(id),
    enabled: Boolean(id && clinicApi),
  });
}

export function useCreateClinicAppointment() {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateClinicAppointmentPayload) =>
      requireApi(clinicApi).createAppointment(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clinic", "appointments"] }),
  });
}

export function useClinicLocations() {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "locations", tenantId],
    queryFn: async () => normalizeList(await requireApi(clinicApi).listLocations()),
    enabled: Boolean(tenantId && clinicApi),
  });
}

export function useClinicBilling() {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "billing", tenantId],
    queryFn: async () => normalizeList(await requireApi(clinicApi).listBilling()),
    enabled: Boolean(tenantId && clinicApi),
  });
}

export function useClinicSubscription() {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "subscription", tenantId],
    queryFn: () => requireApi(clinicApi).getSubscription(),
    enabled: Boolean(tenantId && clinicApi),
  });
}

export function useClinicStripeInvoices() {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "stripe-invoices", tenantId],
    queryFn: async () => {
      const invoices = await requireApi(clinicApi).listStripeInvoices();
      return Array.isArray(invoices) ? invoices : [];
    },
    enabled: Boolean(tenantId && clinicApi),
  });
}

export function useCreateClinicSubscription() {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();
  const { tenantId } = useClinicContext();

  return useMutation({
    mutationFn: (payload: CreateClinicSubscriptionPayload) =>
      requireApi(clinicApi).createSubscription(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "subscription", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "stripe-invoices", tenantId] });
    },
  });
}

export function useCancelClinicSubscription() {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();
  const { tenantId } = useClinicContext();

  return useMutation({
    mutationFn: (payload: CancelClinicSubscriptionPayload) =>
      requireApi(clinicApi).cancelSubscription(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "subscription", tenantId] });
    },
  });
}

export function useClinicCustomerPortal() {
  const clinicApi = useClinicPortalApi();

  return useMutation({
    mutationFn: (returnUrl?: string) => requireApi(clinicApi).createCustomerPortal(returnUrl),
  });
}

export function useClinicInvoice(invoiceId: string) {
  const clinicApi = useClinicPortalApi();

  return useQuery({
    queryKey: ["clinic", "billing", invoiceId],
    queryFn: () => requireApi(clinicApi).getInvoice(invoiceId),
    enabled: Boolean(invoiceId && clinicApi),
  });
}

export function useClinicNotes() {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "notes", tenantId],
    queryFn: async () => normalizeList(await requireApi(clinicApi).listNotes({ limit: 100 })),
    enabled: Boolean(tenantId && clinicApi),
  });
}

export function useClinicNote(id: string) {
  const clinicApi = useClinicPortalApi();

  return useQuery({
    queryKey: ["clinic", "notes", id],
    queryFn: () => requireApi(clinicApi).getNote(id),
    enabled: Boolean(id && clinicApi),
  });
}

export function useClinicProfile() {
  const clinicApi = useClinicPortalApi();

  return useQuery({
    queryKey: ["clinic", "profile"],
    queryFn: () => requireApi(clinicApi).getProfile(),
    enabled: Boolean(clinicApi),
  });
}

export function useUpdateClinicProfile() {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (payload: UpdateClinicProfilePayload) => requireApi(clinicApi).updateProfile(payload),
    onSuccess: (profile) => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "profile"] });
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
