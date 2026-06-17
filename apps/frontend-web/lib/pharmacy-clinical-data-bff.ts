import type { NextRequest } from "next/server";
import { GATEWAY_PATHS, TENANT_HEADER } from "@/lib/constants";
import { getGatewayBaseUrl } from "@/lib/gateway-proxy";
import { normalizeList } from "@/lib/pharmacy-portal-api";
import {
  buildPharmacyFulfillmentOrders,
  buildPharmacyPrescriptionsFromClinicalData,
} from "@/lib/pharmacy-prescription-bff";
import type {
  PharmacyAppointment,
  PharmacyAppointmentListResponse,
  PharmacyPatient,
  PharmacyPatientListResponse,
} from "@/lib/pharmacy-portal-types";

async function fetchGatewayJson<T>(request: NextRequest, path: string): Promise<T> {
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("content-length");

  if (!headers.get(TENANT_HEADER)) {
    throw new Error("Tenant context is required.");
  }

  const response = await fetch(new URL(path, getGatewayBaseUrl()), {
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Upstream request failed (${response.status}).`);
  }

  return response.json() as Promise<T>;
}

export async function loadPharmacyClinicalData(request: NextRequest) {
  const [patientsResponse, appointmentsResponse] = await Promise.all([
    fetchGatewayJson<PharmacyPatientListResponse | PharmacyPatient[]>(
      request,
      `${GATEWAY_PATHS.patient}?limit=25`,
    ),
    fetchGatewayJson<PharmacyAppointmentListResponse | PharmacyAppointment[]>(
      request,
      `${GATEWAY_PATHS.appointment}?limit=25`,
    ),
  ]);

  const patients = normalizeList(patientsResponse);
  const appointments = normalizeList(appointmentsResponse);
  const prescriptions = buildPharmacyPrescriptionsFromClinicalData(patients, appointments);
  const fulfillment = buildPharmacyFulfillmentOrders(prescriptions);

  return { prescriptions, fulfillment };
}
