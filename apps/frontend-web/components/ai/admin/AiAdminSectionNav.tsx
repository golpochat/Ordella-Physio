"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export type AiAdminSectionNavItem = {
  href: string;
  label: string;
};

export type AiAdminSectionNavProps = {
  items: AiAdminSectionNavItem[];
  "aria-label"?: string;
  className?: string;
};

export function AiAdminSectionNav({
  items,
  "aria-label": ariaLabel = "Section navigation",
  className,
}: AiAdminSectionNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("ai-admin-section-nav", className)} aria-label={ariaLabel}>
      {items.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Button key={item.href} asChild variant={active ? "secondary" : "ghost"} size="sm">
            <Link href={item.href}>{item.label}</Link>
          </Button>
        );
      })}
    </nav>
  );
}
