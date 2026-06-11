export type MarketingNavLink = {
  href: string;
  label: string;
};

export const MARKETING_NAV_LINKS: MarketingNavLink[] = [
  { href: "/product", label: "Product" },
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
];

export const MARKETING_RESOURCES_LINKS: MarketingNavLink[] = [
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

export const MARKETING_FOOTER_COMPANY_LINKS: MarketingNavLink[] = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const MARKETING_FOOTER_LEGAL_LINKS: MarketingNavLink[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export const MARKETING_FOOTER_PRODUCT_LINKS: MarketingNavLink[] = [
  { href: "/product", label: "Overview" },
  { href: "/features", label: "Features" },
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
];
