import Link from "next/link";
import { ExperimentCta } from "@/components/marketing/ExperimentCta";
import { MarketingLogo } from "@/components/marketing/MarketingLogo";
import { marketingButtonPrimaryClass, marketingHeading } from "@/lib/marketing-ui";
import { cn } from "@/lib/cn";
import {
  MARKETING_FOOTER_COMPANY_LINKS,
  MARKETING_FOOTER_LEGAL_LINKS,
  MARKETING_FOOTER_PRODUCT_LINKS,
} from "@/lib/marketing-nav";

const SOCIAL_LINKS = [
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://twitter.com", label: "Twitter" },
  { href: "https://instagram.com", label: "Instagram" },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-2xl border-t border-brand-gray/20 bg-brand-light py-2xl"
      role="contentinfo"
    >
      <div className="marketing-container mb-xl rounded-lg bg-card p-xl text-center shadow-soft">
        <h2 className={cn("mb-sm", marketingHeading.h3)}>Ready to modernize your clinic?</h2>
        <p className={cn("mb-md", marketingHeading.body)}>
          Join clinics using Ordella Physio to streamline operations and patient care.
        </p>
        <ExperimentCta
          experimentId="footer_cta"
          location="footer"
          size="default"
          variantA={{
            href: "/contact",
            label: "Footer get started",
            children: "Get Started",
            buttonClassName: marketingButtonPrimaryClass,
          }}
          variantB={{
            href: "/contact",
            label: "Footer book a demo",
            children: "Book a Demo",
            buttonClassName: marketingButtonPrimaryClass,
          }}
        />
      </div>

      <div className="marketing-container grid grid-cols-1 gap-xl md:grid-cols-4">
        <div>
          <Link href="/" prefetch className="mb-md flex items-center gap-sm">
            <MarketingLogo />
          </Link>
          <p className="max-w-sm text-brand-gray">
            A modern, unified platform for physiotherapy clinics — built for clarity, efficiency,
            and exceptional patient care.
          </p>
        </div>

        <nav aria-labelledby="footer-product-heading">
          <h4
            id="footer-product-heading"
            className="mb-sm font-display text-lg font-semibold text-foreground"
          >
            Product
          </h4>
          <ul className="space-y-xs text-brand-gray">
            {MARKETING_FOOTER_PRODUCT_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch
                  className="link-underline transition-colors hover:text-brand-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-company-heading">
          <h4
            id="footer-company-heading"
            className="mb-sm font-display text-lg font-semibold text-foreground"
          >
            Company
          </h4>
          <ul className="space-y-xs text-brand-gray">
            {MARKETING_FOOTER_COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch
                  className="link-underline transition-colors hover:text-brand-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-connect-heading">
          <h4
            id="footer-connect-heading"
            className="mb-sm font-display text-lg font-semibold text-foreground"
          >
            Connect
          </h4>
          <ul className="space-y-xs text-brand-gray">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline transition-colors hover:text-brand-primary"
                  aria-label={`Visit Ordella Physio on ${link.label} (opens in new tab)`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="marketing-container mt-xl border-t border-brand-gray/20 pt-xl">
        <div className="flex flex-col items-center justify-between gap-md text-sm text-brand-gray md:flex-row">
          <p>&copy; {currentYear} Ordella Physio. All rights reserved.</p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center justify-center gap-md">
              {MARKETING_FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch
                    className="link-underline transition-colors hover:text-brand-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
