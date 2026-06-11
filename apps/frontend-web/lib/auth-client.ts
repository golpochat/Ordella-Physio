import { API_ROUTES, TENANT_HEADER } from "./constants";
import { fetcher } from "./fetcher";
import { getDefaultTenantId } from "./tenant-config";
import type { AuthUser } from "@/store/auth.store";

export type LoginPayload = {
  email: string;
  password: string;
  tenantId?: string;
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
  refreshToken: string;
  user: AuthUser;
};

export type MfaRequiredResponse = {
  mfaRequired: true;
  userId: string;
  tenantId: string;
};

export type LoginResponse = AuthTokensResponse | MfaRequiredResponse;

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

  refresh(refreshToken: string) {
    return fetcher<AuthTokensResponse>(`${API_ROUTES.auth}/refresh`, {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  },

  logout(payload: { accessToken: string; refreshToken: string; tenantId?: string }) {
    const tenantId = payload.tenantId ?? getDefaultTenantId();
    return fetcher<void>(`${API_ROUTES.auth}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${payload.accessToken}`,
        ...(tenantId ? { [TENANT_HEADER]: tenantId } : {}),
      },
      body: JSON.stringify({ refreshToken: payload.refreshToken }),
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
