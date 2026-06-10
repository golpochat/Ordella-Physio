"use client";

import { NAV_ITEMS } from "@/lib/constants";
import { getNavItemsForRole } from "@/lib/rbac";
import { useTranslation } from "@/components/i18n-provider";
import { useSidebar } from "@/hooks/useSidebar";
import { useAuthStore } from "@/store/auth.store";
import { NavItem } from "./nav-item";
import { cn } from "@/lib/helpers";

export function Sidebar() {
  const { t } = useTranslation();
  const { collapsed } = useSidebar();
  const roles = useAuthStore((state) => state.user?.roles ?? []);
  const items = getNavItemsForRole(roles.length > 0 ? roles : ["STAFF"]);

  return (
    <aside
      className={cn(
        "hidden border-r bg-card md:flex md:flex-col",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className={cn("border-b p-4", collapsed && "px-2 text-center")}>
        <p className="text-sm font-semibold">{collapsed ? "O" : t("common.appName")}</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {items.map((item) => (
          <NavItem key={item.href} href={item.href} label={t(item.labelKey)} collapsed={collapsed} />
        ))}
      </nav>
    </aside>
  );
}
