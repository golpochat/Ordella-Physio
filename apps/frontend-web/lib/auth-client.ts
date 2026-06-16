import { API_ROUTES, TENANT_HEADER } from "./constants";
import { fetcher } from "./fetcher";
import { getDefaultTenantId } from "./tenant-config";
import type { AuthUser } from "@/store/auth.store";

export type LoginPayload = {
  email: string;
  password: string;
  tenantId?: string;
};

export type RegisterWorkspacePayload = {
  clinicName: string;
  email: string;
  password: string;
  plan: "starter" | "pro" | "enterprise";
  billingCycle: "monthly" | "yearly";
  intent: "trial" | "checkout";
};

export type StartTrialPayload = {
  clinicName: string;
  email: string;
  password: string;
  plan?: "starter" | "pro" | "enterprise";
  billingCycle?: "monthly" | "yearly";
};

export type CheckoutPreviewPayload = {
  plan: "starter" | "pro";
  billingCycle: "monthly" | "yearly";
  billingCountry: string;
};

export type CompleteCheckoutPayload = {
  plan: "starter" | "pro";
  billingCycle: "monthly" | "yearly";
  billingCountry: string;
  billingStreet: string;
  billingCity: string;
  billingPostal: string;
  companyName?: string;
  cardholderName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
};

export type OnboardingConfig = {
  trialDurationDays: number;
  vatCountries: Array<{ code: string; label: string; rate: number }>;
  plans: string[];
};

export type CheckoutPreview = {
  plan: string;
  billingCycle: "monthly" | "yearly";
  monthlyEquivalent: number;
  baseAmount: number;
  billingCountry: string;
  billingCountryLabel: string;
  vatRate: number;
  vatAmount: number;
  totalAmount: number;
  renewalLabel: string;
};

export type TenantProfile = {
  id: string;
  name: string;
  address?: string | null;
  city?: string | null;
  postalCode?: string | null;
  country?: string | null;
  timezone?: string | null;
  logoUrl?: string | null;
  vatNumber?: string | null;
  profileCompletion: Record<string, boolean>;
  profileCompletionPercent: number;
};

export type TenantLoginOption = {
  id: string;
  name: string;
  slug: string;
};

export type TenantSelectionResponse = {
  requiresTenantSelection: true;
  tenants: TenantLoginOption[];
};

export type StartTrialResponse = AuthTokensResponse & {
  tenant: {
    id: string;
    name: string;
    slug: string;
    status: string;
    trialStart: string | null;
    trialEnd: string | null;
    subscriptionPlan: string | null;
  };
  intent?: "trial" | "checkout";
  billingCycle?: "monthly" | "yearly";
  plan?: string;
};

export type RegisterWorkspaceResponse = StartTrialResponse;

export type TenantTrialInfo = {
  status: string;
  trialStart: string | null;
  trialEnd: string | null;
  trialDaysRemaining: number | null;
  trialExpired: boolean;
  subscriptionPlan: string | null;
  trialDurationDays: number;
};

export type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  tenantId?: string;
};

export type RequestPasswordResetPayload = {
  email: string;
};

export type ConfirmPasswordResetPayload = {
  token: string;
  newPassword: string;
};

export type MessageResponse = {
  message: string;
};

export type AuthTokensResponse = {
  accessToken: string;
  refreshToken?: string;
  user: AuthUser;
};

export type RefreshSessionResponse = {
  accessToken: string;
  user: AuthUser;
};

export type MfaRequiredResponse = {
  mfaRequired: true;
  userId: string;
  tenantId: string;
};

export type LoginResponse = AuthTokensResponse | MfaRequiredResponse | TenantSelectionResponse;

export function isTenantSelectionResponse(
  response: LoginResponse,
): response is TenantSelectionResponse {
  return "requiresTenantSelection" in response && response.requiresTenantSelection === true;
}

export type MfaSetupResponse = {
  qrCode: string;
  secret: string;
  message: string;
};

export type MfaChallengePayload = {
  userId: string;
  token: string;
  tenantId: string;
};

export function isMfaRequiredResponse(response: LoginResponse): response is MfaRequiredResponse {
  return "mfaRequired" in response && response.mfaRequired === true;
}

export const authClient = {
  login(payload: LoginPayload) {
    return fetcher<LoginResponse>(`${API_ROUTES.auth}/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(payload),
    });
  },

  setupMfa(accessToken: string) {
    return fetcher<MfaSetupResponse>(`${API_ROUTES.auth}/mfa/setup`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },

  verifyMfa(accessToken: string, token: string) {
    return fetcher<MessageResponse>(`${API_ROUTES.auth}/mfa/verify`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ token }),
    });
  },

  disableMfa(accessToken: string) {
    return fetcher<MessageResponse>(`${API_ROUTES.auth}/mfa/disable`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },

  completeMfaChallenge(payload: MfaChallengePayload) {
    return fetcher<AuthTokensResponse>(`${API_ROUTES.auth}/mfa/challenge`, {
      method: "POST",
      headers: { [TENANT_HEADER]: payload.tenantId },
      body: JSON.stringify({ userId: payload.userId, token: payload.token }),
    });
  },

  registerWorkspace(payload: RegisterWorkspacePayload) {
    return fetcher<RegisterWorkspaceResponse>(`${API_ROUTES.onboarding}/register`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(payload),
    });
  },

  getOnboardingConfig() {
    return fetcher<OnboardingConfig>(`${API_ROUTES.onboarding}/config`);
  },

  previewCheckout(payload: CheckoutPreviewPayload) {
    return fetcher<CheckoutPreview>(`${API_ROUTES.onboarding}/checkout/preview`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  completeCheckout(accessToken: string, tenantId: string, payload: CompleteCheckoutPayload) {
    return fetcher<unknown>(`${API_ROUTES.onboarding}/checkout/complete`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        [TENANT_HEADER]: tenantId,
      },
      body: JSON.stringify(payload),
    });
  },

  getTenantProfile(accessToken: string, tenantId: string) {
    return fetcher<TenantProfile>(`${API_ROUTES.tenant}/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        [TENANT_HEADER]: tenantId,
      },
    });
  },

  updateTenantProfile(
    accessToken: string,
    tenantId: string,
    payload: Partial<TenantProfile> & { profileCompletion?: Record<string, boolean> },
  ) {
    return fetcher<TenantProfile>(`${API_ROUTES.tenant}/profile`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        [TENANT_HEADER]: tenantId,
      },
      body: JSON.stringify(payload),
    });
  },

  startTrial(payload: StartTrialPayload) {
    return fetcher<StartTrialResponse>(`${API_ROUTES.onboarding}/start-trial`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(payload),
    });
  },

  getTenantTrial(accessToken: string) {
    return fetcher<TenantTrialInfo>(`${API_ROUTES.tenant}/trial`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },

  register(payload: RegisterPayload) {
    return fetcher<AuthTokensResponse>(`${API_ROUTES.auth}/register`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  requestPasswordReset(payload: RequestPasswordResetPayload) {
    return fetcher<MessageResponse>(`${API_ROUTES.auth}/password/request`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  confirmPasswordReset(payload: ConfirmPasswordResetPayload) {
    return fetcher<MessageResponse>(`${API_ROUTES.auth}/password/reset`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  sendVerificationEmail(accessToken: string) {
    return fetcher<MessageResponse>(`${API_ROUTES.auth}/verification/send`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },

  confirmEmailVerification(token: string) {
    return fetcher<MessageResponse>(`${API_ROUTES.auth}/verification/confirm`, {
      method: "GET",
      params: { token },
    });
  },

  refresh() {
    return fetcher<RefreshSessionResponse>(`${API_ROUTES.auth}/refresh`, {
      method: "POST",
      credentials: "include",
    });
  },

  logout(payload: { accessToken: string; tenantId?: string }) {
    const tenantId = payload.tenantId ?? getDefaultTenantId();
    return fetcher<void>(`${API_ROUTES.auth}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${payload.accessToken}`,
        ...(tenantId ? { [TENANT_HEADER]: tenantId } : {}),
      },
    });
  },

  me(accessToken: string) {
    return fetcher<AuthUser>(`${API_ROUTES.auth}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },

  session(accessToken: string) {
    return fetcher<{ user: AuthUser; tenantId: string; role: string }>(`${API_ROUTES.auth}/session`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};
