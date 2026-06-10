"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@ordella/shared-ui";
import { Button } from "@/components/ui/button";
import type { SidebarLink } from "./sidebar";
import { useUiStore } from "@/store/ui.store";

export type MobileNavProps = {
  links: SidebarLink[];
};

export function MobileNav({ links }: MobileNavProps) {
  const pathname = usePathname();
  const open = useUiStore((state) => state.mobileNavOpen);
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-background/80"
        onClick={() => setMobileNavOpen(false)}
        aria-label="Close navigation overlay"
      />
      <div className="absolute left-0 top-0 h-full w-72 border-r bg-card p-4 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-semibold">Navigation</p>
          <Button variant="ghost" size="sm" onClick={() => setMobileNavOpen(false)}>
            Close
          </Button>
        </div>
        <nav className="flex flex-col gap-1">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium",
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
