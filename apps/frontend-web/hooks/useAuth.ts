"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  authClient,
  isMfaRequiredResponse,
  isTenantSelectionResponse,
  type AuthTokensResponse,
  type CompleteCheckoutPayload,
  type LoginPayload,
  type RegisterWorkspacePayload,
  type StartTrialPayload,
  type TenantSelectionResponse,
} from "@/lib/auth-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { resolveUserRoles } from "@/lib/rbac";
import { getPortalForRoles, isSystemUser, mapAuthRoleToPortalRole } from "@/lib/auth/roleRedirect";
import { clearAuthSession, syncTenantFromSession } from "@/lib/session-manager";
import { buildTenantStateFromUser } from "@/lib/tenant-sync";
import { useAuthStore } from "@/store/auth.store";
import { useTenantStore } from "@/store/tenant.store";

function normalizeAuthResponse(response: AuthTokensResponse): AuthTokensResponse {
  const roles = resolveUserRoles(response.user);
  const primaryRole = roles[0] ?? mapAuthRoleToPortalRole(response.user.role);
  const permissions =
    response.user.permissions ??
    (response.user as { resolvedPermissions?: string[] }).resolvedPermissions ??
    [];

  return {
    ...response,
    user: {
      ...response.user,
      role: primaryRole,
      roles,
      permissions,
      effectiveRole:
        response.user.effectiveRole ??
        (response.user as { effectiveRole?: string }).effectiveRole,
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
    async (payload: LoginPayload): Promise<TenantSelectionResponse | void> => {
      try {
        const response = await authClient.login(payload);

        if (isTenantSelectionResponse(response)) {
          return response;
        }

        if (isMfaRequiredResponse(response)) {
          const params = new URLSearchParams({
            userId: response.userId,
            tenantId: response.tenantId,
          });
          router.push(`/mfa/verify?${params.toString()}`);
          return;
        }

        const session = applySession(response, response.user.tenantId);
        router.push(getPortalForRoles(session.user.roles));
      } catch (error) {
        throw new Error(getApiErrorMessage(error, "Unable to sign in. Check your credentials."));
      }
    },
    [applySession, router],
  );

  const registerWorkspace = useCallback(
    async (payload: RegisterWorkspacePayload) => {
      try {
        const result = await authClient.registerWorkspace(payload);
        const { tenant: tenantInfo, intent, billingCycle, plan, ...auth } = result;
        const session = applySession(auth, tenantInfo.name);

        if (billingCycle && plan && (intent === "checkout" || intent === "trial")) {
          const params = new URLSearchParams({
            plan,
            cycle: billingCycle,
            intent,
          });
          router.push(`/checkout?${params.toString()}`);
          return session;
        }

        router.push(getPortalForRoles(session.user.roles));
        return session;
      } catch (error) {
        throw new Error(getApiErrorMessage(error, "Unable to create your clinic workspace."));
      }
    },
    [applySession, router],
  );

  const startTrial = useCallback(
    async (payload: StartTrialPayload) => {
      return registerWorkspace({
        clinicName: payload.clinicName,
        email: payload.email,
        password: payload.password,
        plan: payload.plan ?? "starter",
        billingCycle: payload.billingCycle ?? "yearly",
        intent: "trial",
      });
    },
    [registerWorkspace],
  );

  const refresh = useCallback(async () => {
    const response = normalizeAuthResponse(await authClient.refresh());
    setSession({
      accessToken: response.accessToken,
      user: response.user,
    });
    syncTenantFromSession();
    updateTokens(response.accessToken);
  }, [setSession, updateTokens]);

  const completeCheckout = useCallback(
    async (payload: CompleteCheckoutPayload) => {
      if (!accessToken || !user?.tenantId) {
        throw new Error("You must be signed in to complete checkout.");
      }

      try {
        await authClient.completeCheckout(accessToken, user.tenantId, payload);
        await refresh();
        router.push(getPortalForRoles(resolveUserRoles(user)));
      } catch (error) {
        throw new Error(getApiErrorMessage(error, "Unable to complete payment."));
      }
    },
    [accessToken, refresh, router, user],
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

  return {
    accessToken,
    user,
    tenant,
    isAuthenticated,
    login,
    registerWorkspace,
    startTrial,
    completeCheckout,
    logout,
    refresh,
  };
}
