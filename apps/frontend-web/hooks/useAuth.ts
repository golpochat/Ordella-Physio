"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { authClient, type AuthTokensResponse, type LoginPayload, type RegisterPayload } from "@/lib/auth-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { getDefaultDashboardForRoles, resolveUserRoles } from "@/lib/rbac";
import { syncTenantFromSession } from "@/lib/session-manager";
import { buildTenantStateFromUser } from "@/lib/tenant-sync";
import { useAuthStore } from "@/store/auth.store";
import { useTenantStore } from "@/store/tenant.store";

function normalizeAuthResponse(response: AuthTokensResponse): AuthTokensResponse {
  const roles = resolveUserRoles(response.user);

  return {
    ...response,
    user: {
      ...response.user,
      roles,
      permissions: response.user.permissions ?? [],
    },
  };
}

export function useAuth() {
  const router = useRouter();
  const { accessToken, refreshToken, user, isAuthenticated, setSession, updateTokens, clearSession } =
    useAuthStore();
  const { tenant, setTenant, clearTenant } = useTenantStore();

  const applySession = useCallback(
    (response: AuthTokensResponse, tenantName?: string) => {
      const normalized = normalizeAuthResponse(response);
      setSession(normalized);
      setTenant(buildTenantStateFromUser(normalized.user, tenantName));
      return normalized;
    },
    [setSession, setTenant],
  );

  const login = useCallback(
    async (payload: LoginPayload) => {
      try {
        const response = applySession(await authClient.login(payload), payload.tenantId);
        router.push(getDefaultDashboardForRoles(response.user.roles));
      } catch (error) {
        throw new Error(getApiErrorMessage(error, "Unable to sign in. Check your credentials and tenant."));
      }
    },
    [applySession, router],
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      try {
        const response = applySession(await authClient.register(payload), payload.tenantId);
        router.push(getDefaultDashboardForRoles(response.user.roles));
      } catch (error) {
        throw new Error(getApiErrorMessage(error, "Unable to create account. Please try again."));
      }
    },
    [applySession, router],
  );

  const logout = useCallback(async () => {
    if (accessToken) {
      await authClient.logout(accessToken).catch(() => undefined);
    }
    clearSession();
    clearTenant();
    router.push("/login");
  }, [accessToken, clearSession, clearTenant, router]);

  const refresh = useCallback(async () => {
    if (!refreshToken) {
      return;
    }
    const response = normalizeAuthResponse(await authClient.refresh(refreshToken));
    setSession(response);
    syncTenantFromSession();
    updateTokens(response.accessToken, response.refreshToken);
  }, [refreshToken, setSession, updateTokens]);

  return {
    accessToken,
    refreshToken,
    user,
    tenant,
    isAuthenticated,
    login,
    register,
    logout,
    refresh,
  };
}
