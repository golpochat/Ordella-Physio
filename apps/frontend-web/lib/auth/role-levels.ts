export const ROLE_LEVELS = {
  SYSTEM: 100,
  OWNER: 90,
  ADMIN: 80,
  THERAPIST: 60,
  PHARMACY: 50,
  STAFF: 40,
  PATIENT: 20,
} as const;

export type RoleLevelKey = keyof typeof ROLE_LEVELS;

export function getRoleLevel(role: string | undefined): number {
  if (!role) {
    return 0;
  }

  return ROLE_LEVELS[role as RoleLevelKey] ?? 0;
}

export function roleMeetsMinLevel(role: string | undefined, minRoleLevel: number): boolean {
  if (role === "SYSTEM") {
    return true;
  }

  return getRoleLevel(role) >= minRoleLevel;
}

export function userMeetsMinRoleLevel(
  user: { role?: string; roles?: string[] } | null | undefined,
  minRoleLevel: number,
): boolean {
  if (!user) {
    return false;
  }

  const roles = user.roles?.length ? user.roles : user.role ? [user.role] : [];
  return roles.some((role) => roleMeetsMinLevel(role, minRoleLevel));
}
