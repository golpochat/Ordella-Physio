import type { createApiClient } from "@/lib/api-client";
import type {
  CreateTherapistNotePayload,
  TherapistAppointment,
  TherapistAppointmentListResponse,
  TherapistInvoice,
  TherapistNote,
  TherapistNoteListResponse,
  TherapistPatient,
  TherapistPatientListResponse,
  TherapistProfile,
  UpdateTherapistNotePayload,
  UpdateTherapistProfilePayload,
} from "@/lib/therapist-portal-types";

export type TherapistApiClient = ReturnType<typeof createApiClient>;

export function createTherapistPortalApi(api: TherapistApiClient) {
  return {
    listAppointments(params?: { therapistId?: string; page?: number; limit?: number }) {
      return api.get<TherapistAppointmentListResponse | TherapistAppointment[]>("appointment", "", {
        params,
      });
    },

    getAppointment(id: string) {
      return api.get<TherapistAppointment>("appointment", `/${id}`);
    },

    listPatients(params?: { page?: number; limit?: number; query?: string }) {
      return api.get<TherapistPatientListResponse | TherapistPatient[]>("patient", "", { params });
    },

    getPatient(id: string) {
      return api.get<TherapistPatient>("patient", `/${id}`);
    },

    listNotes(params?: { therapistId?: string; patientId?: string; page?: number; limit?: number }) {
      return api.get<TherapistNoteListResponse | TherapistNote[]>("notes", "", { params });
    },

    getNote(id: string) {
      return api.get<TherapistNote>("notes", `/${id}`);
    },

    createNote(payload: CreateTherapistNotePayload) {
      return api.post<TherapistNote>("notes", "", payload);
    },

    updateNote(id: string, payload: UpdateTherapistNotePayload) {
      return api.patch<TherapistNote>("notes", `/${id}`, payload);
    },

    deleteNote(id: string) {
      return api.delete<void>("notes", `/${id}`);
    },

    listBilling() {
      return api.get<TherapistInvoice[]>("billing", "/invoices");
    },

    getProfile() {
      return api.get<TherapistProfile>("auth", "/me");
    },

    updateProfile(payload: UpdateTherapistProfilePayload) {
      return api.patch<TherapistProfile>("auth", "/me", payload);
    },
  };
}

export function normalizeAppointmentList(
  response: TherapistAppointmentListResponse | TherapistAppointment[] | undefined,
): TherapistAppointment[] {
  if (!response) {
    return [];
  }
  if (Array.isArray(response)) {
    return response;
  }
  return response.data ?? [];
}

export function normalizePatientList(
  response: TherapistPatientListResponse | TherapistPatient[] | undefined,
): TherapistPatient[] {
  if (!response) {
    return [];
  }
  if (Array.isArray(response)) {
    return response;
  }
  return response.data ?? [];
}

export function normalizeNoteList(
  response: TherapistNoteListResponse | TherapistNote[] | undefined,
): TherapistNote[] {
  if (!response) {
    return [];
  }
  if (Array.isArray(response)) {
    return response;
  }
  return response.data ?? [];
}

export function normalizeInvoiceList(response: TherapistInvoice[] | undefined): TherapistInvoice[] {
  return response ?? [];
}
