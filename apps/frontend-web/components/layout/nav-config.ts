import type { NavIconName } from "@/components/navigation/NavIcon";
import { Permission, type NavItemWithPermission } from "@/lib/permissions";
import { adminRoutes, staffRoutes, therapistRoutes } from "@/lib/routes";

export type NavRoleKey = "admin" | "staff" | "therapist";

export type NavConfigItem = NavItemWithPermission;

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
    { label: "Patients", href: adminRoutes.patients, permission: Permission.PATIENT_VIEW },
    { label: "Appointments", href: adminRoutes.appointments, permission: Permission.APPOINTMENT_MANAGE },
    { label: "Therapists", href: adminRoutes.therapists, permission: Permission.PATIENT_VIEW },
    { label: "Staff", href: adminRoutes.staff, permission: Permission.USER_MANAGE },
    { label: "Billing", href: adminRoutes.billing, permission: Permission.BILLING_MANAGE },
    { label: "Notes", href: adminRoutes.notes, permission: Permission.NOTES_READ },
    { label: "Users", href: adminRoutes.users, permission: Permission.USER_MANAGE },
    { label: "Roles", href: adminRoutes.roles, permission: Permission.ROLE_MANAGE },
    { label: "Locations", href: adminRoutes.locations, permission: Permission.TENANT_MANAGE },
    { label: "Terminals", href: adminRoutes.terminals, permission: Permission.TERMINAL_MANAGE },
    { label: "Reports", href: adminRoutes.reports, permission: Permission.REPORTING_VIEW },
    { label: "Audit logs", href: adminRoutes.auditLogs, permission: Permission.REPORTING_READ },
    { label: "Settings", href: adminRoutes.settings, anyOf: [Permission.SETTINGS_MANAGE, Permission.TENANT_MANAGE] },
  ],
  staff: [
    { label: "Overview", href: staffRoutes.overview },
    { label: "Patients", href: staffRoutes.patients, permission: Permission.PATIENT_VIEW },
    { label: "Appointments", href: staffRoutes.appointments, permission: Permission.PATIENT_VIEW },
    { label: "Billing", href: staffRoutes.billing, permission: Permission.BILLING_MANAGE },
    { label: "Reports", href: staffRoutes.reports, permission: Permission.REPORTING_VIEW },
    { label: "Notes", href: staffRoutes.notes, permission: Permission.NOTES_READ },
  ],
  therapist: [
    { label: "Dashboard", href: therapistRoutes.dashboard },
    { label: "Today", href: therapistRoutes.today, permission: Permission.APPOINTMENT_MANAGE },
    { label: "Upcoming", href: therapistRoutes.upcoming, permission: Permission.APPOINTMENT_MANAGE },
    { label: "Patients", href: therapistRoutes.patients, permission: Permission.PATIENT_VIEW },
    { label: "Notes", href: therapistRoutes.notes, permission: Permission.NOTES_READ },
    { label: "Profile", href: therapistRoutes.profile },
    { label: "Billing", href: therapistRoutes.billing, permission: Permission.BILLING_MANAGE },
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
