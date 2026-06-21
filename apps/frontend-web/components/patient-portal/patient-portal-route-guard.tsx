"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ALLOWED_PREFIXES = [
  "/patient/profile",
  "/patient/appointments",
  "/patient/notes",
  "/patient/billing",
  "/patient/messages",
  "/patient/notifications",
];

function isAllowedPatientRoute(pathname: string): boolean {
  if (pathname === "/patient") {
    return true;
  }

  return ALLOWED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function PatientPortalRouteGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const allowed = isAllowedPatientRoute(pathname);

  useEffect(() => {
    if (pathname === "/patient") {
      router.replace("/patient/profile");
      return;
    }

    if (!allowed) {
      router.replace("/patient/profile");
    }
  }, [allowed, pathname, router]);

  if (pathname === "/patient" || !allowed) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-96" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return <>{children}</>;
}
