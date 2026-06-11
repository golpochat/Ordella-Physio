"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import {
  createTherapistPortalApi,
  normalizeAppointmentList,
  normalizeInvoiceList,
  normalizeNoteList,
  normalizePatientList,
} from "@/lib/therapist-portal-api";
import type {
  CreateTherapistNotePayload,
  UpdateTherapistNotePayload,
  UpdateTherapistProfilePayload,
} from "@/lib/therapist-portal-types";
import { useAuthStore } from "@/store/auth.store";

export function useTherapistPortalApi() {
  const api = useApi();
  return useMemo(() => createTherapistPortalApi(api), [api]);
}

export function useTherapistContext() {
  const user = useAuthStore((state) => state.user);
  const therapistId = user?.id;
  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.email || "Therapist";

  return { user, therapistId, displayName };
}

export function useTherapistAppointments() {
  const therapistApi = useTherapistPortalApi();
  const { therapistId } = useTherapistContext();

  return useQuery({
    queryKey: ["therapist", "appointments", therapistId],
    queryFn: async () => {
      const response = await therapistApi.listAppointments({ therapistId, limit: 100 });
      return normalizeAppointmentList(response);
    },
    enabled: Boolean(therapistId),
  });
}

export function useTherapistAppointment(id: string) {
  const therapistApi = useTherapistPortalApi();

  return useQuery({
    queryKey: ["therapist", "appointments", id],
    queryFn: () => therapistApi.getAppointment(id),
    enabled: Boolean(id),
  });
}

export function useTherapistPatients() {
  const therapistApi = useTherapistPortalApi();

  return useQuery({
    queryKey: ["therapist", "patients"],
    queryFn: async () => {
      const response = await therapistApi.listPatients({ limit: 100 });
      return normalizePatientList(response);
    },
  });
}

export function useTherapistPatient(id: string) {
  const therapistApi = useTherapistPortalApi();

  return useQuery({
    queryKey: ["therapist", "patients", id],
    queryFn: () => therapistApi.getPatient(id),
    enabled: Boolean(id),
  });
}

export function useTherapistNotes() {
  const therapistApi = useTherapistPortalApi();
  const { therapistId } = useTherapistContext();

  return useQuery({
    queryKey: ["therapist", "notes", therapistId],
    queryFn: async () => {
      const response = await therapistApi.listNotes({ therapistId, limit: 100 });
      return normalizeNoteList(response);
    },
    enabled: Boolean(therapistId),
  });
}

export function useTherapistNote(id: string) {
  const therapistApi = useTherapistPortalApi();

  return useQuery({
    queryKey: ["therapist", "notes", id],
    queryFn: () => therapistApi.getNote(id),
    enabled: Boolean(id),
  });
}

export function useCreateTherapistNote() {
  const therapistApi = useTherapistPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTherapistNotePayload) => therapistApi.createNote(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["therapist", "notes"] });
    },
  });
}

export function useUpdateTherapistNote(id: string) {
  const therapistApi = useTherapistPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateTherapistNotePayload) => therapistApi.updateNote(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["therapist", "notes"] });
      queryClient.invalidateQueries({ queryKey: ["therapist", "notes", id] });
    },
  });
}

export function useDeleteTherapistNote() {
  const therapistApi = useTherapistPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => therapistApi.deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["therapist", "notes"] });
    },
  });
}

export function useTherapistBilling() {
  const therapistApi = useTherapistPortalApi();

  return useQuery({
    queryKey: ["therapist", "billing"],
    queryFn: async () => {
      const response = await therapistApi.listBilling();
      return normalizeInvoiceList(response);
    },
  });
}

export function useTherapistProfile() {
  const therapistApi = useTherapistPortalApi();

  return useQuery({
    queryKey: ["therapist", "profile"],
    queryFn: () => therapistApi.getProfile(),
  });
}

export function useUpdateTherapistProfile() {
  const therapistApi = useTherapistPortalApi();
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (payload: UpdateTherapistProfilePayload) => therapistApi.updateProfile(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["therapist", "profile"] });
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
