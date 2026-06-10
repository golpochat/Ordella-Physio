import type { createApiClient } from "@/lib/api-client";
import type {
  ClinicAppointment,
  ClinicAppointmentListResponse,
  ClinicInvoice,
  ClinicNote,
  ClinicNoteListResponse,
  ClinicPatient,
  ClinicPatientListResponse,
  ClinicProfile,
  ClinicStaffMember,
  ClinicLocation,
  CreateClinicAppointmentPayload,
  CreateClinicPatientPayload,
  CreateClinicStaffPayload,
  UpdateClinicPatientPayload,
  UpdateClinicProfilePayload,
  UpdateClinicStaffRolePayload,
} from "@/lib/clinic-portal-types";

export type ClinicApiClient = ReturnType<typeof createApiClient>;

export function createClinicPortalApi(api: ClinicApiClient, tenantId: string) {
  const staffBase = `/${tenantId}/staff`;

  return {
    listStaff() {
      return api.get<ClinicStaffMember[]>("tenant", staffBase);
    },

    createStaff(payload: CreateClinicStaffPayload) {
      return api.post<ClinicStaffMember>("tenant", staffBase, payload);
    },

    updateStaffRole(staffId: string, payload: UpdateClinicStaffRolePayload) {
      return api.patch<ClinicStaffMember>("tenant", `${staffBase}/${staffId}`, payload);
    },

    deleteStaff(staffId: string) {
      return api.delete<void>("tenant", `${staffBase}/${staffId}`);
    },

    getStaffMember(staffId: string) {
      return api.get<ClinicStaffMember>("tenant", `${staffBase}/${staffId}`).catch(async () => {
        const list = await api.get<ClinicStaffMember[]>("tenant", staffBase);
        return (Array.isArray(list) ? list : []).find((item) => item.id === staffId) ?? null;
      });
    },

    listPatients(params?: { page?: number; limit?: number; name?: string }) {
      return api.get<ClinicPatientListResponse | ClinicPatient[]>("patient", "", { params });
    },

    getPatient(id: string) {
      return api.get<ClinicPatient>("patient", `/${id}`);
    },

    createPatient(payload: CreateClinicPatientPayload) {
      return api.post<ClinicPatient>("patient", "", payload);
    },

    updatePatient(id: string, payload: UpdateClinicPatientPayload) {
      return api.patch<ClinicPatient>("patient", `/${id}`, payload);
    },

    deletePatient(id: string) {
      return api.delete<void>("patient", `/${id}`);
    },

    listAppointments(params?: { page?: number; limit?: number }) {
      return api.get<ClinicAppointmentListResponse | ClinicAppointment[]>("appointment", "", {
        params,
      });
    },

    getAppointment(id: string) {
      return api.get<ClinicAppointment>("appointment", `/${id}`);
    },

    createAppointment(payload: CreateClinicAppointmentPayload) {
      return api.post<ClinicAppointment>("appointment", "", payload);
    },

    listLocations() {
      return api.get<ClinicLocation[]>("tenant", `/${tenantId}/locations`);
    },

    listBilling() {
      return api.get<ClinicInvoice[]>("billing", "/invoices");
    },

    getInvoice(invoiceId: string) {
      return api.get<ClinicInvoice>("billing", `/invoices/${invoiceId}`);
    },

    listNotes(params?: { page?: number; limit?: number }) {
      return api.get<ClinicNoteListResponse | ClinicNote[]>("notes", "", { params });
    },

    getNote(id: string) {
      return api.get<ClinicNote>("notes", `/${id}`);
    },

    getProfile() {
      return api.get<ClinicProfile>("auth", "/me");
    },

    updateProfile(payload: UpdateClinicProfilePayload) {
      return api.patch<ClinicProfile>("auth", "/me", payload);
    },
  };
}

export function normalizeList<T>(response: { data: T[] } | T[] | undefined): T[] {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  return response.data ?? [];
}

export function normalizeStaffList(response: ClinicStaffMember[] | undefined): ClinicStaffMember[] {
  return response ?? [];
}
