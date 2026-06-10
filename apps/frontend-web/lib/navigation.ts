import type { SidebarLink } from "@/components/layout/sidebar";
import { DASHBOARD_NAV_LINKS } from "./dashboard-nav";

export const MAIN_NAV_LINKS: SidebarLink[] = [
  ...DASHBOARD_NAV_LINKS,
  { href: "/appointments", label: "Appointments" },
  { href: "/patients", label: "Patients" },
  { href: "/billing", label: "Billing" },
  { href: "/notes", label: "Notes" },
  { href: "/settings", label: "Settings" },
];
