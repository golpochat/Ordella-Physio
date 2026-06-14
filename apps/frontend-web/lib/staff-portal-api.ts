import type { createApiClient } from "@/lib/api-client";
import { normalizeEntity, normalizePaginatedList } from "@/lib/clinic-api-normalize";
import type { UpdateUserProfileResponse } from "@/lib/clinic-portal-types";
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

export function normalizeList<T>(response: { data: T[]; items?: T[] } | T[] | undefined): T[] {
  return normalizePaginatedList(response);
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

    async getPatient(id: string) {
      const response = await api.get<{ patient: StaffPatient } | StaffPatient>("patient", `/${id}`);
      return normalizeEntity(response)!;
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
      return api.get<StaffProfile>("auth", "/users/me");
    },

    updateProfile(payload: UpdateStaffProfilePayload) {
      return api.put<UpdateUserProfileResponse>("auth", "/users/me", payload);
    },
  };
}
