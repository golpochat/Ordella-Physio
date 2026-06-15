import type { NavIconName } from "@/components/navigation/NavIcon";
import { adminRoutes, staffRoutes, therapistRoutes } from "@/lib/routes";

export type NavRoleKey = "admin" | "staff" | "therapist";

export type NavConfigItem = {
  label: string;
  href: string;
};

export const navIconByLabel: Record<string, NavIconName> = {
  Overview: "dashboard",
  Dashboard: "dashboard",
  Patients: "patients",
  Appointments: "calendar",
  Therapists: "users",
  Staff: "users",
  Billing: "billing",
  Notes: "notes",
  Users: "users",
  Roles: "users",
  Locations: "clinic",
  Terminals: "clinic",
  Reports: "reports",
  "Audit logs": "logs",
  Settings: "settings",
  Today: "calendar",
  Upcoming: "calendar",
  Profile: "settings",
};

/** Role-scoped navigation aligned with `lib/routes.ts` portal namespaces. */
export const navConfig: Record<NavRoleKey, NavConfigItem[]> = {
  admin: [
    { label: "Overview", href: adminRoutes.overview },
    { label: "Patients", href: adminRoutes.patients },
    { label: "Appointments", href: adminRoutes.appointments },
    { label: "Therapists", href: adminRoutes.therapists },
    { label: "Staff", href: adminRoutes.staff },
    { label: "Billing", href: adminRoutes.billing },
    { label: "Notes", href: adminRoutes.notes },
    { label: "Users", href: adminRoutes.users },
    { label: "Roles", href: adminRoutes.roles },
    { label: "Locations", href: adminRoutes.locations },
    { label: "Terminals", href: adminRoutes.terminals },
    { label: "Reports", href: adminRoutes.reports },
    { label: "Audit logs", href: adminRoutes.auditLogs },
    { label: "Settings", href: adminRoutes.settings },
  ],
  staff: [
    { label: "Overview", href: staffRoutes.overview },
    { label: "Patients", href: staffRoutes.patients },
    { label: "Appointments", href: staffRoutes.appointments },
    { label: "Billing", href: staffRoutes.billing },
    { label: "Reports", href: staffRoutes.reports },
    { label: "Notes", href: staffRoutes.notes },
  ],
  therapist: [
    { label: "Dashboard", href: therapistRoutes.dashboard },
    { label: "Today", href: therapistRoutes.today },
    { label: "Upcoming", href: therapistRoutes.upcoming },
    { label: "Patients", href: therapistRoutes.patients },
    { label: "Notes", href: therapistRoutes.notes },
    { label: "Profile", href: therapistRoutes.profile },
    { label: "Billing", href: therapistRoutes.billing },
  ],
};

export const NAV_ROLE_PORTAL: Record<NavRoleKey, string> = {
  admin: "clinic",
  staff: "staff",
  therapist: "therapist",
};

export const NAV_BRAND_TITLE: Record<NavRoleKey, string> = {
  admin: "Clinic Admin",
  staff: "Staff",
  therapist: "Therapist",
};

export const NAV_PROFILE_HREF: Record<NavRoleKey, string> = {
  admin: adminRoutes.profile,
  staff: staffRoutes.profile,
  therapist: therapistRoutes.profile,
};

export const NAV_SETTINGS_HREF: Record<NavRoleKey, string> = {
  admin: adminRoutes.settings,
  staff: staffRoutes.profile,
  therapist: therapistRoutes.profile,
};
