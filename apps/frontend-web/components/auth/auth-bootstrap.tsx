"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { PageLoading } from "@/components/patient-portal/page-state";
import { SystemRouteEnforcer } from "@/components/navigation/system-route-enforcer";
import { eraseSessionCookie } from "@/lib/auth/session-cookie-client";
import { SessionReadyProvider } from "@/lib/auth/session-ready";
import { useAuthStoreHydrated } from "@/lib/auth/store-hydration";
import {
  clearAuthSession,
  clearStaleAuthOnPublicPath,
  ensureFreshAccessToken,
  isPublicPath,
  PROACTIVE_REFRESH_CHECK_MS,
  syncTenantFromSession,
  validateStoredSession,
} from "@/lib/session-manager";
import { syncSessionCookieFromUser } from "@/lib/auth/session-cookie-client";
import {
  getStoredAuthUser,
  getStoredIsAuthenticated,
} from "@/lib/auth-storage";
import { useAuthStore } from "@/store/auth.store";

export function AuthBootstrap({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const authStoreHydrated = useAuthStoreHydrated();
  const [ready, setReady] = useState(() => isPublicPath(pathname));
  const bootstrappedRef = useRef(isPublicPath(pathname));

  // Stale refresh cookies after DB resets trigger TOKEN_REUSE_DETECTED — clear before retrying login.
  useEffect(() => {
    if (searchParams.get("reason") !== "token-reuse-detected") {
      return;
    }

    clearAuthSession();
    void eraseSessionCookie();
  }, [searchParams]);

  useEffect(() => {
    if (!authStoreHydrated) {
      return;
    }

    if (bootstrappedRef.current) {
      if (isPublicPath(pathname)) {
        clearStaleAuthOnPublicPath();
        return;
      }

      syncTenantFromSession();
      syncSessionCookieFromUser(
        useAuthStore.getState().user ?? getStoredAuthUser(),
      );
      return;
    }

    let active = true;

    async function bootstrapSession() {
      if (isPublicPath(pathname)) {
        clearStaleAuthOnPublicPath();
        return;
      }

      syncTenantFromSession();
      syncSessionCookieFromUser(
        useAuthStore.getState().user ?? getStoredAuthUser(),
      );

      const hasSession = isAuthenticated || getStoredIsAuthenticated();
      if (!hasSession) {
        return;
      }

      await validateStoredSession();
      await ensureFreshAccessToken();
    }

    void bootstrapSession().finally(() => {
      if (!active) {
        return;
      }

      bootstrappedRef.current = true;
      setReady(true);
    });

    return () => {
      active = false;
    };
  }, [authStoreHydrated, isAuthenticated, pathname]);

  useEffect(() => {
    if (!isAuthenticated || isPublicPath(pathname)) {
      return;
    }

    const refreshIfNeeded = () => {
      void ensureFreshAccessToken();
    };

    refreshIfNeeded();
    const intervalId = window.setInterval(
      refreshIfNeeded,
      PROACTIVE_REFRESH_CHECK_MS,
    );

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshIfNeeded();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isAuthenticated, pathname]);

  if ((!ready || !authStoreHydrated) && !isPublicPath(pathname)) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <PageLoading rows={4} />
      </div>
    );
  }

  return (
    <SessionReadyProvider ready={ready}>
      <SystemRouteEnforcer />
      {children}
    </SessionReadyProvider>
  );
}
