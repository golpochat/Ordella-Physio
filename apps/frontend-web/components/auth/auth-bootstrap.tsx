"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { PageLoading } from "@/components/patient-portal/page-state";
import { SystemRouteEnforcer } from "@/components/navigation/system-route-enforcer";
import {
  ensureFreshAccessToken,
  isPublicPath,
  PROACTIVE_REFRESH_CHECK_MS,
  syncTenantFromSession,
  validateStoredSession,
} from "@/lib/session-manager";
import { getStoredIsAuthenticated } from "@/lib/auth-storage";
import { useAuthStore } from "@/store/auth.store";

export function AuthBootstrap({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      syncTenantFromSession();

      const hasSession = isAuthenticated || getStoredIsAuthenticated();
      if (hasSession) {
        await validateStoredSession();
      }

      if (active) {
        setReady(true);
      }
    }

    void bootstrap();

    return () => {
      active = false;
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const refreshIfNeeded = () => {
      void ensureFreshAccessToken();
    };

    refreshIfNeeded();
    const intervalId = window.setInterval(refreshIfNeeded, PROACTIVE_REFRESH_CHECK_MS);

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
  }, [isAuthenticated]);

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
