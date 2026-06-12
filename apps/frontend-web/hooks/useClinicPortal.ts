"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { useTenant } from "@/hooks/useTenant";
import {
  createClinicPortalApi,
  normalizeAppointmentListResponse,
  normalizeInvoiceListResponse,
  normalizeList,
  normalizePatientListResponse,
  normalizeStaffList,
  normalizeUserListResponse,
} from "@/lib/clinic-portal-api";
import type {
  CancelClinicSubscriptionPayload,
  CreateClinicLocationPayload,
  UpdateClinicLocationPayload,
  ClinicLocationListFilters,
  ClinicLocationConfigNamespace,
  ClinicAppointmentListFilters,
  ClinicAppointmentCalendarFilters,
  CreateClinicAppointmentReminderPayload,
  UpdateClinicAppointmentReminderPayload,
  CreateClinicAppointmentPayload,
  UpdateClinicAppointmentPayload,
  ClinicInvoiceListFilters,
  CreateClinicInvoicePayload,
  MarkClinicInvoicePaidPayload,
  UpdateClinicInvoicePayload,
  CreateClinicPatientPayload,
  CreateClinicSubscriptionPayload,
  CreateClinicStaffPayload,
  CreateClinicUserPayload,
  UpdateClinicUserPayload,
  ChangePasswordPayload,
  ChangeClinicUserRolePayload,
  UpdateClinicPatientPayload,
  UpdateClinicProfilePayload,
  UpdateClinicStaffRolePayload,
  UserProfile,
  UpdateUserProfileResponse,
  UploadAvatarResponse,
  RemoveAvatarResponse,
  ClinicPatientListFilters,
  ClinicPatientNoteListFilters,
  CreateClinicPatientNotePayload,
  UpdateClinicPatientNotePayload,
  ClinicUserListFilters,
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

export function useClinicPatientsList(filters: ClinicPatientListFilters = {}) {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "patients", "list", tenantId, filters],
    queryFn: async () =>
      normalizePatientListResponse(await requireApi(clinicApi).listPatients(filters)),
    enabled: Boolean(tenantId && clinicApi),
  });
}

export function useClinicPatients() {
  const query = useClinicPatientsList({ page: 1, limit: 100 });

  return {
    ...query,
    data: query.data?.data ?? [],
  };
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

export function useDeactivateClinicPatient(patientId: string) {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => requireApi(clinicApi).deactivatePatient(patientId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "patients"] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "patients", patientId] });
    },
  });
}

export function useClinicPatientNotesList(patientId: string, filters: ClinicPatientNoteListFilters = {}) {
  const clinicApi = useClinicPortalApi();

  return useQuery({
    queryKey: ["clinic", "patients", patientId, "notes", filters],
    queryFn: () => requireApi(clinicApi).listPatientNotes(patientId, filters),
    enabled: Boolean(patientId && clinicApi),
  });
}

export function useClinicPatientNote(patientId: string, noteId: string) {
  const clinicApi = useClinicPortalApi();

  return useQuery({
    queryKey: ["clinic", "patients", patientId, "notes", noteId],
    queryFn: () => requireApi(clinicApi).getPatientNote(patientId, noteId),
    enabled: Boolean(patientId && noteId && clinicApi),
  });
}

export function useClinicPatientAttachments(patientId: string) {
  const clinicApi = useClinicPortalApi();

  return useQuery({
    queryKey: ["clinic", "patients", patientId, "attachments"],
    queryFn: () => requireApi(clinicApi).listPatientAttachments(patientId),
    enabled: Boolean(patientId && clinicApi),
  });
}

export function useUploadClinicPatientAttachment(patientId: string) {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, description }: { file: File; description?: string }) =>
      requireApi(clinicApi).uploadPatientAttachment(patientId, file, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "patients", patientId, "attachments"] });
    },
  });
}

export function useDeleteClinicPatientAttachment(patientId: string) {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attachmentId: string) =>
      requireApi(clinicApi).deletePatientAttachment(patientId, attachmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "patients", patientId, "attachments"] });
    },
  });
}

export function useCreateClinicPatientNote(patientId: string) {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateClinicPatientNotePayload) =>
      requireApi(clinicApi).createPatientNote(patientId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "patients", patientId, "notes"] });
    },
  });
}

export function useUpdateClinicPatientNote(patientId: string, noteId: string) {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateClinicPatientNotePayload) =>
      requireApi(clinicApi).updatePatientNote(patientId, noteId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "patients", patientId, "notes"] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "patients", patientId, "notes", noteId] });
    },
  });
}

export function useActivateClinicPatient(patientId: string) {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => requireApi(clinicApi).activatePatient(patientId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "patients"] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "patients", patientId] });
    },
  });
}

export function useClinicAppointments() {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "appointments", tenantId, "overview"],
    queryFn: async () =>
      normalizeAppointmentListResponse(
        await requireApi(clinicApi).listAppointments({ page: 1, limit: 100 }),
      ).data,
    enabled: Boolean(tenantId && clinicApi),
  });
}

export function useClinicAppointmentsList(filters: ClinicAppointmentListFilters = {}) {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "appointments", tenantId, filters],
    queryFn: async () =>
      normalizeAppointmentListResponse(
        await requireApi(clinicApi).listAppointments(filters),
      ),
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
    mutationFn: async (payload: CreateClinicAppointmentPayload) => {
      const response = await requireApi(clinicApi).createAppointment(payload);
      return "appointment" in response ? response.appointment : response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clinic", "appointments"] }),
  });
}

export function useUpdateClinicAppointment(appointmentId: string) {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateClinicAppointmentPayload) => {
      const response = await requireApi(clinicApi).updateAppointment(appointmentId, payload);
      return "appointment" in response ? response.appointment : response;
    },
    onSuccess: (appointment) => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "appointments"] });
      queryClient.setQueryData(["clinic", "appointments", appointmentId], appointment);
    },
  });
}

function useClinicAppointmentStatusMutation(
  appointmentId: string,
  action: "cancel" | "complete" | "no-show",
) {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const api = requireApi(clinicApi);
      if (action === "cancel") {
        return api.cancelAppointment(appointmentId);
      }
      if (action === "complete") {
        return api.completeAppointment(appointmentId);
      }
      return api.markAppointmentNoShow(appointmentId);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "appointments"] });
      queryClient.setQueryData(["clinic", "appointments", appointmentId], response.appointment);
    },
  });
}

export function useCancelClinicAppointment(appointmentId: string) {
  return useClinicAppointmentStatusMutation(appointmentId, "cancel");
}

export function useCompleteClinicAppointment(appointmentId: string) {
  return useClinicAppointmentStatusMutation(appointmentId, "complete");
}

export function useMarkClinicAppointmentNoShow(appointmentId: string) {
  return useClinicAppointmentStatusMutation(appointmentId, "no-show");
}

export function useClinicAppointmentReminders(appointmentId: string) {
  const clinicApi = useClinicPortalApi();

  return useQuery({
    queryKey: ["clinic", "appointments", appointmentId, "reminders"],
    queryFn: async () => {
      const response = await requireApi(clinicApi).listAppointmentReminders(appointmentId);
      return Array.isArray(response) ? response : [];
    },
    enabled: Boolean(appointmentId && clinicApi),
  });
}

export function useCreateClinicAppointmentReminder(appointmentId: string) {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateClinicAppointmentReminderPayload) =>
      requireApi(clinicApi).createAppointmentReminder(appointmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clinic", "appointments", appointmentId, "reminders"],
      });
    },
  });
}

export function useUpdateClinicAppointmentReminder(appointmentId: string, reminderId: string) {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateClinicAppointmentReminderPayload) =>
      requireApi(clinicApi).updateAppointmentReminder(appointmentId, reminderId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clinic", "appointments", appointmentId, "reminders"],
      });
    },
  });
}

export function useClinicAppointmentCalendar(filters: ClinicAppointmentCalendarFilters = {}) {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "appointments", "calendar", tenantId, filters],
    queryFn: async () => {
      const response = await requireApi(clinicApi).getCalendarEvents(filters);
      return response.data ?? [];
    },
    enabled: Boolean(tenantId && clinicApi && filters.date),
  });
}

export function useClinicLocations() {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "locations", tenantId, "active"],
    queryFn: async () => {
      const response = await requireApi(clinicApi).listLocations({
        status: "ACTIVE",
        limit: 100,
        page: 1,
      });
      return response.data ?? [];
    },
    enabled: Boolean(tenantId && clinicApi),
  });
}

export function useClinicLocationsList(filters: ClinicLocationListFilters = {}) {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "locations", tenantId, "list", filters],
    queryFn: () => requireApi(clinicApi).listLocations(filters),
    enabled: Boolean(tenantId && clinicApi),
  });
}

export function useCreateClinicLocation() {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateClinicLocationPayload) =>
      requireApi(clinicApi).createLocation(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clinic", "locations"] }),
  });
}

export function useClinicLocation(locationId: string) {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "locations", tenantId, locationId],
    queryFn: () => requireApi(clinicApi).getLocation(locationId),
    enabled: Boolean(tenantId && clinicApi && locationId),
  });
}

export function useUpdateClinicLocation(locationId: string) {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateClinicLocationPayload) =>
      requireApi(clinicApi).updateLocation(locationId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "locations"] });
      if (tenantId) {
        queryClient.invalidateQueries({ queryKey: ["clinic", "locations", tenantId, locationId] });
      }
    },
  });
}

export function useDeactivateClinicLocation(locationId: string) {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => requireApi(clinicApi).deactivateLocation(locationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "locations"] });
      if (tenantId) {
        queryClient.invalidateQueries({ queryKey: ["clinic", "locations", tenantId, locationId] });
      }
    },
  });
}

export function useActivateClinicLocation(locationId: string) {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => requireApi(clinicApi).activateLocation(locationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "locations"] });
      if (tenantId) {
        queryClient.invalidateQueries({ queryKey: ["clinic", "locations", tenantId, locationId] });
      }
    },
  });
}

export function useClinicLocationConfigNamespaces(locationId: string) {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "locations", tenantId, locationId, "config", "namespaces"],
    queryFn: () => requireApi(clinicApi).listLocationConfigNamespaces(locationId),
    enabled: Boolean(tenantId && clinicApi && locationId),
  });
}

export function useClinicLocationConfig(
  locationId: string,
  namespace: ClinicLocationConfigNamespace,
) {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "locations", tenantId, locationId, "config", namespace],
    queryFn: () => requireApi(clinicApi).getLocationConfig(locationId, namespace),
    enabled: Boolean(tenantId && clinicApi && locationId && namespace),
  });
}

export function useUpdateClinicLocationConfig(
  locationId: string,
  namespace: ClinicLocationConfigNamespace,
) {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: unknown) =>
      requireApi(clinicApi).updateLocationConfig(locationId, namespace, data),
    onSuccess: () => {
      if (tenantId) {
        queryClient.invalidateQueries({
          queryKey: ["clinic", "locations", tenantId, locationId, "config"],
        });
      }
    },
  });
}

export function useClinicBilling() {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "billing", tenantId],
    queryFn: async () =>
      normalizeInvoiceListResponse(await requireApi(clinicApi).listBilling()).data,
    enabled: Boolean(tenantId && clinicApi),
  });
}

export function useClinicInvoicesList(filters: ClinicInvoiceListFilters = {}) {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "billing", "invoices", tenantId, filters],
    queryFn: async () =>
      normalizeInvoiceListResponse(await requireApi(clinicApi).listInvoices(filters)),
    enabled: Boolean(tenantId && clinicApi),
  });
}

export function useCreateClinicInvoice() {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateClinicInvoicePayload) =>
      requireApi(clinicApi).createInvoice(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "billing"] });
    },
  });
}

export function useUpdateClinicInvoice(invoiceId: string) {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateClinicInvoicePayload) =>
      requireApi(clinicApi).updateInvoice(invoiceId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "billing"] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "billing", invoiceId] });
    },
  });
}

function useInvalidateInvoiceQueries(invoiceId: string) {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ["clinic", "billing"] });
    queryClient.invalidateQueries({ queryKey: ["clinic", "billing", "invoices"] });
    queryClient.invalidateQueries({ queryKey: ["clinic", "billing", invoiceId] });
  };
}

export function useIssueClinicInvoice(invoiceId: string) {
  const clinicApi = useClinicPortalApi();
  const invalidate = useInvalidateInvoiceQueries(invoiceId);

  return useMutation({
    mutationFn: () => requireApi(clinicApi).issueInvoice(invoiceId),
    onSuccess: invalidate,
  });
}

export function usePayClinicInvoice(invoiceId: string) {
  const clinicApi = useClinicPortalApi();
  const invalidate = useInvalidateInvoiceQueries(invoiceId);

  return useMutation({
    mutationFn: (payload?: MarkClinicInvoicePaidPayload) =>
      requireApi(clinicApi).payInvoice(invoiceId, payload),
    onSuccess: invalidate,
  });
}

export function useVoidClinicInvoice(invoiceId: string) {
  const clinicApi = useClinicPortalApi();
  const invalidate = useInvalidateInvoiceQueries(invoiceId);

  return useMutation({
    mutationFn: () => requireApi(clinicApi).voidInvoice(invoiceId),
    onSuccess: invalidate,
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
  const api = useApi();

  return useQuery({
    queryKey: ["user", "me"],
    queryFn: () => api.get<UserProfile>("auth", "/users/me"),
  });
}

export function useMyProfile() {
  return useClinicProfile();
}

export function useClinicUsers(filters: ClinicUserListFilters = {}) {
  const clinicApi = useClinicPortalApi();
  const { tenantId } = useClinicContext();

  return useQuery({
    queryKey: ["clinic", "users", tenantId, filters],
    queryFn: async () => normalizeUserListResponse(await requireApi(clinicApi).listUsers(filters)),
    enabled: Boolean(tenantId && clinicApi),
  });
}

export function useCreateClinicUser() {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();
  const { tenantId } = useClinicContext();

  return useMutation({
    mutationFn: (payload: CreateClinicUserPayload) => requireApi(clinicApi).createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "users", tenantId] });
    },
  });
}

export function useClinicUser(userId: string) {
  const clinicApi = useClinicPortalApi();

  return useQuery({
    queryKey: ["clinic", "users", userId],
    queryFn: () => requireApi(clinicApi).getUser(userId),
    enabled: Boolean(userId && clinicApi),
  });
}

export function useUpdateClinicUser(userId: string) {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();
  const { tenantId } = useClinicContext();

  return useMutation({
    mutationFn: (payload: UpdateClinicUserPayload) => requireApi(clinicApi).updateUser(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "users", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "users", userId] });
    },
  });
}

export function useDisableClinicUser(userId: string) {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();
  const { tenantId } = useClinicContext();

  return useMutation({
    mutationFn: () => requireApi(clinicApi).disableUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "users", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "users", userId] });
    },
  });
}

export function useChangeClinicUserRole(userId: string) {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();
  const { tenantId } = useClinicContext();

  return useMutation({
    mutationFn: (payload: ChangeClinicUserRolePayload) =>
      requireApi(clinicApi).changeUserRole(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "users", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "users", userId] });
    },
  });
}

export function useAdminResetClinicUserPassword(userId: string) {
  const clinicApi = useClinicPortalApi();

  return useMutation({
    mutationFn: (password: string) => requireApi(clinicApi).resetUserPassword(userId, password),
  });
}

export function useChangePassword() {
  const api = useApi();

  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      api.post<{ message: string }>("auth", "/users/change-password", payload),
  });
}

export function useActivateClinicUser(userId: string) {
  const clinicApi = useClinicPortalApi();
  const queryClient = useQueryClient();
  const { tenantId } = useClinicContext();

  return useMutation({
    mutationFn: () => requireApi(clinicApi).activateUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic", "users", tenantId] });
      queryClient.invalidateQueries({ queryKey: ["clinic", "users", userId] });
    },
  });
}

export function useUpdateClinicProfile() {
  const api = useApi();
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (payload: UpdateClinicProfilePayload) =>
      api.put<UpdateUserProfileResponse>("auth", "/users/me", payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
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

export function useUpdateMyProfile() {
  return useUpdateClinicProfile();
}

export function useUploadAvatar() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("avatar", file);
      return api.postForm<UploadAvatarResponse>("auth", "/users/me/avatar", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
}

export function useRemoveAvatar() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.delete<RemoveAvatarResponse>("auth", "/users/me/avatar"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
}
