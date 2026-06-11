"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "@ordella/shared-icons";
import { cn } from "@/lib/cn";
import { MARKETING_RESOURCES_LINKS } from "@/lib/marketing-nav";

export type NavResourcesDropdownProps = {
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
};

function isResourcesActive(pathname: string): boolean {
  return MARKETING_RESOURCES_LINKS.some(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`),
  );
}

export function NavResourcesDropdown({
  onNavigate,
  variant = "desktop",
}: NavResourcesDropdownProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const active = isResourcesActive(pathname);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  if (variant === "mobile") {
    return (
      <div className="mobile-menu-resources">
        <p className="mobile-menu-resources-label">Resources</p>
        {MARKETING_RESOURCES_LINKS.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              onClick={() => {
                onNavigate?.();
              }}
              className={cn("nav-link", isActive && "nav-link-active")}
              aria-current={isActive ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("dropdown", open && "is-open")}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cn("dropdown-trigger nav-link", (active || open) && "nav-link-active")}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
          }
        }}
      >
        Resources
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      <div id={menuId} role="menu" className="dropdown-menu">
        {MARKETING_RESOURCES_LINKS.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className={cn("nav-link", isActive && "nav-link-active")}
              aria-current={isActive ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
