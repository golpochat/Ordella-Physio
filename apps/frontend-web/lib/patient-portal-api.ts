import type { createApiClient } from "@/lib/api-client";
import type { UpdateUserProfileResponse } from "@/lib/clinic-portal-types";
import type {
  PatientAppointment,
  PatientAppointmentListResponse,
  PatientInvoice,
  PatientNote,
  PatientNoteListResponse,
  PatientProfile,
  UpdatePatientProfilePayload,
} from "@/lib/patient-portal-types";

export type PatientApiClient = ReturnType<typeof createApiClient>;

export const PATIENT_API_PATHS = {
  appointmentList: "/list",
  appointmentDetail: (id: string) => `/${id}`,
  billingList: "/list",
  billingDetail: (id: string) => `/${id}`,
  notesList: "/list",
  notesDetail: (id: string) => `/${id}`,
  userMe: "/users/me",
} as const;

export function createPatientPortalApi(api: PatientApiClient) {
  return {
    listAppointments(params?: { patientId?: string; page?: number; limit?: number }) {
      return api.get<PatientAppointmentListResponse | PatientAppointment[]>("appointment", "", {
        params,
      });
    },

    getAppointment(id: string) {
      return api.get<PatientAppointment>("appointment", PATIENT_API_PATHS.appointmentDetail(id));
    },

    listBilling(params?: { patientId?: string }) {
      return api.get<PatientInvoice[]>("billing", "/invoices", { params });
    },

    getInvoice(invoiceId: string) {
      return api.get<PatientInvoice>("billing", `/invoices/${invoiceId}`);
    },

    listNotes(params?: { patientId?: string; page?: number; limit?: number }) {
      return api.get<PatientNoteListResponse | PatientNote[]>("notes", "", { params });
    },

    getNote(id: string) {
      return api.get<PatientNote>("notes", PATIENT_API_PATHS.notesDetail(id));
    },

    getProfile() {
      return api.get<PatientProfile>("auth", PATIENT_API_PATHS.userMe);
    },

    updateProfile(payload: UpdatePatientProfilePayload) {
      return api.put<UpdateUserProfileResponse>("auth", PATIENT_API_PATHS.userMe, payload);
    },
  };
}

export function normalizeAppointmentList(
  response: PatientAppointmentListResponse | PatientAppointment[] | undefined,
): PatientAppointment[] {
  if (!response) {
    return [];
  }
  if (Array.isArray(response)) {
    return response;
  }
  return response.data ?? [];
}

export function normalizeNoteList(
  response: PatientNoteListResponse | PatientNote[] | undefined,
): PatientNote[] {
  if (!response) {
    return [];
  }
  if (Array.isArray(response)) {
    return response;
  }
  return response.data ?? [];
}

export function normalizeInvoiceList(response: PatientInvoice[] | undefined): PatientInvoice[] {
  return response ?? [];
}
