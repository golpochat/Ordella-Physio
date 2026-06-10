"use client";

import { Menu, Moon, Sun, Globe } from "lucide-react";
import { BreadcrumbItem, BreadcrumbSeparator, Breadcrumbs, Button, Avatar, AvatarFallback } from "@ordella/ui";
import { useTranslation } from "@/components/i18n-provider";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";
import { useSidebar } from "@/hooks/useSidebar";
import { useTheme } from "@/hooks/useTheme";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";

export function Topbar() {
  const { t, locale, setLocale } = useTranslation();
  const { user, logout } = useAuth();
  const { tenant } = useTenant();
  const { toggleSidebar, setMobileNavOpen } = useSidebar();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? "AD";
  const currentNav = NAV_ITEMS.find((item) => item.href === pathname || pathname.startsWith(`${item.href}/`));
  const breadcrumbLabel = currentNav ? t(currentNav.labelKey) : t("nav.dashboard");

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:inline-flex"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <p className="text-sm font-semibold">{tenant?.name ?? t("common.appName")}</p>
          <Breadcrumbs>
            <BreadcrumbItem>{t("nav.dashboard")}</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem active>{breadcrumbLabel}</BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLocale(locale === "en" ? "bn" : "en")}
          aria-label="Switch language"
        >
          <Globe className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" onClick={() => void logout()}>
          {t("auth.logout")}
        </Button>
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
