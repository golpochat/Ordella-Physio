import { authClient } from "@/lib/auth-client";
import { ApiError } from "@/lib/api-client";
import { PUBLIC_ROUTES } from "@/lib/constants";
import { resolveUserRoles } from "@/lib/rbac";
import { isSystemUser } from "@/lib/auth/roleRedirect";
import { buildTenantStateFromUser } from "@/lib/tenant-sync";
import { getRefreshToken } from "@/lib/utils/authStorage";
import { useAuthStore } from "@/store/auth.store";
import { useTenantStore } from "@/store/tenant.store";
import { useUiStore } from "@/store/ui.store";

let redirectingToLogin = false;
let refreshInFlight: Promise<boolean> | null = null;

export function getApiErrorCode(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const record = payload as Record<string, unknown>;
  if (record.error && typeof record.error === "object") {
    const code = (record.error as { code?: string }).code;
    return code ?? null;
  }

  return typeof record.error === "string" ? record.error : null;
}

function isTokenReuseError(error: unknown): boolean {
  if (!(error instanceof ApiError)) {
    return false;
  }

  return getApiErrorCode(error.payload) === "TOKEN_REUSE_DETECTED";
}

export function isPublicPath(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function getResolvedTenantId(): string | null {
  const tenantId = useTenantStore.getState().tenant?.id;
  const userTenantId = useAuthStore.getState().user?.tenantId;
  return tenantId ?? userTenantId ?? null;
}

export function syncTenantFromSession(): void {
  const user = useAuthStore.getState().user;
  const roles = user ? resolveUserRoles(user) : [];

  if (isSystemUser(roles)) {
    useTenantStore.getState().clearTenant();
    return;
  }

  if (!user?.tenantId) {
    return;
  }

  const currentTenant = useTenantStore.getState().tenant;
  if (!currentTenant || currentTenant.id !== user.tenantId) {
    useTenantStore.getState().setTenant(buildTenantStateFromUser(user, currentTenant?.name));
  }
}

export function clearAuthSession(): void {
  useAuthStore.getState().clearSession();
  useTenantStore.getState().clearTenant();
}

export function redirectToLogin(reason?: string): void {
  if (typeof window === "undefined" || redirectingToLogin) {
    return;
  }

  const pathname = window.location.pathname;
  if (isPublicPath(pathname)) {
    return;
  }

  redirectingToLogin = true;
  clearAuthSession();

  const loginUrl = reason ? `/login?reason=${encodeURIComponent(reason)}` : "/login";
  window.location.assign(loginUrl);
}

export async function attemptTokenRefresh(): Promise<boolean> {
  if (refreshInFlight) {
    return refreshInFlight;
  }

  refreshInFlight = (async () => {
    const refreshToken = useAuthStore.getState().refreshToken ?? getRefreshToken();
    if (!refreshToken) {
      return false;
    }

    try {
      const response = await authClient.refresh(refreshToken);
      const roles = resolveUserRoles(response.user);

      useAuthStore.getState().setSession({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: {
          ...response.user,
          roles,
          permissions: response.user.permissions ?? [],
        },
      });
      syncTenantFromSession();
      return true;
    } catch (error) {
      if (isTokenReuseError(error)) {
        clearAuthSession();
        redirectToLogin("token-reuse-detected");
        return false;
      }

      return false;
    } finally {
      refreshInFlight = null;
    }
  })();

  return refreshInFlight;
}

export function redirectToForbidden(): void {
  if (typeof window === "undefined") {
    return;
  }

  const pathname = window.location.pathname;
  if (pathname === "/forbidden" || isPublicPath(pathname)) {
    return;
  }

  window.location.assign("/forbidden");
}

export async function handleApiAuthError(status: number, error?: unknown): Promise<void> {
  if (status === 403) {
    if (getApiErrorCode(error) === "TENANT_SUSPENDED") {
      useUiStore.getState().setTenantSuspended(true);
      return;
    }

    redirectToForbidden();
    return;
  }

  if (status !== 401) {
    return;
  }

  if (isTokenReuseError(error)) {
    clearAuthSession();
    redirectToLogin("token-reuse-detected");
    return;
  }

  const refreshed = await attemptTokenRefresh();
  if (refreshed) {
    return;
  }

  const reason = getResolvedTenantId() ? "session-expired" : "missing-tenant";
  redirectToLogin(reason);
}

export async function validateStoredSession(): Promise<boolean> {
  const { accessToken, refreshToken, isAuthenticated, user } = useAuthStore.getState();
  const storedRefreshToken = refreshToken ?? getRefreshToken();

  if (!isAuthenticated || !user || !storedRefreshToken) {
    return false;
  }

  syncTenantFromSession();

  const tenantId = getResolvedTenantId();
  const roles = resolveUserRoles(user);
  if (!tenantId && !isSystemUser(roles)) {
    redirectToLogin("missing-tenant");
    return false;
  }

  if (!accessToken) {
    return attemptTokenRefresh();
  }

  try {
    await authClient.me(accessToken);
    return true;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401 && storedRefreshToken) {
      const refreshed = await attemptTokenRefresh();
      if (refreshed) {
        return true;
      }
    }

    if (error instanceof ApiError && isTokenReuseError(error)) {
      clearAuthSession();
      redirectToLogin("token-reuse-detected");
      return false;
    }

    if (error instanceof ApiError && error.status === 401) {
      redirectToLogin("session-expired");
      return false;
    }

    return true;
  }
}
