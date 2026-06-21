"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { PageLoading } from "@/components/patient-portal/page-state";
import { SystemRouteEnforcer } from "@/components/navigation/system-route-enforcer";
import { eraseSessionCookie } from "@/lib/auth/session-cookie-client";
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
  const [ready, setReady] = useState(false);

  // Stale refresh cookies after DB resets trigger TOKEN_REUSE_DETECTED — clear before retrying login.
  useEffect(() => {
    if (searchParams.get("reason") !== "token-reuse-detected") {
      return;
    }

    clearAuthSession();
    void eraseSessionCookie();
  }, [searchParams]);

  // Validate session once per sign-in — not on every client navigation.
  useEffect(() => {
    let active = true;

    async function validateSession() {
      if (isPublicPath(window.location.pathname)) {
        return;
      }

      const hasSession = isAuthenticated || getStoredIsAuthenticated();
      if (hasSession) {
        await validateStoredSession();
      }
    }

    void validateSession().finally(() => {
      if (active) {
        setReady(true);
      }
    });

    return () => {
      active = false;
    };
  }, [isAuthenticated]);

  // Keep middleware cookie in sync when navigating; avoid re-validating /me each time.
  useEffect(() => {
    if (isPublicPath(pathname)) {
      clearStaleAuthOnPublicPath();
      setReady(true);
      return;
    }

    syncTenantFromSession();
    syncSessionCookieFromUser(
      useAuthStore.getState().user ?? getStoredAuthUser(),
    );
    setReady(true);
  }, [pathname]);

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

  if (!ready && !isPublicPath(pathname)) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <PageLoading rows={4} />
      </div>
    );
  }

  return (
    <>
      <SystemRouteEnforcer />
      {children}
    </>
  );
}
