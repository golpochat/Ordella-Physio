import type { NavIconName } from "@/components/navigation/NavIcon";
import type { PortalRole } from "@/lib/rbac";

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
    allowedRoles: ["CLINIC_ADMIN"],
    profileHref: "/clinic/profile",
    settingsHref: "/clinic/profile",
    sections: [
      {
        title: "Main",
        items: [
          item("dashboard", "Overview", "/clinic"),
          item("users", "Therapists", "/clinic/therapists", ["admin"]),
          item("patients", "Patients", "/clinic/patients", ["admin"]),
          item("calendar", "Appointments", "/clinic/appointments", ["admin"]),
        ],
      },
      {
        title: "Management",
        items: [
          item("billing", "Billing", "/clinic/billing", ["admin"]),
          item("notes", "Notes", "/clinic/notes", ["admin"]),
          item("users", "Users", "/clinic/users", ["admin"]),
          item("users", "Staff", "/clinic/staff", ["admin"]),
          item("clinic", "Locations", "/clinic/locations", ["admin"]),
          item("clinic", "Terminals", "/clinic/terminals", ["admin"]),
          item("users", "Roles", "/clinic/roles", ["admin"]),
          item("reports", "Dashboard", "/clinic/dashboard", ["admin"]),
          item("reports", "Reports", "/clinic/reports", ["admin"]),
          item("calendar", "Appointments report", "/clinic/reports/appointments", ["admin"]),
          item("billing", "Revenue report", "/clinic/reports/revenue", ["admin"]),
          item("patients", "Patients report", "/clinic/reports/patients", ["admin"]),
          item("reports", "Saved reports", "/clinic/reports/saved", ["admin"]),
          item("logs", "Audit logs", "/clinic/audit-logs", ["admin"]),
          item("messages", "AI Copilot", "/copilot", ["admin"]),
          item("system", "Automation", "/clinic/automation/workflows", ["admin"]),
          item("logs", "Live monitor", "/clinic/automation/monitor", ["admin"]),
          item("reports", "AI Datasets", "/clinic/ai/datasets", ["admin"]),
          item("reports", "AI Training", "/clinic/ai/training", ["admin"]),
          item("reports", "Model registry", "/clinic/ai/models", ["admin"]),
          item("reports", "AI Agents", "/clinic/ai/agents", ["admin"]),
          item("logs", "AI Observability", "/clinic/ai/observability", ["admin"]),
          item("logs", "AI Security", "/clinic/ai/security/audit", ["admin"]),
        ],
      },
      {
        title: "Integrations",
        items: [
          item("messages", "Messages", "/clinic/messages"),
          item("notifications", "Notifications", "/clinic/notifications"),
          item("marketplace", "Marketplace", "/clinic/marketplace"),
          item("enterprise", "Enterprise", "/clinic/enterprise"),
          item("api", "API Keys", "/clinic/enterprise", ["admin"]),
          item("settings", "Settings", "/clinic/profile"),
        ],
      },
    ],
  },
  therapist: {
    id: "therapist",
    brandTitle: "Therapist",
    allowedRoles: ["THERAPIST"],
    profileHref: "/therapist/profile",
    settingsHref: "/therapist/profile",
    sections: [
      {
        title: "Main",
        items: [
          item("dashboard", "Home", "/therapist"),
          item("calendar", "Appointments", "/therapist/appointments", ["therapist"]),
          item("patients", "Patients", "/therapist/patients", ["therapist"]),
          item("notes", "Notes", "/therapist/notes", ["therapist"]),
        ],
      },
      {
        title: "Operations",
        items: [
          item("billing", "Billing", "/therapist/billing", ["therapist"]),
          item("reports", "Reports", "/therapist/reports", ["therapist"]),
          item("messages", "Messages", "/therapist/messages"),
          item("notifications", "Notifications", "/therapist/notifications"),
          item("settings", "Profile", "/therapist/profile"),
        ],
      },
    ],
  },
  staff: {
    id: "staff",
    brandTitle: "Staff",
    allowedRoles: ["STAFF"],
    profileHref: "/staff/profile",
    settingsHref: "/staff/profile",
    sections: [
      {
        title: "Main",
        items: [
          item("dashboard", "Overview", "/staff"),
          item("calendar", "Appointments", "/staff/appointments", ["staff"]),
          item("patients", "Patients", "/staff/patients", ["staff"]),
          item("notes", "Notes", "/staff/notes", ["staff"]),
        ],
      },
      {
        title: "Operations",
        items: [
          item("billing", "Billing", "/staff/billing", ["staff"]),
          item("reports", "Reports", "/staff/reports", ["staff"]),
          item("messages", "Messages", "/staff/messages"),
          item("notifications", "Notifications", "/staff/notifications"),
          item("settings", "Profile", "/staff/profile"),
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
        title: "Care",
        items: [
          item("dashboard", "Home", "/patient"),
          item("calendar", "Appointments", "/patient/appointments", ["patient"]),
          item("billing", "Billing", "/patient/billing", ["patient"]),
          item("notes", "Notes", "/patient/notes", ["patient"]),
        ],
      },
      {
        title: "Account",
        items: [
          item("messages", "Messages", "/patient/messages"),
          item("notifications", "Notifications", "/patient/notifications"),
          item("settings", "Profile", "/patient/profile"),
        ],
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
