import type { SecurityRole } from "@ordella/security";

export const USER_ROLES = [
  "SYSTEM",
  "OWNER",
  "ADMIN",
  "THERAPIST",
  "STAFF",
  "PATIENT",
] as const satisfies readonly SecurityRole[];

export type UserRole = (typeof USER_ROLES)[number];

export type UserStatus = "ACTIVE" | "DISABLED";

export type UserRecord = {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  password: string;
};

export type AdminResetPasswordPayload = {
  password: string;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ChangeRolePayload = {
  role: UserRole;
};

export type SelfUpdatePayload = {
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  avatarUrl?: string | null;
};

export const RESTRICTED_SELF_UPDATE_FIELDS = [
  "email",
  "role",
  "status",
  "tenantId",
  "password",
  "passwordHash",
  "isActive",
  "id",
] as const;

export type UpdateUserPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string | null;
  role?: UserRole;
  status?: UserStatus;
};

export const USER_STATUSES = ["ACTIVE", "DISABLED"] as const;

export type UserValidationFieldError = {
  field: string;
  message: string;
};

export type SanitizedUser = {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};

export function toUserStatus(isActive: boolean): UserStatus {
  return isActive ? "ACTIVE" : "DISABLED";
}

export function sanitizeManagedUser(user: {
  id: string;
  tenantId: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string | null;
  avatarUrl?: string | null;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}): SanitizedUser {
  return {
    id: user.id,
    tenantId: user.tenantId,
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    email: user.email,
    phone: user.phone ?? undefined,
    avatarUrl: user.avatarUrl ?? undefined,
    role: user.role as UserRole,
    status: toUserStatus(user.isActive),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
