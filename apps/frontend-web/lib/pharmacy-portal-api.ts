import type { createApiClient } from "@/lib/api-client";
import type { UpdateUserProfileResponse } from "@/lib/clinic-portal-types";
import type {
  PharmacyAppointment,
  PharmacyAppointmentListResponse,
  PharmacyFulfillmentOrder,
  PharmacyInvoice,
  PharmacyPatient,
  PharmacyPatientListResponse,
  PharmacyPrescription,
  PharmacyProfile,
  UpdatePharmacyProfilePayload,
} from "@/lib/pharmacy-portal-types";

export type PharmacyApiClient = ReturnType<typeof createApiClient>;

const PLACEHOLDER_PRESCRIPTIONS: PharmacyPrescription[] = [
  {
    id: "rx-1001",
    patientId: "patient-1",
    patientName: "Sample Patient",
    medication: "Ibuprofen 400mg",
    dosage: "1 tablet twice daily",
    status: "PENDING",
    requestedAt: new Date().toISOString(),
    appointmentId: null,
  },
  {
    id: "rx-1002",
    patientId: "patient-2",
    patientName: "Jane Doe",
    medication: "Physiotherapy gel",
    dosage: "Apply topically 3x daily",
    status: "APPROVED",
    requestedAt: new Date(Date.now() - 86_400_000).toISOString(),
    appointmentId: "appt-1",
  },
  {
    id: "rx-1003",
    patientId: "patient-3",
    patientName: "John Smith",
    medication: "Muscle relaxant",
    dosage: "1 capsule at bedtime",
    status: "DISPENSED",
    requestedAt: new Date(Date.now() - 172_800_000).toISOString(),
    appointmentId: "appt-2",
  },
];

const PLACEHOLDER_FULFILLMENT: PharmacyFulfillmentOrder[] = [
  {
    id: "ful-2001",
    prescriptionId: "rx-1002",
    patientId: "patient-2",
    patientName: "Jane Doe",
    medication: "Physiotherapy gel",
    status: "PREPARING",
    appointmentId: "appt-1",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "ful-2002",
    prescriptionId: "rx-1003",
    patientId: "patient-3",
    patientName: "John Smith",
    medication: "Muscle relaxant",
    status: "READY",
    appointmentId: "appt-2",
    updatedAt: new Date(Date.now() - 43_200_000).toISOString(),
  },
  {
    id: "ful-2003",
    prescriptionId: "rx-1001",
    patientId: "patient-1",
    patientName: "Sample Patient",
    medication: "Ibuprofen 400mg",
    status: "QUEUED",
    appointmentId: null,
    updatedAt: new Date(Date.now() - 21_600_000).toISOString(),
  },
];

export function normalizeList<T>(response: { data: T[] } | T[] | undefined): T[] {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  return response.data ?? [];
}

export function createPharmacyPortalApi(api: PharmacyApiClient) {
  return {
    listPatients(params?: { page?: number; limit?: number }) {
      return api.get<PharmacyPatientListResponse | PharmacyPatient[]>("patient", "", { params });
    },

    async getPatient(id: string) {
      const response = await api.get<{ patient: PharmacyPatient }>("patient", `/${id}`);
      return response.patient;
    },

    listAppointments(params?: { page?: number; limit?: number }) {
      return api.get<PharmacyAppointmentListResponse | PharmacyAppointment[]>("appointment", "", {
        params,
      });
    },

    getAppointment(id: string) {
      return api.get<PharmacyAppointment>("appointment", `/${id}`);
    },

    listBilling() {
      return api.get<PharmacyInvoice[]>("billing", "/invoices");
    },

    getInvoice(invoiceId: string) {
      return api.get<PharmacyInvoice>("billing", `/invoices/${invoiceId}`);
    },

    listPrescriptions() {
      return Promise.resolve(PLACEHOLDER_PRESCRIPTIONS);
    },

    getPrescription(id: string) {
      return Promise.resolve(PLACEHOLDER_PRESCRIPTIONS.find((item) => item.id === id) ?? null);
    },

    listFulfillmentOrders() {
      return Promise.resolve(PLACEHOLDER_FULFILLMENT);
    },

    getFulfillmentOrder(id: string) {
      return Promise.resolve(PLACEHOLDER_FULFILLMENT.find((item) => item.id === id) ?? null);
    },

    getProfile() {
      return api.get<PharmacyProfile>("auth", "/users/me");
    },

    updateProfile(payload: UpdatePharmacyProfilePayload) {
      return api.put<UpdateUserProfileResponse>("auth", "/users/me", payload);
    },
  };
}
