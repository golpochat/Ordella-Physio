import {
  isOrganizationUser,
  isSystemRole,
  isSystemUser,
  mapAuthRoleToPortalRole,
} from "@/lib/auth/roleRedirect";
import { canAccessNavHrefByPermission, type PermissionSubject } from "@/lib/platform-rbac";

import type { MiddlewareSession } from "./session-types";

const PUBLIC_ROUTE_PREFIXES = [
  "/login",
  "/auth",
  "/register",
  "/checkout",
  "/checkout/success",
  "/subscribe",
  "/start-trial",
  "/signup",
  "/forgot-password",
  "/access-denied",
] as const;

export function resolveMiddlewarePortalHome(
  role: string,
  roles?: string[],
  effectiveRole?: string,
): string {
  const resolved = roles?.length
    ? roles.map((entry) => mapAuthRoleToPortalRole(entry))
    : [mapAuthRoleToPortalRole(role)];

  if (isSystemUser(resolved) || isSystemRole(role) || isSystemRole(effectiveRole)) {
    return "/super-admin";
  }

  if (isOrganizationUser(resolved) || role === "ORG_ADMIN" || role === "ORG_BILLING_ADMIN") {
    return "/organization";
  }

  if (resolved.some((entry) => entry === "CLINIC_ADMIN" || entry === "ADMIN" || entry === "OWNER")) {
    return "/clinic";
  }

  if (resolved.includes("STAFF") || resolved.includes("BILLING_ADMIN") || resolved.includes("READ_ONLY")) {
    return "/staff";
  }

  if (resolved.includes("THERAPIST")) {
    return "/therapist";
  }

  if (resolved.includes("PHARMACY")) {
    return "/pharmacy";
  }

  if (resolved.includes("PATIENT")) {
    return "/patient";
  }

  return "/login";
}

export function resolveAllowedPortalPrefix(
  role: string,
  roles?: string[],
  effectiveRole?: string,
): string | null {
  const home = resolveMiddlewarePortalHome(role, roles, effectiveRole);
  return home === "/login" ? null : home;
}

export function isPublicMiddlewarePath(pathname: string): boolean {
  if (pathname === "/") {
    return true;
  }

  return PUBLIC_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isGuardedPortalPath(pathname: string): boolean {
  const guardedPrefixes = [
    "/clinic",
    "/organization",
    "/staff",
    "/therapist",
    "/super-admin",
    "/patient",
    "/pharmacy",
    "/user",
    "/admin",
    "/settings",
    "/billing",
  ];

  return guardedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function toPermissionSubject(session: MiddlewareSession): PermissionSubject {
  const { user } = session;
  return {
    role: user.role,
    effectiveRole: user.effectiveRole,
    permissions: user.resolvedPermissions ?? user.permissions ?? [],
    organizationId: user.organizationId,
  };
}

export function canAccessGuardedPath(
  pathname: string,
  role: string,
  roles?: string[],
  session?: MiddlewareSession | null,
): boolean {
  const allowedPrefix = resolveAllowedPortalPrefix(
    role,
    roles,
    session?.user.effectiveRole,
  );
  if (!allowedPrefix) {
    return false;
  }

  if (pathname.startsWith(allowedPrefix)) {
    if (session && !canAccessNavHrefByPermission(pathname, toPermissionSubject(session))) {
      return false;
    }
    return true;
  }

  const resolved = roles?.length
    ? roles.map((entry) => mapAuthRoleToPortalRole(entry))
    : [mapAuthRoleToPortalRole(role)];

  const isClinicOperator = resolved.some(
    (entry) => entry === "CLINIC_ADMIN" || entry === "ADMIN" || entry === "OWNER",
  );

  if (isClinicOperator && pathname.startsWith("/organization")) {
    return session
      ? canAccessNavHrefByPermission(pathname, toPermissionSubject(session))
      : true;
  }

  if (isClinicOperator && pathname.startsWith("/settings")) {
    return session
      ? canAccessNavHrefByPermission(pathname, toPermissionSubject(session))
      : true;
  }

  return false;
}

export function sessionRequiresTenant(session: MiddlewareSession): boolean {
  const { role, roles, effectiveRole } = session.user;
  if (isSystemRole(role) || isSystemRole(effectiveRole)) {
    return false;
  }

  if (roles?.some((entry) => isSystemRole(entry))) {
    return false;
  }

  const resolved = roles?.map(mapAuthRoleToPortalRole) ?? [mapAuthRoleToPortalRole(role)];
  if (isOrganizationUser(resolved)) {
    return false;
  }

  return true;
}

export function hasValidTenant(session: MiddlewareSession): boolean {
  if (!sessionRequiresTenant(session)) {
    return true;
  }

  return Boolean(session.user.tenantId);
}
