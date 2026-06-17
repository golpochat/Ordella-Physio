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

export function normalizeList<T>(response: { data: T[] } | T[] | undefined): T[] {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  return response.data ?? [];
}

export function createPharmacyPortalApi(api: PharmacyApiClient) {
  async function pharmacyBffGet<T>(path: string): Promise<T> {
    const response = await fetch(`/api/pharmacy${path}`, {
      credentials: "include",
      cache: "no-store",
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error((data as { message?: string } | null)?.message ?? "Pharmacy request failed.");
    }
    return data as T;
  }

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
      return pharmacyBffGet<PharmacyPrescription[]>("/prescriptions");
    },

    getPrescription(id: string) {
      return pharmacyBffGet<PharmacyPrescription | null>(`/prescriptions/${id}`);
    },

    listFulfillmentOrders() {
      return pharmacyBffGet<PharmacyFulfillmentOrder[]>("/fulfillment");
    },

    getFulfillmentOrder(id: string) {
      return pharmacyBffGet<PharmacyFulfillmentOrder | null>(`/fulfillment/${id}`);
    },

    getProfile() {
      return api.get<PharmacyProfile>("auth", "/users/me");
    },

    updateProfile(payload: UpdatePharmacyProfilePayload) {
      return api.put<UpdateUserProfileResponse>("auth", "/users/me", payload);
    },
  };
}
