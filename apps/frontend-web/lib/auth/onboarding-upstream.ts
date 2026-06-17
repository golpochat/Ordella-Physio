import { TENANT_HEADER } from "@/lib/constants";
import { getClinicBackendBaseUrl, useClinicBackend } from "@/lib/clinic-backend-proxy";
import { getGatewayBaseUrl } from "@/lib/gateway-proxy";
import { getDefaultTenantId } from "@/lib/tenant-config";

function getAuthBackendBaseUrl(): string {
  return useClinicBackend() ? getClinicBackendBaseUrl() : getGatewayBaseUrl();
}

/** Prefer monolith clinic-backend for onboarding when reachable (Docker / local dev). */
export function getOnboardingBackendBaseUrl(): string {
  const direct =
    process.env.CLINIC_BACKEND_INTERNAL_URL ??
    process.env.NEXT_PUBLIC_CLINIC_BACKEND_URL;

  if (direct) {
    return direct.replace(/\/$/, "");
  }

  return getAuthBackendBaseUrl();
}

function usesGatewayForOnboarding(): boolean {
  const direct =
    process.env.CLINIC_BACKEND_INTERNAL_URL ??
    process.env.NEXT_PUBLIC_CLINIC_BACKEND_URL;
  return !direct;
}

/** Older gateway images require x-tenant-id before proxying public onboarding routes. */
export function buildOnboardingUpstreamHeaders(
  extra?: Record<string, string>,
): Record<string, string> {
  const headers: Record<string, string> = { ...extra };

  if (usesGatewayForOnboarding()) {
    const tenantId = getDefaultTenantId();
    if (tenantId && !headers[TENANT_HEADER]) {
      headers[TENANT_HEADER] = tenantId;
    }
  }

  return headers;
}
