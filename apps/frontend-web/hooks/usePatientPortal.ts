"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import {
  createPatientPortalApi,
  normalizeAppointmentList,
  normalizeInvoiceList,
  normalizeNoteList,
} from "@/lib/patient-portal-api";
import type { UpdatePatientProfilePayload } from "@/lib/patient-portal-types";
import { useAuthStore } from "@/store/auth.store";

export function usePatientPortalApi() {
  const api = useApi();
  return useMemo(() => createPatientPortalApi(api), [api]);
}

export function usePatientContext() {
  const user = useAuthStore((state) => state.user);
  const patientId = user?.id;
  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.email || "Patient";

  return { user, patientId, displayName };
}

export function usePatientAppointments() {
  const patientApi = usePatientPortalApi();
  const { patientId } = usePatientContext();

  return useQuery({
    queryKey: ["patient", "appointments", patientId],
    queryFn: async () => {
      const response = await patientApi.listAppointments({ patientId, limit: 50 });
      return normalizeAppointmentList(response);
    },
    enabled: Boolean(patientId),
    retry: false,
  });
}

export function usePatientAppointment(id: string) {
  const patientApi = usePatientPortalApi();

  return useQuery({
    queryKey: ["patient", "appointments", id],
    queryFn: () => patientApi.getAppointment(id),
    enabled: Boolean(id),
  });
}

export function usePatientBilling() {
  const patientApi = usePatientPortalApi();
  const { patientId } = usePatientContext();

  return useQuery({
    queryKey: ["patient", "billing", patientId],
    queryFn: async () => {
      const response = await patientApi.listBilling({ patientId });
      return normalizeInvoiceList(response);
    },
    enabled: Boolean(patientId),
    retry: false,
  });
}

export function usePatientInvoice(invoiceId: string) {
  const patientApi = usePatientPortalApi();

  return useQuery({
    queryKey: ["patient", "billing", invoiceId],
    queryFn: () => patientApi.getInvoice(invoiceId),
    enabled: Boolean(invoiceId),
  });
}

export function usePatientNotes() {
  const patientApi = usePatientPortalApi();
  const { patientId } = usePatientContext();

  return useQuery({
    queryKey: ["patient", "notes", patientId],
    queryFn: async () => {
      const response = await patientApi.listNotes({ patientId, limit: 50 });
      return normalizeNoteList(response);
    },
    enabled: Boolean(patientId),
    retry: false,
  });
}

export function usePatientNote(id: string) {
  const patientApi = usePatientPortalApi();

  return useQuery({
    queryKey: ["patient", "notes", id],
    queryFn: () => patientApi.getNote(id),
    enabled: Boolean(id),
  });
}

export function usePatientProfile() {
  const patientApi = usePatientPortalApi();
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ["patient", "profile", user?.id],
    queryFn: () => patientApi.getProfile(),
    enabled: Boolean(user?.id),
    retry: false,
  });
}

export function useUpdatePatientProfile() {
  const patientApi = usePatientPortalApi();
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (payload: UpdatePatientProfilePayload) => patientApi.updateProfile(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["patient", "profile"] });
      if (user && accessToken && refreshToken) {
        setSession({
          accessToken,
          refreshToken,
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
