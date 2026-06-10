"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { authClient, type AuthTokensResponse, type LoginPayload, type RegisterPayload } from "@/lib/auth-client";
import { getDefaultDashboardForRoles, type PortalRole } from "@/lib/rbac";
import { useAuthStore, type AuthUser } from "@/store/auth.store";
import { useTenantStore } from "@/store/tenant.store";

function resolveUserRoles(user: Pick<AuthUser, "role" | "roles">): PortalRole[] {
  if (user.roles?.length) {
    return user.roles;
  }

  return user.role ? [user.role] : [];
}

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

  const login = useCallback(
    async (payload: LoginPayload) => {
      const response = normalizeAuthResponse(await authClient.login(payload));
      setSession(response);
      setTenant({
        id: response.user.tenantId,
        name: response.user.tenantId,
        portalType: response.user.role === "PATIENT" ? "patient" : "clinic",
      });
      router.push(getDefaultDashboardForRoles(response.user.roles));
    },
    [router, setSession, setTenant],
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      const response = normalizeAuthResponse(await authClient.register(payload));
      setSession(response);
      router.push(getDefaultDashboardForRoles(response.user.roles));
    },
    [router, setSession],
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
    const response = await authClient.refresh(refreshToken);
    updateTokens(response.accessToken, response.refreshToken);
  }, [refreshToken, updateTokens]);

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
