import { getClinicBackendBaseUrl, useClinicBackend } from "@/lib/clinic-backend-proxy";
import { getGatewayBaseUrl } from "@/lib/gateway-proxy";

import { getOnboardingBackendBaseUrl } from "./onboarding-upstream";

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

export function getOnboardingStartTrialUrl(): string {
  return `${getOnboardingBackendBaseUrl()}/api/onboarding/start-trial`;
}

export function getOnboardingRegisterUrl(): string {
  return `${getOnboardingBackendBaseUrl()}/api/onboarding/register`;
}

export function getOnboardingConfigUrl(): string {
  return `${getOnboardingBackendBaseUrl()}/api/onboarding/config`;
}

export function getOnboardingCheckoutPreviewUrl(): string {
  return `${getOnboardingBackendBaseUrl()}/api/onboarding/checkout/preview`;
}

export function getOnboardingCheckoutCompleteUrl(): string {
  return `${getOnboardingBackendBaseUrl()}/api/onboarding/checkout/complete`;
}
