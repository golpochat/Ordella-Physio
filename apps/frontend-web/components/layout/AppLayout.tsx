"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NavItem } from "@/components/navigation/NavItem";
import { Topbar } from "@/components/navigation/Topbar";
import { useAuth } from "@/hooks/useAuth";
import { getUserPortalRoles } from "@/lib/nav-roles";
import { getBrandAbbreviation } from "@/lib/nav-brand";
import { mapAuthRoleToPortalRole } from "@/lib/auth/roleRedirect";
import { TenantSuspendedBanner } from "@/components/tenants/TenantSuspendedBanner";
import {
  NAV_BRAND_TITLE,
  NAV_PROFILE_HREF,
  NAV_SETTINGS_HREF,
  navConfig,
  navIconByLabel,
  type NavRoleKey,
} from "@/components/layout/nav-config";
import { filterNavItems } from "@/lib/permissions";
import { useUiStore } from "@/store/ui.store";
import { cn } from "@/lib/cn";

export type AppLayoutProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  /** Expected portal namespace (`clinic`, `staff`, `therapist`) for cross-check. */
  portalId?: string;
};

function resolveNavRole(user: ReturnType<typeof useAuth>["user"]): NavRoleKey | undefined {
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
  if (mapped === "CLINIC_ADMIN" || mapped === "ADMIN" || mapped === "OWNER") {
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

function resolvePageTitle(pathname: string, menu: { label: string; href: string }[], fallback: string) {
  const match = menu.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  return match?.label ?? fallback;
}

type AppSidebarProps = {
  menu: { label: string; href: string }[];
  displayName: string;
  email?: string | null;
  brandTitle: string;
  userRoles: ReturnType<typeof getUserPortalRoles>;
  mobile?: boolean;
  onNavigate?: () => void;
};

function AppSidebar({
  menu,
  displayName,
  email,
  brandTitle,
  userRoles,
  mobile = false,
  onNavigate,
}: AppSidebarProps) {
  const { logout } = useAuth();
  const collapsed = useUiStore((state) => state.sidebarCollapsed);
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen);
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
        {menu.length > 0 ? (
          <div className="nav-section">
            {!showLabels ? null : <p className="nav-section-title">Menu</p>}
            <div className="nav-section-items">
              {menu.map((item) => (
                <NavItem
                  key={item.href}
                  icon={navIconByLabel[item.label] ?? "dashboard"}
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

export function AppLayout({
  children,
  title,
  subtitle,
  showSearch = false,
  portalId,
}: AppLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const mobileNavOpen = useUiStore((state) => state.mobileNavOpen);
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname, setMobileNavOpen]);

  const navRole = resolveNavRole(user);
  const userRoles = getUserPortalRoles(user);
  const menu = useMemo(
    () => (navRole ? filterNavItems(navConfig[navRole], user) : []),
    [navRole, user],
  );

  const brandTitle = navRole ? NAV_BRAND_TITLE[navRole] : "Ordella";
  const profileHref = navRole ? NAV_PROFILE_HREF[navRole] : "/login";
  const settingsHref = navRole ? NAV_SETTINGS_HREF[navRole] : "/login";

  const pageTitle = useMemo(
    () => title ?? resolvePageTitle(pathname, menu, brandTitle),
    [title, pathname, menu, brandTitle],
  );

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() ||
    user?.email ||
    brandTitle;

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!isAuthenticated || !user || !navRole) {
      router.replace("/login");
    }
  }, [hydrated, isAuthenticated, user, navRole, router]);

  if (!hydrated) {
    return null;
  }

  if (!isAuthenticated || !user || !navRole) {
    return (
      <div className="dashboard-portal flex min-h-screen items-center justify-center p-6">
        <p className="text-sm text-muted-foreground">
          Redirecting to{" "}
          <Link href="/login" className="dashboard-link">
            login
          </Link>
          …
        </p>
      </div>
    );
  }

  if (portalId === "clinic" && navRole !== "admin") {
    return null;
  }

  if (portalId === "staff" && navRole !== "staff") {
    return null;
  }

  if (portalId === "therapist" && navRole !== "therapist") {
    return null;
  }

  return (
    <div className={cn("dashboard-portal", portalId === "clinic" && "clinic-portal")}>
      <AppSidebar
        menu={menu}
        displayName={displayName}
        email={user.email}
        brandTitle={brandTitle}
        userRoles={userRoles}
      />

      {mobileNavOpen ? (
        <div className="nav-drawer-overlay md:hidden">
          <button
            type="button"
            className="nav-drawer-backdrop"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close navigation overlay"
          />
          <AppSidebar
            menu={menu}
            displayName={displayName}
            email={user.email}
            brandTitle={brandTitle}
            userRoles={userRoles}
            mobile
            onNavigate={() => setMobileNavOpen(false)}
          />
        </div>
      ) : null}

      <div className="dashboard-main">
        <Topbar
          title={pageTitle}
          subtitle={subtitle}
          showSearch={showSearch}
          settingsHref={settingsHref}
          profileHref={profileHref}
        />
        <main className="dashboard-content">
          <TenantSuspendedBanner />
          <div className="dashboard-page">{children}</div>
        </main>
      </div>
    </div>
  );
}
