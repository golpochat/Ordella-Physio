import { API_ROUTES } from "./constants";
import { fetcher } from "./fetcher";
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

export type ResetPasswordPayload = {
  email: string;
};

export type AuthTokensResponse = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export const authClient = {
  login(payload: LoginPayload) {
    return fetcher<AuthTokensResponse>(`${API_ROUTES.auth}/login`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  register(payload: RegisterPayload) {
    return fetcher<AuthTokensResponse>(`${API_ROUTES.auth}/register`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  resetPassword(payload: ResetPasswordPayload) {
    return fetcher<void>(`${API_ROUTES.auth}/reset-password`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  refresh(refreshToken: string) {
    return fetcher<AuthTokensResponse>(`${API_ROUTES.auth}/refresh`, {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  },

  logout(accessToken: string) {
    return fetcher<void>(`${API_ROUTES.auth}/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },

  me(accessToken: string) {
    return fetcher<AuthUser>(`${API_ROUTES.auth}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};
