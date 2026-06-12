"use client";

import { useEffect, useState } from "react";
import { Menu, Moon, Sun } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";
import { MessagingLauncher } from "@/components/messaging/messaging-launcher";
import { NotificationLauncher } from "@/components/notifications/notification-launcher";
import { GlobalSearchBar } from "@/components/search/GlobalSearchBar";
import { useAuth } from "@/hooks/useAuth";
import { useUiStore } from "@/store/ui.store";
import { useTheme } from "next-themes";
import { cn } from "@/lib/cn";

export type TopbarProps = {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
  settingsHref?: string;
  profileHref?: string;
};

export function Topbar({
  title,
  subtitle,
  showSearch = false,
  settingsHref = "/settings",
  profileHref = "/settings/profile",
}: TopbarProps) {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? "OR";

  return (
    <header className={cn("topbar", scrolled && "topbar-scrolled")}>
      <div className="topbar-left">
        <Button
          variant="ghost"
          size="icon"
          className="topbar-menu-button md:hidden"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="topbar-menu-button hidden md:inline-flex"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="topbar-titles">
          <h1 className="topbar-title">{title}</h1>
          {subtitle ? <p className="topbar-subtitle">{subtitle}</p> : null}
        </div>
      </div>

      <div className="topbar-right">
        {showSearch ? (
          <div className="hidden lg:block">
            <GlobalSearchBar />
          </div>
        ) : null}
        <NotificationLauncher />
        <MessagingLauncher />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Dropdown
          trigger={
            <button type="button" className="topbar-avatar-button">
              <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </button>
          }
          items={[
            { label: "Profile", href: profileHref },
            { label: "Settings", href: settingsHref },
            { label: "Sign out", onSelect: () => void logout(), destructive: true },
          ]}
        />
      </div>
    </header>
  );
}
