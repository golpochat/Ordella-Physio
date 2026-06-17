"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { NavItem } from "@/components/navigation/NavItem";
import { NavSection } from "@/components/navigation/NavSection";
import { useAuth } from "@/hooks/useAuth";
import { getUserPortalRoles } from "@/lib/nav-roles";
import { getBrandAbbreviation } from "@/lib/nav-brand";
import type { PortalNavConfig } from "@/lib/portal-navigation";
import { portalHasCapability } from "@/lib/portal-capabilities";
import type { PortalRole } from "@/lib/rbac";
import { mapAuthRoleToPortalRole } from "@/lib/auth/roleRedirect";
import {
  SIDEBAR_BRAND_TITLE,
  SIDEBAR_ROLE_PORTAL,
  sidebarConfig,
  type SidebarMenuItem,
  type SidebarRoleKey,
} from "@/components/navigation/sidebar-config";
import { useUiStore } from "@/store/ui.store";
import { cn } from "@/lib/cn";

export type SidebarProps = {
  config: PortalNavConfig;
  displayName: string;
  email?: string | null;
  className?: string;
  mobile?: boolean;
  onNavigate?: () => void;
};

function resolveSidebarRole(user: ReturnType<typeof useAuth>["user"]): SidebarRoleKey | undefined {
  if (!user) {
    return undefined;
  }

  const roles = getUserPortalRoles(user);

  if (roles.some((role) => role === "CLINIC_ADMIN" || role === "ADMIN" || role === "OWNER")) {
    return "admin";
  }

  if (roles.includes("STAFF")) {
    return "staff";
  }

  if (roles.includes("THERAPIST")) {
    return "therapist";
  }

  const mapped = mapAuthRoleToPortalRole(user.role ?? "");
  if (mapped === "CLINIC_ADMIN" || mapped === "ADMIN") {
    return "admin";
  }
  if (mapped === "STAFF") {
    return "staff";
  }
  if (mapped === "THERAPIST") {
    return "therapist";
  }

  return undefined;
}

function filterMenuItems(
  items: SidebarMenuItem[],
  userRoles: PortalRole[],
  permissions: string[],
): SidebarMenuItem[] {
  return items.filter(
    (item) => !item.permission || portalHasCapability(userRoles, item.permission, permissions),
  );
}

function sidebarRoleMatchesPortal(sidebarRole: SidebarRoleKey, portalId: string): boolean {
  return SIDEBAR_ROLE_PORTAL[sidebarRole] === portalId;
}

export function Sidebar({
  config,
  displayName,
  email,
  className,
  mobile = false,
  onNavigate,
}: SidebarProps) {
  const { logout, user } = useAuth();
  const collapsed = useUiStore((state) => state.sidebarCollapsed);
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen);
  const userRoles = getUserPortalRoles(user);
  const sidebarRole = resolveSidebarRole(user);
  const [hoverExpanded, setHoverExpanded] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsTablet(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const menuItems = useMemo(() => {
    if (!sidebarRole || !sidebarRoleMatchesPortal(sidebarRole, config.id)) {
      return [];
    }

    return filterMenuItems(sidebarConfig[sidebarRole], userRoles, user?.permissions ?? []);
  }, [config.id, sidebarRole, userRoles, user?.permissions]);

  const useRbacMenu =
    Boolean(sidebarRole) && sidebarRoleMatchesPortal(sidebarRole!, config.id);

  const brandTitle = sidebarRole && useRbacMenu ? SIDEBAR_BRAND_TITLE[sidebarRole] : config.brandTitle;

  const isCollapsed = mobile ? false : collapsed || isTablet;
  const showLabels = mobile || !isCollapsed || hoverExpanded;

  const handleNavigate = () => {
    onNavigate?.();
    if (mobile) {
      setMobileNavOpen(false);
    }
  };

  if (!sidebarRole && !config.sections.length) {
    return null;
  }

  return (
    <aside
      className={cn(
        "sidebar",
        isCollapsed && "sidebar-collapsed",
        hoverExpanded && "sidebar-hover-expanded",
        mobile && "sidebar-mobile drawer",
        className,
      )}
      onMouseEnter={() => {
        if (isCollapsed && !mobile) {
          setHoverExpanded(true);
        }
      }}
      onMouseLeave={() => setHoverExpanded(false)}
    >
      <div className="sidebar-brand">
        {showLabels ? (
          <>
            <p className="sidebar-brand-name">{displayName}</p>
            {email ? <p className="sidebar-brand-email">{email}</p> : null}
          </>
        ) : (
          <p className="sidebar-brand-abbrev" aria-label={brandTitle}>
            {getBrandAbbreviation(brandTitle)}
          </p>
        )}
      </div>

      <nav className="sidebar-nav" aria-label={`${brandTitle} navigation`}>
        {useRbacMenu && menuItems.length > 0 ? (
          <div className="nav-section">
            {!showLabels ? null : <p className="nav-section-title">Menu</p>}
            <div className="nav-section-items">
              {menuItems.map((item) => (
                <NavItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  userRoles={userRoles}
                  collapsed={!showLabels}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          </div>
        ) : null}

        {!useRbacMenu
          ? config.sections.map((section) => (
              <NavSection
                key={section.title}
                title={section.title}
                items={section.items}
                userRoles={userRoles}
                collapsed={!showLabels}
                onNavigate={handleNavigate}
              />
            ))
          : null}
      </nav>

      <div className="sidebar-footer">
        <Button
          className="btn-secondary w-full"
          variant="outline"
          onClick={() => void logout()}
        >
          {showLabels ? "Logout" : "↩"}
        </Button>
      </div>
    </aside>
  );
}
