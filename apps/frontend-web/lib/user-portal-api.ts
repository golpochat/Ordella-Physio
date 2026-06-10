import type { createApiClient } from "@/lib/api-client";
import type {
  PortalUserAppointment,
  PortalUserAppointmentListResponse,
  PortalUserInvoice,
  PortalUserNote,
  PortalUserNoteListResponse,
  PortalUserProfile,
  UpdatePortalUserProfilePayload,
} from "@/lib/user-portal-types";

export type UserPortalApiClient = ReturnType<typeof createApiClient>;

export function normalizeList<T>(response: { data: T[] } | T[] | undefined): T[] {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  return response.data ?? [];
}

export function createUserPortalApi(api: UserPortalApiClient) {
  return {
    listAppointments(params?: { page?: number; limit?: number; patientId?: string }) {
      return api.get<PortalUserAppointmentListResponse | PortalUserAppointment[]>(
        "appointment",
        "",
        { params },
      );
    },

    getAppointment(id: string) {
      return api.get<PortalUserAppointment>("appointment", `/${id}`);
    },

    listBilling(params?: { patientId?: string }) {
      return api.get<PortalUserInvoice[]>("billing", "/invoices", { params });
    },

    getInvoice(invoiceId: string) {
      return api.get<PortalUserInvoice>("billing", `/invoices/${invoiceId}`);
    },

    listNotes(params?: { page?: number; limit?: number; patientId?: string }) {
      return api.get<PortalUserNoteListResponse | PortalUserNote[]>("notes", "", { params });
    },

    getNote(id: string) {
      return api.get<PortalUserNote>("notes", `/${id}`);
    },

    getProfile() {
      return api.get<PortalUserProfile>("auth", "/me");
    },

    updateProfile(payload: UpdatePortalUserProfilePayload) {
      return api.patch<PortalUserProfile>("auth", "/me", payload);
    },
  };
}
