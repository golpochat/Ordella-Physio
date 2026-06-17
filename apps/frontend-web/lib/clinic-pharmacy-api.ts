import type { createApiClient } from "@/lib/api-client";
import type {
  ClinicPrescription,
  ClinicPrescriptionAuditLog,
  CreateClinicPrescriptionPayload,
  FulfillmentActionPayload,
  PrescriptionStatus,
  UpdateClinicPrescriptionPayload,
} from "@/lib/clinic-pharmacy-types";

export type ClinicPharmacyApiClient = ReturnType<typeof createApiClient>;

export function createClinicPharmacyApi(api: ClinicPharmacyApiClient) {
  return {
    listPrescriptions(params?: { patientId?: string; status?: PrescriptionStatus }) {
      return api.get<ClinicPrescription[]>("pharmacy", "/prescriptions", { params });
    },

    getPrescription(id: string) {
      return api.get<ClinicPrescription>("pharmacy", `/prescriptions/${id}`);
    },

    createPrescription(payload: CreateClinicPrescriptionPayload) {
      return api.post<ClinicPrescription>("pharmacy", "/prescriptions", payload);
    },

    updatePrescription(id: string, payload: UpdateClinicPrescriptionPayload) {
      return api.patch<ClinicPrescription>("pharmacy", `/prescriptions/${id}`, payload);
    },

    issuePrescription(id: string) {
      return api.post<ClinicPrescription>("pharmacy", `/prescriptions/${id}/issue`);
    },

    cancelPrescription(id: string) {
      return api.post<ClinicPrescription>("pharmacy", `/prescriptions/${id}/cancel`);
    },

    getPrescriptionAuditLogs(id: string) {
      return api.get<ClinicPrescriptionAuditLog[]>("pharmacy", `/prescriptions/${id}/audit-logs`);
    },

    startFulfillment(prescriptionId: string, payload?: FulfillmentActionPayload) {
      return api.post<ClinicPrescription>("pharmacy", `/fulfillment/${prescriptionId}/start`, payload ?? {});
    },

    completeFulfillment(prescriptionId: string, payload?: FulfillmentActionPayload) {
      return api.post<ClinicPrescription>("pharmacy", `/fulfillment/${prescriptionId}/complete`, payload ?? {});
    },

    failFulfillment(prescriptionId: string, payload?: FulfillmentActionPayload) {
      return api.post<ClinicPrescription>("pharmacy", `/fulfillment/${prescriptionId}/fail`, payload ?? {});
    },
  };
}
