import type { NavIconName } from "@/components/navigation/NavIcon";
import type { PortalRole } from "@/lib/rbac";
import { adminRoutes, staffRoutes, therapistRoutes } from "@/lib/routes";

export type PortalId =
  | "super-admin"
  | "clinic"
  | "therapist"
  | "staff"
  | "pharmacy"
  | "patient"
  | "legacy";

export type NavItemConfig = {
  icon: NavIconName;
  label: string;
  href: string;
  roles?: string[];
};

export type NavSectionConfig = {
  title: string;
  items: NavItemConfig[];
};

export type PortalNavConfig = {
  id: PortalId;
  brandTitle: string;
  allowedRoles: PortalRole[];
  profileHref: string;
  settingsHref: string;
  sections: NavSectionConfig[];
};

function item(
  icon: NavIconName,
  label: string,
  href: string,
  roles?: string[],
): NavItemConfig {
  return { icon, label, href, roles };
}

export const PORTAL_NAV_CONFIG: Record<Exclude<PortalId, "legacy">, PortalNavConfig> = {
  "super-admin": {
    id: "super-admin",
    brandTitle: "Super Admin",
    allowedRoles: ["SYSTEM"],
    profileHref: "/super-admin/settings",
    settingsHref: "/super-admin/settings",
    sections: [
      {
        title: "Main",
        items: [
          item("dashboard", "Overview", "/super-admin"),
          item("users", "Users", "/super-admin/users", ["superadmin", "system"]),
          item("clinic", "Tenants", "/super-admin/tenants", ["superadmin", "system"]),
          item("clinic", "Organizations", "/super-admin/organizations", ["superadmin", "system"]),
          item("users", "Roles", "/super-admin/roles", ["superadmin", "system"]),
        ],
      },
      {
        title: "Platform",
        items: [
          item("billing", "Billing", "/super-admin/billing"),
          item("reports", "Reports", "/super-admin/reports"),
          item("marketplace", "Marketplace", "/super-admin/marketplace"),
          item("enterprise", "Enterprise", "/super-admin/enterprise"),
          item("messages", "Messages", "/super-admin/messages"),
          item("notifications", "Notifications", "/super-admin/notifications"),
        ],
      },
      {
        title: "System",
        items: [
          item("system", "System health", "/super-admin/system"),
          item("flags", "Feature flags", "/super-admin/flags"),
          item("settings", "Settings", "/super-admin/settings"),
          item("logs", "Audit logs", "/super-admin/audit-logs", ["superadmin", "system"]),
        ],
      },
    ],
  },
  clinic: {
    id: "clinic",
    brandTitle: "Clinic Admin",
    allowedRoles: ["CLINIC_ADMIN", "ADMIN", "OWNER"],
    profileHref: adminRoutes.profile,
    settingsHref: adminRoutes.settings,
    sections: [
      {
        title: "Main",
        items: [
          item("dashboard", "Overview", adminRoutes.overview, ["admin"]),
          item("patients", "Patients", adminRoutes.patients, ["admin"]),
          item("calendar", "Appointments", adminRoutes.appointments, ["admin"]),
          item("users", "Therapists", adminRoutes.therapists, ["admin"]),
          item("users", "Staff", adminRoutes.staff, ["admin"]),
        ],
      },
      {
        title: "Operations",
        items: [
          item("billing", "Billing", adminRoutes.billing, ["admin"]),
          item("notes", "Notes", adminRoutes.notes, ["admin"]),
          item("users", "Users", adminRoutes.users, ["admin"]),
          item("users", "Roles", adminRoutes.roles, ["admin"]),
          item("clinic", "Locations", adminRoutes.locations, ["admin"]),
          item("clinic", "Terminals", adminRoutes.terminals, ["admin"]),
          item("reports", "Reports", adminRoutes.reports, ["admin"]),
          item("logs", "Audit logs", adminRoutes.auditLogs, ["admin"]),
          item("settings", "Settings", adminRoutes.settings, ["admin"]),
        ],
      },
    ],
  },
  therapist: {
    id: "therapist",
    brandTitle: "Therapist",
    allowedRoles: ["THERAPIST"],
    profileHref: therapistRoutes.profile,
    settingsHref: therapistRoutes.profile,
    sections: [
      {
        title: "Main",
        items: [
          item("dashboard", "Dashboard", therapistRoutes.dashboard, ["therapist"]),
          item("calendar", "Today's Appointments", therapistRoutes.today, ["therapist"]),
          item("calendar", "Upcoming Appointments", therapistRoutes.upcoming, ["therapist"]),
          item("patients", "Patients", therapistRoutes.patients, ["therapist"]),
          item("notes", "Notes", therapistRoutes.notes, ["therapist"]),
          item("billing", "Billing", therapistRoutes.billing, ["therapist"]),
          item("settings", "Profile", therapistRoutes.profile, ["therapist"]),
        ],
      },
    ],
  },
  staff: {
    id: "staff",
    brandTitle: "Staff",
    allowedRoles: ["STAFF"],
    profileHref: staffRoutes.profile,
    settingsHref: staffRoutes.profile,
    sections: [
      {
        title: "Main",
        items: [
          item("dashboard", "Overview", staffRoutes.overview, ["staff"]),
          item("calendar", "Appointments", staffRoutes.appointments, ["staff"]),
          item("patients", "Patients", staffRoutes.patients, ["staff"]),
          item("billing", "Billing", staffRoutes.billing, ["staff"]),
          item("reports", "Reports", staffRoutes.reports, ["staff"]),
          item("notes", "Notes", staffRoutes.notes, ["staff"]),
        ],
      },
    ],
  },
  pharmacy: {
    id: "pharmacy",
    brandTitle: "Pharmacy",
    allowedRoles: ["PHARMACY"],
    profileHref: "/pharmacy/profile",
    settingsHref: "/pharmacy/profile",
    sections: [
      {
        title: "Main",
        items: [
          item("dashboard", "Overview", "/pharmacy"),
          item("inventory", "Prescriptions", "/pharmacy/prescriptions", ["pharmacy"]),
          item("inventory", "Fulfillment", "/pharmacy/fulfillment", ["pharmacy"]),
          item("patients", "Patients", "/pharmacy/patients", ["pharmacy"]),
        ],
      },
      {
        title: "Operations",
        items: [
          item("billing", "Billing", "/pharmacy/billing", ["pharmacy"]),
          item("reports", "Reports", "/pharmacy/reports", ["pharmacy"]),
          item("messages", "Messages", "/pharmacy/messages"),
          item("notifications", "Notifications", "/pharmacy/notifications"),
          item("settings", "Profile", "/pharmacy/profile"),
        ],
      },
    ],
  },
  patient: {
    id: "patient",
    brandTitle: "Patient",
    allowedRoles: ["PATIENT"],
    profileHref: "/patient/profile",
    settingsHref: "/patient/profile",
    sections: [
      {
        title: "Profile",
        items: [item("settings", "Profile viewer", "/patient/profile", ["patient"])],
      },
    ],
  },
};

const EMPTY_LEGACY_CONFIG: PortalNavConfig = {
  id: "legacy",
  brandTitle: "Ordella",
  allowedRoles: [],
  profileHref: "/settings/profile",
  settingsHref: "/settings",
  sections: [],
};

export function getPortalNavConfig(portalId: PortalId): PortalNavConfig {
  return PORTAL_NAV_CONFIG[portalId as Exclude<PortalId, "legacy">] ?? EMPTY_LEGACY_CONFIG;
}

export function createNavConfigFromLinks(
  brandTitle: string,
  links: { href: string; label: string }[],
  options?: Partial<Pick<PortalNavConfig, "allowedRoles" | "profileHref" | "settingsHref">>,
): PortalNavConfig {
  return {
    id: "legacy",
    brandTitle,
    allowedRoles: options?.allowedRoles ?? [],
    profileHref: options?.profileHref ?? "/settings/profile",
    settingsHref: options?.settingsHref ?? "/settings",
    sections: [
      {
        title: "Main",
        items: links.map((link) => item("dashboard", link.label, link.href)),
      },
    ],
  };
}

export function getPortalPageMeta(
  portalId: PortalId,
  pathname: string,
  configOverride?: PortalNavConfig,
): { title: string; subtitle: string } {
  const config = configOverride ?? getPortalNavConfig(portalId);

  for (const section of config.sections) {
    for (const navItem of section.items) {
      const isRoot = navItem.href.split("/").filter(Boolean).length <= 1;
      const active = isRoot
        ? pathname === navItem.href
        : pathname === navItem.href || pathname.startsWith(`${navItem.href}/`);

      if (active) {
        return {
          title: navItem.label,
          subtitle: `${config.brandTitle} · ${section.title}`,
        };
      }
    }
  }

  return {
    title: config.brandTitle,
    subtitle: "Dashboard",
  };
}

export function resolvePortalIdFromPath(pathname: string): PortalId | null {
  if (pathname.startsWith("/super-admin")) return "super-admin";
  if (pathname.startsWith("/clinic")) return "clinic";
  if (pathname.startsWith("/therapist")) return "therapist";
  if (pathname.startsWith("/staff")) return "staff";
  if (pathname.startsWith("/pharmacy")) return "pharmacy";
  if (pathname.startsWith("/patient")) return "patient";
  return null;
}
