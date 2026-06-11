"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { authClient, type AuthTokensResponse, type LoginPayload, type RegisterPayload } from "@/lib/auth-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { resolveUserRoles } from "@/lib/rbac";
import { getPortalForRole, isSystemUser, mapAuthRoleToPortalRole } from "@/lib/auth/roleRedirect";
import { syncTenantFromSession } from "@/lib/session-manager";
import { buildTenantStateFromUser } from "@/lib/tenant-sync";
import { useAuthStore } from "@/store/auth.store";
import { useTenantStore } from "@/store/tenant.store";

function normalizeAuthResponse(response: AuthTokensResponse): AuthTokensResponse {
  const roles = resolveUserRoles(response.user);
  const primaryRole = roles[0] ?? mapAuthRoleToPortalRole(response.user.role);

  return {
    ...response,
    user: {
      ...response.user,
      role: primaryRole,
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

      if (isSystemUser(normalized.user.roles)) {
        clearTenant();
      } else {
        setTenant(buildTenantStateFromUser(normalized.user, tenantName));
      }

      return normalized;
    },
    [clearTenant, setSession, setTenant],
  );

  const login = useCallback(
    async (payload: LoginPayload) => {
      try {
        const response = applySession(await authClient.login(payload), payload.tenantId);
        router.push(getPortalForRole(response.user.role));
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
        router.push(getPortalForRole(response.user.role));
      } catch (error) {
        throw new Error(getApiErrorMessage(error, "Unable to create account. Please try again."));
      }
    },
    [applySession, router],
  );

  const logout = useCallback(async () => {
    if (accessToken && refreshToken) {
      await authClient
        .logout({
          accessToken,
          refreshToken,
          tenantId: user?.tenantId ?? tenant?.id,
        })
        .catch(() => undefined);
    }
    clearSession();
    clearTenant();
    router.push("/login");
  }, [accessToken, clearSession, clearTenant, refreshToken, router, tenant?.id, user?.tenantId]);

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
