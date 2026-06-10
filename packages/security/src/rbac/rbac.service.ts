import { PERMISSIONS, type Permission } from "./permissions";
import { ROLES, type SecurityRole } from "./roles";

export type SecurityUser = {
  userId: string;
  tenantId: string;
  role: SecurityRole;
  email?: string;
};

const ROLE_PERMISSIONS: Record<SecurityRole, Permission[]> = {
  SYSTEM: Object.values(PERMISSIONS),
  OWNER: Object.values(PERMISSIONS),
  ADMIN: [
    PERMISSIONS.PATIENT_READ,
    PERMISSIONS.PATIENT_WRITE,
    PERMISSIONS.APPOINTMENT_READ,
    PERMISSIONS.APPOINTMENT_WRITE,
    PERMISSIONS.NOTES_READ,
    PERMISSIONS.NOTES_WRITE,
    PERMISSIONS.BILLING_READ,
    PERMISSIONS.BILLING_WRITE,
    PERMISSIONS.PAYMENTS_READ,
    PERMISSIONS.PAYMENTS_WRITE,
    PERMISSIONS.COMMUNICATION_SEND,
    PERMISSIONS.REPORTING_READ,
    PERMISSIONS.TENANT_MANAGE,
  ],
  THERAPIST: [
    PERMISSIONS.PATIENT_READ,
    PERMISSIONS.PATIENT_WRITE,
    PERMISSIONS.APPOINTMENT_READ,
    PERMISSIONS.APPOINTMENT_WRITE,
    PERMISSIONS.NOTES_READ,
    PERMISSIONS.NOTES_WRITE,
    PERMISSIONS.REPORTING_READ,
  ],
  STAFF: [
    PERMISSIONS.PATIENT_READ,
    PERMISSIONS.APPOINTMENT_READ,
    PERMISSIONS.APPOINTMENT_WRITE,
    PERMISSIONS.NOTES_READ,
    PERMISSIONS.BILLING_READ,
    PERMISSIONS.COMMUNICATION_SEND,
  ],
};

export class RbacService {
  hasRole(user: SecurityUser, role: SecurityRole): boolean {
    return user.role === role;
  }

  hasPermission(user: SecurityUser, permission: Permission): boolean {
    return getPermissionsForRole(user.role).includes(permission);
  }

  enforceTenantIsolation(user: SecurityUser, tenantId: string): boolean {
    return user.tenantId === tenantId;
  }

  assertPermission(user: SecurityUser, permission: Permission): void {
    if (!this.hasPermission(user, permission)) {
      throw new Error(`Missing permission: ${permission}`);
    }
  }

  assertTenantAccess(user: SecurityUser, tenantId: string): void {
    if (!this.enforceTenantIsolation(user, tenantId)) {
      throw new Error("Cross-tenant access is not allowed");
    }
  }
}

export function getPermissionsForRole(role: SecurityRole): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export const rbacService = new RbacService();
