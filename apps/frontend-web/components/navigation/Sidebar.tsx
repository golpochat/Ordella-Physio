"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NavSection } from "@/components/navigation/NavSection";
import { useAuth } from "@/hooks/useAuth";
import { getUserPortalRoles } from "@/lib/nav-roles";
import { getBrandAbbreviation } from "@/lib/nav-brand";
import type { PortalNavConfig } from "@/lib/portal-navigation";
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
  const [hoverExpanded, setHoverExpanded] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsTablet(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const isCollapsed = mobile ? false : collapsed || isTablet;
  const showLabels = mobile || !isCollapsed || hoverExpanded;

  const handleNavigate = () => {
    onNavigate?.();
    if (mobile) {
      setMobileNavOpen(false);
    }
  };

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
          <p className="sidebar-brand-abbrev" aria-label={config.brandTitle}>
            {getBrandAbbreviation(config.brandTitle)}
          </p>
        )}
      </div>

      <nav className="sidebar-nav" aria-label={`${config.brandTitle} navigation`}>
        {config.sections.map((section) => (
          <NavSection
            key={section.title}
            title={section.title}
            items={section.items}
            userRoles={userRoles}
            collapsed={!showLabels}
            onNavigate={handleNavigate}
          />
        ))}
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
