"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavIcon, type NavIconName } from "@/components/navigation/NavIcon";
import { canAccessNavItem } from "@/lib/nav-roles";
import type { PortalRole } from "@/lib/rbac";
import { cn } from "@/lib/cn";

export type NavItemProps = {
  icon: NavIconName;
  label: string;
  href: string;
  roles?: string[];
  userRoles: PortalRole[];
  collapsed?: boolean;
  onNavigate?: () => void;
};

function isNavItemActive(pathname: string, href: string): boolean {
  const segments = href.split("/").filter(Boolean).length;

  if (segments <= 1) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavItem({
  icon,
  label,
  href,
  roles,
  userRoles,
  collapsed = false,
  onNavigate,
}: NavItemProps) {
  const pathname = usePathname();

  if (!canAccessNavItem(userRoles, roles)) {
    return null;
  }

  const active = isNavItemActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn("nav-item", active && "nav-item-active")}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
    >
      <NavIcon name={icon} />
      <span className="nav-item-label">{label}</span>
    </Link>
  );
}
