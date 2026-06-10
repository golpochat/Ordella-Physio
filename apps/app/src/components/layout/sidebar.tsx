"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Calendar,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Receipt,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useUiStore } from "@/stores";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/appointments", label: "Appointments", icon: Calendar },
  { href: "/notes", label: "Notes", icon: FileText },
  { href: "/billing", label: "Billing", icon: Receipt },
  { href: "/payments", label: "Payments", icon: CreditCard },
  { href: "/communication", label: "Communication", icon: MessageSquare },
  { href: "/reporting", label: "Reporting", icon: BarChart3 },
  { href: "/settings/tenant", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const collapsed = useUiStore((state) => state.sidebarCollapsed);

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r bg-card transition-all",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <Stethoscope className="h-6 w-6 text-primary" />
        {!collapsed ? <span className="font-semibold">Ordella Physio</span> : null}
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed ? label : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
