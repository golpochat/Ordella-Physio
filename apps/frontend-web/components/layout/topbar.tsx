"use client";

import { Menu, Moon, Sun } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/hooks/useTenant";
import { useUiStore } from "@/store/ui.store";
import { useTheme } from "next-themes";
import { MessagingLauncher } from "@/components/messaging/messaging-launcher";
import { NotificationLauncher } from "@/components/notifications/notification-launcher";

export function Topbar() {
  const { user, logout } = useAuth();
  const { tenant } = useTenant();
  const { theme, setTheme } = useTheme();
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen);

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? "OR";

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
          <p className="text-sm font-semibold">{tenant?.name ?? "Ordella Physio"}</p>
          <p className="text-xs text-muted-foreground">{user?.email ?? "Guest"}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
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
            <button type="button" className="rounded-full">
              <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </button>
          }
          items={[
            { label: "Profile", href: "/settings/profile" },
            { label: "Settings", href: "/settings" },
            { label: "Sign out", onSelect: () => void logout(), destructive: true },
          ]}
        />
      </div>
    </header>
  );
}
