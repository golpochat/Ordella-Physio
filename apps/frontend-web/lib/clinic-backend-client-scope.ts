import type { ApiServiceKey } from "@/lib/constants";
import { isClinicBackendClient } from "@/lib/clinic-backend-normalize";

/**
 * API services proxied to the monolithic clinic backend when `USE_CLINIC_BACKEND` is on.
 * All other services still hit the Docker API gateway (different JWT issuer).
 */
const CLINIC_BACKEND_SERVICES = new Set<ApiServiceKey>([
  "auth",
  "patient",
  "appointment",
  "notes",
  "billing",
  "reporting",
  "audit",
  "notifications",
  "staffMember",
  "userRole",
]);

/** Gateway-only services that must not invalidate the clinic-backend session on 401. */
export function isGatewayOnlyWhenClinicBackend(service: ApiServiceKey): boolean {
  if (!isClinicBackendClient()) {
    return false;
  }

  return !CLINIC_BACKEND_SERVICES.has(service);
}

/** Messaging is not wired to the clinic backend yet — skip polls and workspace calls. */
export function isMessagingAvailable(): boolean {
  return !isClinicBackendClient();
}
