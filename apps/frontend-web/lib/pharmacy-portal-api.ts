import type { createApiClient } from "@/lib/api-client";
import type { UpdateUserProfileResponse } from "@/lib/clinic-portal-types";
import type {
  ClinicPrescription,
  ClinicPrescriptionAuditLog,
  CreateClinicPrescriptionPayload,
  FulfillmentActionPayload,
  FulfillmentStatus,
  PrescriptionStatus,
  UpdateClinicPrescriptionPayload,
} from "@/lib/clinic-pharmacy-types";
import { createClinicPharmacyApi } from "@/lib/clinic-pharmacy-api";
import type {
  PharmacyAppointment,
  PharmacyAppointmentListResponse,
  PharmacyInvoice,
  PharmacyPatient,
  PharmacyPatientListResponse,
  PharmacyProfile,
  UpdatePharmacyProfilePayload,
} from "@/lib/pharmacy-portal-types";

export type PharmacyApiClient = ReturnType<typeof createApiClient>;

export function normalizeList<T>(response: { data: T[] } | T[] | undefined): T[] {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  return response.data ?? [];
}

export function createPharmacyPortalApi(api: PharmacyApiClient) {
  // Prescriptions/fulfillment → pharmacy-service via BFF `/api/pharmacy`.
  // Patients, appointments, billing invoices → respective gateway services (read-only portal views).
  const pharmacyApi = createClinicPharmacyApi(api);

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

    listPrescriptions(params?: { patientId?: string; status?: PrescriptionStatus }) {
      return pharmacyApi.listPrescriptions(params);
    },

    getPrescription(id: string) {
      return pharmacyApi.getPrescription(id);
    },

    createPrescription(payload: CreateClinicPrescriptionPayload) {
      return pharmacyApi.createPrescription(payload);
    },

    updatePrescription(id: string, payload: UpdateClinicPrescriptionPayload) {
      return pharmacyApi.updatePrescription(id, payload);
    },

    issuePrescription(id: string) {
      return pharmacyApi.issuePrescription(id);
    },

    cancelPrescription(id: string) {
      return pharmacyApi.cancelPrescription(id);
    },

    getPrescriptionAuditLogs(id: string) {
      return pharmacyApi.getPrescriptionAuditLogs(id);
    },

    startFulfillment(prescriptionId: string, payload?: FulfillmentActionPayload) {
      return pharmacyApi.startFulfillment(prescriptionId, payload);
    },

    completeFulfillment(prescriptionId: string, payload?: FulfillmentActionPayload) {
      return pharmacyApi.completeFulfillment(prescriptionId, payload);
    },

    failFulfillment(prescriptionId: string, payload?: FulfillmentActionPayload) {
      return pharmacyApi.failFulfillment(prescriptionId, payload);
    },

    retryFulfillment(prescriptionId: string) {
      return pharmacyApi.retryFulfillment(prescriptionId);
    },

    listFulfillmentOrders(params?: { fulfillmentStatus?: FulfillmentStatus; patientId?: string }) {
      return pharmacyApi.listFulfillmentOrders(params);
    },

    async getFulfillmentOrder(id: string) {
      return pharmacyApi.getPrescription(id);
    },

    getProfile() {
      return api.get<PharmacyProfile>("auth", "/users/me");
    },

    updateProfile(payload: UpdatePharmacyProfilePayload) {
      return api.put<UpdateUserProfileResponse>("auth", "/users/me", payload);
    },
  };
}

export type { ClinicPrescription as PharmacyPrescription, ClinicPrescriptionAuditLog };
