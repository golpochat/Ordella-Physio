export const SITE_NAME = "Ordella Physio";
export const SITE_DESCRIPTION =
  "Modern physiotherapy practice management — scheduling, notes, billing, and patient care in one platform.";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function getGatewayUrl() {
  return process.env.NEXT_PUBLIC_API_GATEWAY_URL ?? "http://localhost:4000";
}

export const SUPPORT_EMAIL = "support@ordella.com";
export const SALES_EMAIL = "sales@ordella.com";

export const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = {
  product: [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/legal/privacy", label: "Privacy Policy" },
    { href: "/legal/terms", label: "Terms of Service" },
  ],
} as const;
