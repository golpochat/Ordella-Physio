"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/lib/constants";
import { clearAuthCookies, setAuthCookies, tokenToAuthUser } from "@/lib/auth";
import { fetcher } from "@/lib/fetcher";
import { useAuthStore, type AuthUser } from "@/store/auth.store";
import { useTenantStore } from "@/store/tenant.store";

export type LoginPayload = {
  email: string;
  password: string;
  tenantId?: string;
};

export type ResetPasswordPayload = {
  email: string;
};

type AuthTokensResponse = {
  accessToken: string;
  refreshToken: string;
  user?: AuthUser;
};

export function useAuth() {
  const router = useRouter();
  const { accessToken, refreshToken, user, isAuthenticated, setSession, updateTokens, clearSession } =
    useAuthStore();
  const { tenant, setTenant, clearTenant } = useTenantStore();

  const login = useCallback(
    async (payload: LoginPayload) => {
      const response = await fetcher<AuthTokensResponse>(`${API_ROUTES.auth}/login`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const authUser = response.user ?? tokenToAuthUser(response.accessToken);
      if (!authUser) {
        throw new Error("Unable to parse authentication session");
      }

      setSession({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: authUser,
      });
      setAuthCookies(response.accessToken, response.refreshToken, authUser.tenantId);
      setTenant({ id: authUser.tenantId, name: authUser.tenantId });
      router.push("/");
    },
    [router, setSession, setTenant],
  );

  const logout = useCallback(async () => {
    if (accessToken) {
      await fetcher<void>(`${API_ROUTES.auth}/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
      }).catch(() => undefined);
    }
    clearSession();
    clearTenant();
    clearAuthCookies();
    router.push("/login");
  }, [accessToken, clearSession, clearTenant, router]);

  const refresh = useCallback(async () => {
    if (!refreshToken) {
      return null;
    }
    const response = await fetcher<AuthTokensResponse>(`${API_ROUTES.auth}/refresh`, {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
    updateTokens(response.accessToken, response.refreshToken);
    setAuthCookies(response.accessToken, response.refreshToken, user?.tenantId ?? "");
    return response.accessToken;
  }, [refreshToken, updateTokens, user?.tenantId]);

  const resetPassword = useCallback(async (payload: ResetPasswordPayload) => {
    await fetcher<void>(`${API_ROUTES.auth}/reset-password`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }, []);

  return {
    accessToken,
    refreshToken,
    user,
    tenant,
    isAuthenticated,
    login,
    logout,
    refresh,
    resetPassword,
  };
}
