/**
 * Portal route architecture — each namespace is isolated by role.
 *
 * - /clinic    → Admin portal (CLINIC_ADMIN, ADMIN, OWNER)
 * - /staff     → Staff portal (STAFF)
 * - /therapist → Clinician portal (THERAPIST)
 *
 * No cross-role routes: users may only navigate within their namespace.
 */

export type PortalRouteRole = "admin" | "staff" | "therapist";

/** Top-level portal namespaces. */
export const PORTAL_NAMESPACE: Record<PortalRouteRole, string> = {
  admin: "/clinic",
  staff: "/staff",
  therapist: "/therapist",
};

/**
 * Canonical allowlisted paths per portal (dynamic segments use [param] notation).
 */
export const routes: Record<PortalRouteRole, readonly string[]> = {
  admin: [
    "/clinic",
    "/clinic/overview",
    "/clinic/patients",
    "/clinic/patients/[id]",
    "/clinic/appointments",
    "/clinic/appointments/[id]",
    "/clinic/therapists",
    "/clinic/therapists/[id]",
    "/clinic/staff",
    "/clinic/staff/[id]",
    "/clinic/billing",
    "/clinic/billing/invoices",
    "/clinic/billing/payments",
    "/clinic/notes",
    "/clinic/notes/[id]",
    "/clinic/users",
    "/clinic/users/[id]",
    "/clinic/roles",
    "/clinic/roles/[id]",
    "/clinic/locations",
    "/clinic/locations/[id]",
    "/clinic/terminals",
    "/clinic/terminals/[id]",
    "/clinic/reports",
    "/clinic/reports/appointments",
    "/clinic/reports/revenue",
    "/clinic/reports/patients",
    "/clinic/audit-logs",
    "/clinic/settings",
    "/clinic/profile",
    "/clinic/messages",
    "/clinic/notifications",
    "/clinic/search",
    "/clinic/marketplace",
    "/clinic/enterprise",
    "/clinic/ai",
    "/clinic/pharmacy",
    "/clinic/pharmacy/new",
    "/clinic/pharmacy/[id]",
    "/clinic/pharmacy/[id]/fulfillment",
  ],
  staff: [
    "/staff",
    "/staff/overview",
    "/staff/patients",
    "/staff/patients/[id]",
    "/staff/appointments",
    "/staff/appointments/[id]",
    "/staff/billing",
    "/staff/billing/invoices",
    "/staff/billing/payments",
    "/staff/billing/[invoiceId]",
    "/staff/reports",
    "/staff/reports/appointments",
    "/staff/reports/patients",
    "/staff/notes",
    "/staff/notes/[id]",
    "/staff/profile",
    "/staff/messages",
    "/staff/notifications",
  ],
  therapist: [
    "/therapist",
    "/therapist/dashboard",
    "/therapist/today",
    "/therapist/upcoming",
    "/therapist/appointments",
    "/therapist/appointments/[id]",
    "/therapist/schedule",
    "/therapist/patients",
    "/therapist/patients/[id]",
    "/therapist/notes",
    "/therapist/notes/[appointmentId]",
    "/therapist/notes/create",
    "/therapist/profile",
    "/therapist/billing",
    "/therapist/billing/[invoiceId]",
    "/therapist/messages",
    "/therapist/notifications",
  ],
};

/** Role keys accepted by `getRoutesForRole`. */
const ROLE_TO_PORTAL: Record<string, PortalRouteRole> = {
  admin: "admin",
  ADMIN: "admin",
  CLINIC_ADMIN: "admin",
  OWNER: "admin",
  staff: "staff",
  STAFF: "staff",
  therapist: "therapist",
  THERAPIST: "therapist",
};

export function normalizePortalRouteRole(role: string | undefined): PortalRouteRole | null {
  if (!role) {
    return null;
  }

  return ROLE_TO_PORTAL[role] ?? ROLE_TO_PORTAL[role.toUpperCase()] ?? null;
}

/** Returns the flat allowlist for a portal role. */
export function getRoutesForRole(role: string): readonly string[] {
  const key = normalizePortalRouteRole(role);
  return key ? routes[key] : [];
}

/** Returns the portal namespace root for a role (e.g. `/clinic`). */
export function getPortalNamespaceForRole(role: string): string | null {
  const key = normalizePortalRouteRole(role);
  return key ? PORTAL_NAMESPACE[key] : null;
}

/** Resolves which portal namespace a pathname belongs to, if any. */
export function getPortalNamespaceFromPath(pathname: string): PortalRouteRole | null {
  for (const [portal, prefix] of Object.entries(PORTAL_NAMESPACE) as [PortalRouteRole, string][]) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return portal;
    }
  }

  return null;
}

function patternToRegExp(pattern: string): RegExp {
  const escaped = pattern
    .split("/")
    .map((segment) => {
      if (segment.startsWith("[") && segment.endsWith("]")) {
        return "[^/]+";
      }
      return segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("/");

  return new RegExp(`^${escaped}$`);
}

/** True when pathname matches an allowlisted route pattern for the portal. */
export function isPathAllowlistedForPortal(pathname: string, portal: PortalRouteRole): boolean {
  if (routes[portal].some((pattern) => patternToRegExp(pattern).test(pathname))) {
    return true;
  }

  // Allow action sub-routes under static allowlisted paths (e.g. /clinic/patients/new).
  return routes[portal].some((pattern) => {
    if (pattern.includes("[")) {
      return false;
    }

    return pathname.startsWith(`${pattern}/`);
  });
}

/**
 * RBAC: user may access pathname only within their portal namespace and allowlist.
 * Returns true for non-portal paths (login, public, super-admin) — handled elsewhere.
 */
export function canAccessPortalNamespace(pathname: string, userRoles: string[]): boolean {
  const pathPortal = getPortalNamespaceFromPath(pathname);
  if (!pathPortal) {
    return true;
  }

  const userPortal = userRoles
    .map(normalizePortalRouteRole)
    .find((portal): portal is PortalRouteRole => portal !== null);

  if (!userPortal) {
    return false;
  }

  if (userPortal !== pathPortal) {
    return false;
  }

  return isPathAllowlistedForPortal(pathname, userPortal);
}

/** Typed route builders for navigation (prefer these over string literals). */
export const adminRoutes = {
  root: "/clinic",
  overview: "/clinic/overview",
  patients: "/clinic/patients",
  patient: (id: string) => `/clinic/patients/${id}`,
  appointments: "/clinic/appointments",
  appointment: (id: string) => `/clinic/appointments/${id}`,
  therapists: "/clinic/therapists",
  therapist: (id: string) => `/clinic/therapists/${id}`,
  staff: "/clinic/staff",
  staffMember: (id: string) => `/clinic/staff/${id}`,
  billing: "/clinic/billing",
  billingInvoices: "/clinic/billing/invoices",
  billingPayments: "/clinic/billing/payments",
  notes: "/clinic/notes",
  note: (id: string) => `/clinic/notes/${id}`,
  users: "/clinic/users",
  user: (id: string) => `/clinic/users/${id}`,
  roles: "/clinic/roles",
  role: (id: string) => `/clinic/roles/${id}`,
  locations: "/clinic/locations",
  location: (id: string) => `/clinic/locations/${id}`,
  terminals: "/clinic/terminals",
  terminal: (id: string) => `/clinic/terminals/${id}`,
  reports: "/clinic/reports",
  reportsAppointments: "/clinic/reports/appointments",
  reportsRevenue: "/clinic/reports/revenue",
  reportsPatients: "/clinic/reports/patients",
  auditLogs: "/clinic/audit-logs",
  settings: "/clinic/settings",
  profile: "/clinic/profile",
  messages: "/clinic/messages",
  notifications: "/clinic/notifications",
  search: "/clinic/search",
  marketplace: "/clinic/marketplace",
  enterprise: "/clinic/enterprise",
  ai: "/clinic/ai/models",
  pharmacy: "/clinic/pharmacy",
  pharmacyNew: "/clinic/pharmacy/new",
  pharmacyPrescription: (id: string) => `/clinic/pharmacy/${id}`,
  pharmacyFulfillment: (id: string) => `/clinic/pharmacy/${id}/fulfillment`,
} as const;

export const staffRoutes = {
  root: "/staff",
  overview: "/staff/overview",
  patients: "/staff/patients",
  patient: (id: string) => `/staff/patients/${id}`,
  appointments: "/staff/appointments",
  appointment: (id: string) => `/staff/appointments/${id}`,
  billing: "/staff/billing",
  billingInvoices: "/staff/billing/invoices",
  billingPayments: "/staff/billing/payments",
  invoice: (id: string) => `/staff/billing/${id}`,
  reports: "/staff/reports",
  reportsAppointments: "/staff/reports/appointments",
  reportsPatients: "/staff/reports/patients",
  notes: "/staff/notes",
  note: (id: string) => `/staff/notes/${id}`,
  profile: "/staff/profile",
  messages: "/staff/messages",
  notifications: "/staff/notifications",
} as const;

export const therapistRoutes = {
  root: "/therapist",
  dashboard: "/therapist/dashboard",
  today: "/therapist/today",
  upcoming: "/therapist/upcoming",
  appointments: "/therapist/appointments",
  appointment: (id: string) => `/therapist/appointments/${id}`,
  schedule: "/therapist/schedule",
  patients: "/therapist/patients",
  patient: (id: string) => `/therapist/patients/${id}`,
  notes: "/therapist/notes",
  note: (appointmentId: string) => `/therapist/notes/${appointmentId}`,
  noteCreate: "/therapist/notes/create",
  profile: "/therapist/profile",
  billing: "/therapist/billing",
  invoice: (id: string) => `/therapist/billing/${id}`,
  messages: "/therapist/messages",
  notifications: "/therapist/notifications",
} as const;
