"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/helpers";

export type NavItemProps = {
  href: string;
  label: string;
  collapsed?: boolean;
};

export function NavItem({ href, label, collapsed }: NavItemProps) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        collapsed && "px-2 text-center",
      )}
    >
      {collapsed ? label.charAt(0) : label}
    </Link>
  );
}
