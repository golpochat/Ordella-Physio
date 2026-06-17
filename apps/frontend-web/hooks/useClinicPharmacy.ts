"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { useTenant } from "@/hooks/useTenant";
import { createClinicPharmacyApi } from "@/lib/clinic-pharmacy-api";
import type {
  CreateClinicPrescriptionPayload,
  FulfillmentActionPayload,
  PrescriptionStatus,
  UpdateClinicPrescriptionPayload,
} from "@/lib/clinic-pharmacy-types";

export function useClinicPharmacyApi() {
  const api = useApi();
  return useMemo(() => createClinicPharmacyApi(api), [api]);
}

function requireApi(api: ReturnType<typeof createClinicPharmacyApi> | null) {
  if (!api) throw new Error("API client is required");
  return api;
}

export function useClinicPrescriptions(filters?: { patientId?: string; status?: PrescriptionStatus }) {
  const pharmacyApi = useClinicPharmacyApi();
  const { tenantId } = useTenant();

  return useQuery({
    queryKey: ["clinic", "pharmacy", "prescriptions", tenantId, filters],
    queryFn: () => requireApi(pharmacyApi).listPrescriptions(filters),
    enabled: Boolean(tenantId),
  });
}

export function useClinicPrescription(id: string) {
  const pharmacyApi = useClinicPharmacyApi();

  return useQuery({
    queryKey: ["clinic", "pharmacy", "prescriptions", id],
    queryFn: () => requireApi(pharmacyApi).getPrescription(id),
    enabled: Boolean(id),
  });
}

export function useClinicPrescriptionAuditLogs(id: string) {
  const pharmacyApi = useClinicPharmacyApi();

  return useQuery({
    queryKey: ["clinic", "pharmacy", "prescriptions", id, "audit"],
    queryFn: () => requireApi(pharmacyApi).getPrescriptionAuditLogs(id),
    enabled: Boolean(id),
  });
}

export function useCreateClinicPrescription() {
  const pharmacyApi = useClinicPharmacyApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateClinicPrescriptionPayload) =>
      requireApi(pharmacyApi).createPrescription(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["clinic", "pharmacy", "prescriptions"] });
    },
  });
}

export function useUpdateClinicPrescription(id: string) {
  const pharmacyApi = useClinicPharmacyApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateClinicPrescriptionPayload) =>
      requireApi(pharmacyApi).updatePrescription(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["clinic", "pharmacy", "prescriptions"] });
      void queryClient.invalidateQueries({ queryKey: ["clinic", "pharmacy", "prescriptions", id] });
    },
  });
}

export function useIssueClinicPrescription() {
  const pharmacyApi = useClinicPharmacyApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => requireApi(pharmacyApi).issuePrescription(id),
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: ["clinic", "pharmacy", "prescriptions"] });
      void queryClient.invalidateQueries({ queryKey: ["clinic", "pharmacy", "prescriptions", id] });
    },
  });
}

export function useCancelClinicPrescription() {
  const pharmacyApi = useClinicPharmacyApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => requireApi(pharmacyApi).cancelPrescription(id),
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: ["clinic", "pharmacy", "prescriptions"] });
      void queryClient.invalidateQueries({ queryKey: ["clinic", "pharmacy", "prescriptions", id] });
    },
  });
}

export function useStartFulfillment(prescriptionId: string) {
  const pharmacyApi = useClinicPharmacyApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload?: FulfillmentActionPayload) =>
      requireApi(pharmacyApi).startFulfillment(prescriptionId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["clinic", "pharmacy", "prescriptions", prescriptionId] });
    },
  });
}

export function useCompleteFulfillment(prescriptionId: string) {
  const pharmacyApi = useClinicPharmacyApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload?: FulfillmentActionPayload) =>
      requireApi(pharmacyApi).completeFulfillment(prescriptionId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["clinic", "pharmacy", "prescriptions", prescriptionId] });
    },
  });
}

export function useFailFulfillment(prescriptionId: string) {
  const pharmacyApi = useClinicPharmacyApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload?: FulfillmentActionPayload) =>
      requireApi(pharmacyApi).failFulfillment(prescriptionId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["clinic", "pharmacy", "prescriptions", prescriptionId] });
    },
  });
}
