"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@ordella/shared-ui";
import { useUiStore } from "@/store/ui.store";

export type SidebarLink = {
  href: string;
  label: string;
  roles?: string[];
};

export type SidebarProps = {
  links: SidebarLink[];
};

export function Sidebar({ links }: SidebarProps) {
  const pathname = usePathname();
  const collapsed = useUiStore((state) => state.sidebarCollapsed);

  return (
    <aside
      className={cn(
        "hidden border-r bg-card md:flex md:flex-col",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {links.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {collapsed ? link.label.charAt(0) : link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
