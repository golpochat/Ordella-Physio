import type { SidebarLink } from "@/components/layout/sidebar";
import { DASHBOARD_ROUTES } from "./constants";

export const DASHBOARD_NAV_LINKS: SidebarLink[] = [
  { href: DASHBOARD_ROUTES.superAdmin, label: "Super Admin" },
  { href: DASHBOARD_ROUTES.admin, label: "Admin" },
  { href: DASHBOARD_ROUTES.clinic, label: "Clinic" },
  { href: DASHBOARD_ROUTES.therapist, label: "Therapist" },
  { href: DASHBOARD_ROUTES.patient, label: "Patient" },
  { href: DASHBOARD_ROUTES.pharmacy, label: "Pharmacy" },
  { href: DASHBOARD_ROUTES.staff, label: "Staff" },
  { href: DASHBOARD_ROUTES.user, label: "User" },
];

export const DASHBOARD_TITLES: Record<string, string> = {
  [DASHBOARD_ROUTES.superAdmin]: "Super Admin Dashboard",
  [DASHBOARD_ROUTES.admin]: "Admin Dashboard",
  [DASHBOARD_ROUTES.clinic]: "Clinic Dashboard",
  [DASHBOARD_ROUTES.therapist]: "Therapist Dashboard",
  [DASHBOARD_ROUTES.patient]: "Patient Dashboard",
  [DASHBOARD_ROUTES.pharmacy]: "Pharmacy Dashboard",
  [DASHBOARD_ROUTES.staff]: "Staff Dashboard",
  [DASHBOARD_ROUTES.user]: "User Dashboard",
};

export function getDashboardTitle(pathname: string): string {
  const match = DASHBOARD_NAV_LINKS.find(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`),
  );

  return match ? (DASHBOARD_TITLES[match.href] ?? match.label) : "Dashboard";
}
