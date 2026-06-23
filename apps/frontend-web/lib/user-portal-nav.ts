import type { NavItemConfig } from "@/lib/portal-navigation";
import { getPortalNavConfig } from "@/lib/portal-navigation";

export type UserPortalNavLink = {
  href: string;
  label: string;
};

/** @deprecated Use `getPortalNavConfig("user")` from `lib/portal-navigation.ts`. */
export const USER_PORTAL_NAV: UserPortalNavLink[] = getPortalNavConfig("user")
  .sections.flatMap((section) => section.items)
  .map((item: NavItemConfig) => ({ href: item.href, label: item.label }));
