"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { canAccessRoute } from "@/lib/rbac";
import { useAuthStore } from "@/store/auth.store";

export function RoleGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const roles = useAuthStore((state) => state.user?.roles ?? []);

  useEffect(() => {
    if (roles.length > 0 && !canAccessRoute(pathname, roles)) {
      router.replace("/");
    }
  }, [pathname, roles, router]);

  return <>{children}</>;
}
