import type { createApiClient } from "@/lib/api-client";
import type {
  StaffAppointment,
  StaffAppointmentListResponse,
  StaffInvoice,
  StaffNote,
  StaffNoteListResponse,
  StaffPatient,
  StaffPatientListResponse,
  StaffProfile,
  UpdateStaffProfilePayload,
} from "@/lib/staff-portal-types";

export type StaffApiClient = ReturnType<typeof createApiClient>;

export function normalizeList<T>(response: { data: T[] } | T[] | undefined): T[] {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  return response.data ?? [];
}

export function createStaffPortalApi(api: StaffApiClient) {
  return {
    listAppointments(params?: { page?: number; limit?: number }) {
      return api.get<StaffAppointmentListResponse | StaffAppointment[]>("appointment", "", {
        params,
      });
    },

    getAppointment(id: string) {
      return api.get<StaffAppointment>("appointment", `/${id}`);
    },

    listPatients(params?: { page?: number; limit?: number }) {
      return api.get<StaffPatientListResponse | StaffPatient[]>("patient", "", { params });
    },

    getPatient(id: string) {
      return api.get<StaffPatient>("patient", `/${id}`);
    },

    listBilling() {
      return api.get<StaffInvoice[]>("billing", "/invoices");
    },

    getInvoice(invoiceId: string) {
      return api.get<StaffInvoice>("billing", `/invoices/${invoiceId}`);
    },

    listNotes(params?: { page?: number; limit?: number }) {
      return api.get<StaffNoteListResponse | StaffNote[]>("notes", "", { params });
    },

    getNote(id: string) {
      return api.get<StaffNote>("notes", `/${id}`);
    },

    getProfile() {
      return api.get<StaffProfile>("auth", "/me");
    },

    updateProfile(payload: UpdateStaffProfilePayload) {
      return api.patch<StaffProfile>("auth", "/me", payload);
    },
  };
}
