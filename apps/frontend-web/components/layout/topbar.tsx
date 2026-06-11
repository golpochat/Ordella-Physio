"use client";

import { usePathname } from "next/navigation";
import { Topbar as UnifiedTopbar } from "@/components/navigation/Topbar";
import { getDashboardTitle } from "@/lib/dashboard-nav";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";

export function Topbar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { tenant } = useTenant();

  return (
    <UnifiedTopbar
      title={getDashboardTitle(pathname)}
      subtitle={tenant?.name ?? user?.email ?? "Ordella Physio"}
    />
  );
}

export { Topbar as UnifiedTopbar } from "@/components/navigation/Topbar";
