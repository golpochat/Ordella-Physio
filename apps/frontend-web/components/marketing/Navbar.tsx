"use client";

import Link from "next/link";
import { CtaLink } from "@/components/marketing/CtaLink";
import { NavResourcesDropdown } from "@/components/marketing/NavResourcesDropdown";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "@ordella/shared-icons";
import { MarketingLogo } from "@/components/marketing/MarketingLogo";
import { cn } from "@/lib/cn";
import { MARKETING_NAV_LINKS } from "@/lib/marketing-nav";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const navLinkClass = (href: string) =>
    cn("nav-link", isActive(href) && "nav-link-active");

  return (
    <header className={cn("navbar", scrolled && "scrolled")}>
      <nav className="navbar-inner marketing-container" aria-label="Main navigation">
        <div className="nav-left">
          <Link href="/" prefetch className="flex items-center">
            <MarketingLogo priority />
          </Link>
        </div>

        <div className="nav-items">
          {MARKETING_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              className={navLinkClass(link.href)}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <NavResourcesDropdown />
        </div>

        <div className="nav-right">
          <Link href="/login" prefetch className="nav-link">
            Log in
          </Link>
          <CtaLink
            href="/contact"
            prefetch
            location="navbar"
            label="Contact us"
            className="nav-cta ripple"
          >
            Contact Us
          </CtaLink>
        </div>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </nav>

      {open ? (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">
          <div className="marketing-container flex flex-col gap-sm">
            {MARKETING_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch
                onClick={() => setOpen(false)}
                className={navLinkClass(link.href)}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}

            <NavResourcesDropdown variant="mobile" onNavigate={() => setOpen(false)} />

            <Link
              href="/login"
              prefetch
              className="nav-link border-t border-brand-gray/20 pt-md"
              onClick={() => setOpen(false)}
            >
              Log in
            </Link>
            <CtaLink
              href="/contact"
              prefetch
              location="navbar_mobile"
              label="Contact us"
              className="nav-cta nav-cta-block ripple"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </CtaLink>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
