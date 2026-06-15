import type { NavIconName } from "@/components/navigation/NavIcon";
import type { PortalCapability } from "@/lib/portal-capabilities";
import { adminRoutes, staffRoutes, therapistRoutes } from "@/lib/routes";

export type SidebarRoleKey = "admin" | "staff" | "therapist";

export type SidebarMenuItem = {
  label: string;
  icon: NavIconName;
  href: string;
  permission?: PortalCapability;
};

export const sidebarConfig: Record<SidebarRoleKey, SidebarMenuItem[]> = {
  admin: [
    { label: "Overview", icon: "dashboard", href: adminRoutes.root },
    { label: "Patients", icon: "patients", href: adminRoutes.patients, permission: "patients:read" },
    {
      label: "Appointments",
      icon: "calendar",
      href: adminRoutes.appointments,
      permission: "appointments:read",
    },
    {
      label: "Therapists",
      icon: "users",
      href: adminRoutes.therapists,
      permission: "appointments:read",
    },
    { label: "Staff", icon: "users", href: adminRoutes.staff, permission: "patients:write" },
    { label: "Billing", icon: "billing", href: adminRoutes.billing, permission: "billing:read" },
    { label: "Notes", icon: "notes", href: adminRoutes.notes, permission: "notes:read" },
    { label: "Users", icon: "users", href: adminRoutes.users, permission: "patients:write" },
    { label: "Roles", icon: "users", href: adminRoutes.roles, permission: "patients:write" },
    { label: "Locations", icon: "clinic", href: adminRoutes.locations, permission: "patients:write" },
    { label: "Terminals", icon: "clinic", href: adminRoutes.terminals, permission: "patients:write" },
    { label: "Reports", icon: "reports", href: adminRoutes.reports, permission: "reports:read" },
    { label: "Audit logs", icon: "logs", href: adminRoutes.auditLogs, permission: "reports:read" },
    { label: "Settings", icon: "settings", href: adminRoutes.settings, permission: "profile:read" },
  ],
  staff: [
    { label: "Overview", icon: "dashboard", href: staffRoutes.root },
    { label: "Patients", icon: "patients", href: staffRoutes.patients, permission: "patients:read" },
    {
      label: "Appointments",
      icon: "calendar",
      href: staffRoutes.appointments,
      permission: "appointments:read",
    },
    { label: "Billing", icon: "billing", href: staffRoutes.billing, permission: "billing:read" },
    { label: "Reports", icon: "reports", href: staffRoutes.reports, permission: "reports:read" },
    { label: "Notes", icon: "notes", href: staffRoutes.notes, permission: "notes:read" },
  ],
  therapist: [
    { label: "Dashboard", icon: "dashboard", href: therapistRoutes.dashboard },
    {
      label: "Today's Appointments",
      icon: "calendar",
      href: therapistRoutes.today,
      permission: "appointments:read",
    },
    {
      label: "Upcoming Appointments",
      icon: "calendar",
      href: therapistRoutes.upcoming,
      permission: "schedule:read",
    },
    {
      label: "Patients",
      icon: "patients",
      href: therapistRoutes.patients,
      permission: "patients:read",
    },
    { label: "Notes", icon: "notes", href: therapistRoutes.notes, permission: "notes:write" },
    { label: "Profile", icon: "settings", href: therapistRoutes.profile, permission: "profile:read" },
    { label: "Billing", icon: "billing", href: therapistRoutes.billing, permission: "billing:read" },
  ],
};

export const SIDEBAR_ROLE_PORTAL: Record<SidebarRoleKey, string> = {
  admin: "clinic",
  staff: "staff",
  therapist: "therapist",
};

export const SIDEBAR_BRAND_TITLE: Record<SidebarRoleKey, string> = {
  admin: "Clinic Admin",
  staff: "Staff",
  therapist: "Therapist",
};
