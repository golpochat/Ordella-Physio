"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  authClient,
  isMfaRequiredResponse,
  type AuthTokensResponse,
  type LoginPayload,
  type RegisterPayload,
} from "@/lib/auth-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { resolveUserRoles } from "@/lib/rbac";
import { getPortalForRole, isSystemUser, mapAuthRoleToPortalRole } from "@/lib/auth/roleRedirect";
import { clearAuthSession, syncTenantFromSession } from "@/lib/session-manager";
import { getRefreshToken } from "@/lib/utils/authStorage";
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
  const { accessToken, refreshToken, user, isAuthenticated, setSession, updateTokens } = useAuthStore();
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
        const response = await authClient.login(payload);

        if (isMfaRequiredResponse(response)) {
          const params = new URLSearchParams({
            userId: response.userId,
            tenantId: response.tenantId,
          });
          router.push(`/mfa/verify?${params.toString()}`);
          return;
        }

        const session = applySession(response, payload.tenantId);
        router.push(getPortalForRole(session.user.role));
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
    const activeRefreshToken = refreshToken ?? getRefreshToken();
    if (activeRefreshToken) {
      await authClient
        .logout({
          accessToken: accessToken ?? "",
          refreshToken: activeRefreshToken,
          tenantId: user?.tenantId ?? tenant?.id,
        })
        .catch(() => undefined);
    }
    clearAuthSession();
    router.push("/login");
  }, [accessToken, refreshToken, router, tenant?.id, user?.tenantId]);

  const refresh = useCallback(async () => {
    const activeRefreshToken = refreshToken ?? getRefreshToken();
    if (!activeRefreshToken) {
      return;
    }
    const response = normalizeAuthResponse(await authClient.refresh(activeRefreshToken));
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
