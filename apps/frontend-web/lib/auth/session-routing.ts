import { isSystemRole, mapAuthRoleToPortalRole } from "@/lib/auth/roleRedirect";

import type { MiddlewareSession } from "./session-types";

const PUBLIC_ROUTE_PREFIXES = [
  "/login",
  "/auth",
  "/register",
  "/checkout",
  "/subscribe",
  "/start-trial",
  "/signup",
  "/forgot-password",
] as const;

export function resolveMiddlewarePortalHome(role: string, roles?: string[]): string {
  const resolved = roles?.length
    ? roles.map((entry) => mapAuthRoleToPortalRole(entry))
    : [mapAuthRoleToPortalRole(role)];

  if (resolved.includes("SYSTEM")) {
    return "/super-admin";
  }

  if (resolved.some((entry) => entry === "CLINIC_ADMIN" || entry === "ADMIN" || entry === "OWNER")) {
    return "/clinic";
  }

  if (resolved.includes("STAFF")) {
    return "/staff";
  }

  if (resolved.includes("THERAPIST")) {
    return "/therapist";
  }

  return "/login";
}

export function resolveAllowedPortalPrefix(role: string, roles?: string[]): string | null {
  const home = resolveMiddlewarePortalHome(role, roles);
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

export function canAccessGuardedPath(
  pathname: string,
  role: string,
  roles?: string[],
): boolean {
  const allowedPrefix = resolveAllowedPortalPrefix(role, roles);
  if (!allowedPrefix) {
    return false;
  }

  if (pathname.startsWith(allowedPrefix)) {
    return true;
  }

  const resolved = roles?.length
    ? roles.map((entry) => mapAuthRoleToPortalRole(entry))
    : [mapAuthRoleToPortalRole(role)];

  const isClinicOperator = resolved.some(
    (entry) => entry === "CLINIC_ADMIN" || entry === "ADMIN" || entry === "OWNER",
  );

  return isClinicOperator && pathname.startsWith("/organization");
}

export function sessionRequiresTenant(session: MiddlewareSession): boolean {
  const { role, roles } = session.user;
  if (isSystemRole(role)) {
    return false;
  }

  return !roles?.some((entry) => isSystemRole(entry));
}

export function hasValidTenant(session: MiddlewareSession): boolean {
  if (!sessionRequiresTenant(session)) {
    return true;
  }

  return Boolean(session.user.tenantId);
}
