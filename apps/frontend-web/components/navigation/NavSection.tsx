"use client";

import { NavItem } from "@/components/navigation/NavItem";
import type { NavSectionConfig } from "@/lib/portal-navigation";
import type { PortalRole } from "@/lib/rbac";
import { canAccessNavItem } from "@/lib/nav-roles";

export type NavSectionProps = {
  title: string;
  items: NavSectionConfig["items"];
  userRoles: PortalRole[];
  collapsed?: boolean;
  onNavigate?: () => void;
};

export function NavSection({
  title,
  items,
  userRoles,
  collapsed = false,
  onNavigate,
}: NavSectionProps) {
  const visibleItems = items.filter((item) => canAccessNavItem(userRoles, item.roles));

  if (!visibleItems.length) {
    return null;
  }

  return (
    <div className="nav-section">
      {!collapsed ? <p className="nav-section-title">{title}</p> : null}
      <div className="nav-section-items">
        {visibleItems.map((item) => (
          <NavItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            roles={item.roles}
            userRoles={userRoles}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}
