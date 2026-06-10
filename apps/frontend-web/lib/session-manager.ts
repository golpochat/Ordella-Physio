import { authClient } from "@/lib/auth-client";
import { ApiError } from "@/lib/api-client";
import { PUBLIC_ROUTES } from "@/lib/constants";
import { resolveUserRoles } from "@/lib/rbac";
import { buildTenantStateFromUser } from "@/lib/tenant-sync";
import { useAuthStore } from "@/store/auth.store";
import { useTenantStore } from "@/store/tenant.store";

let redirectingToLogin = false;
let refreshInFlight: Promise<boolean> | null = null;

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
    const { refreshToken } = useAuthStore.getState();
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
    } catch {
      return false;
    } finally {
      refreshInFlight = null;
    }
  })();

  return refreshInFlight;
}

export async function handleApiAuthError(status: number): Promise<void> {
  if (status !== 401 && status !== 403) {
    return;
  }

  if (status === 401) {
    const refreshed = await attemptTokenRefresh();
    if (refreshed) {
      return;
    }
  }

  const reason =
    status === 403 ? "unauthorized" : getResolvedTenantId() ? "session-expired" : "missing-tenant";
  redirectToLogin(reason);
}

export async function validateStoredSession(): Promise<boolean> {
  const { accessToken, refreshToken, isAuthenticated } = useAuthStore.getState();

  if (!isAuthenticated || !accessToken) {
    return false;
  }

  syncTenantFromSession();

  const tenantId = getResolvedTenantId();
  const roles = resolveUserRoles(useAuthStore.getState().user ?? {});
  if (!tenantId && !roles.includes("SYSTEM")) {
    redirectToLogin("missing-tenant");
    return false;
  }

  try {
    await authClient.me(accessToken);
    return true;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401 && refreshToken) {
      const refreshed = await attemptTokenRefresh();
      if (refreshed) {
        return true;
      }
    }

    if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
      redirectToLogin(error.status === 403 ? "unauthorized" : "session-expired");
      return false;
    }

    return true;
  }
}
