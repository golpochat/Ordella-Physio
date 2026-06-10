import type { UserRole } from "../enums";

export type TenantId = string;
export type UserId = string;
export type PatientId = string;
export type AppointmentId = string;

/** @deprecated Prefer UserRole enum */
export type Role =
  | "super_admin"
  | "clinic_admin"
  | "physiotherapist"
  | "receptionist"
  | "billing";

export interface TenantContext {
  tenantId: TenantId;
  userId: UserId;
  roles: Role[];
}

export interface ApiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface User {
  id: string;
  tenantId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokenPayload {
  userId: string;
  tenantId: string;
  role: UserRole;
  exp: number;
  iat: number;
}
