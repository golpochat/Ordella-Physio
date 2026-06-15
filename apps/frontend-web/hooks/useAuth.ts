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
  const { accessToken, user, isAuthenticated, setSession, updateTokens } = useAuthStore();
  const { tenant, setTenant, clearTenant } = useTenantStore();

  const applySession = useCallback(
    (response: AuthTokensResponse, tenantName?: string) => {
      const normalized = normalizeAuthResponse(response);

      setSession({
        accessToken: normalized.accessToken,
        refreshToken: normalized.refreshToken,
        user: normalized.user,
      });

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
    if (accessToken) {
      await authClient
        .logout({
          accessToken,
          tenantId: user?.tenantId ?? tenant?.id,
        })
        .catch(() => undefined);
    }
    clearAuthSession();
    router.push("/login");
  }, [accessToken, router, tenant?.id, user?.tenantId]);

  const refresh = useCallback(async () => {
    const response = normalizeAuthResponse(await authClient.refresh());
    setSession({
      accessToken: response.accessToken,
      user: response.user,
    });
    syncTenantFromSession();
    updateTokens(response.accessToken);
  }, [setSession, updateTokens]);

  return {
    accessToken,
    user,
    tenant,
    isAuthenticated,
    login,
    register,
    logout,
    refresh,
  };
}
