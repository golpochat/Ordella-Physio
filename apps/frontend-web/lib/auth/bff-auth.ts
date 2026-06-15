import { getClinicBackendBaseUrl, useClinicBackend } from "@/lib/clinic-backend-proxy";
import { getGatewayBaseUrl } from "@/lib/gateway-proxy";

export function getAuthBackendBaseUrl(): string {
  return useClinicBackend() ? getClinicBackendBaseUrl() : getGatewayBaseUrl();
}

export function getAuthLoginUrl(): string {
  const base = getAuthBackendBaseUrl();
  return useClinicBackend() ? `${base}/api/auth/login` : `${base}/auth/login`;
}

export function getAuthRefreshUrl(): string {
  const base = getAuthBackendBaseUrl();
  return useClinicBackend() ? `${base}/api/auth/refresh` : `${base}/auth/refresh`;
}

export function getAuthLogoutUrl(): string {
  const base = getAuthBackendBaseUrl();
  return useClinicBackend() ? `${base}/api/auth/logout` : `${base}/auth/logout`;
}
