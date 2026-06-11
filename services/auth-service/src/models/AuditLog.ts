export const AUDIT_ACTIONS = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",
  MFA_SUCCESS: "MFA_SUCCESS",
  MFA_FAILED: "MFA_FAILED",
  PASSWORD_RESET_REQUEST: "PASSWORD_RESET_REQUEST",
  PASSWORD_RESET_SUCCESS: "PASSWORD_RESET_SUCCESS",
  EMAIL_VERIFIED: "EMAIL_VERIFIED",
  TOKEN_REFRESH: "TOKEN_REFRESH",
  TOKEN_REUSE_DETECTED: "TOKEN_REUSE_DETECTED",
  LOGOUT: "LOGOUT",
} as const;

export type AuditAction = (typeof AUDIT_ACTIONS)[keyof typeof AUDIT_ACTIONS];

export type AuditLogRecord = {
  id: string;
  userId: string | null;
  tenantId: string | null;
  action: string;
  ipAddress: string | null;
  userAgent: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
  userEmail?: string | null;
};

export type AuditLogEventInput = {
  userId?: string | null;
  tenantId?: string | null;
  action: AuditAction | string;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: Record<string, unknown> | null;
};

export type AuditLogListFilters = {
  userId?: string;
  tenantId?: string;
  action?: string;
  from?: Date;
  to?: Date;
  search?: string;
  page?: number;
  limit?: number;
};

export type AuditLogListResult = {
  data: AuditLogRecord[];
  total: number;
  page: number;
  limit: number;
};
