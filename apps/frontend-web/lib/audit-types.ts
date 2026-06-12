export const AUDIT_ENTITY_TYPES = [
  "PATIENT",
  "APPOINTMENT",
  "INVOICE",
  "REPORT",
  "NOTE",
  "USER",
  "LOCATION",
  "STAFF",
] as const;

export const AUDIT_ACTIONS = [
  "CREATE",
  "UPDATE",
  "DELETE",
  "STATUS_CHANGE",
  "LOGIN",
  "EXPORT",
  "PAY",
  "VIEW",
] as const;

export type AuditEntityType = (typeof AUDIT_ENTITY_TYPES)[number];
export type AuditAction = (typeof AUDIT_ACTIONS)[number];
export type AuditLogSortField = "createdAt" | "action" | "entityType" | "entityId" | "actorUserId";

export type DomainAuditLogRecord = {
  id: string;
  tenantId: string;
  actorUserId: string;
  actorRole: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  entityType: string;
  entityId: string;
  action: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
};

export type AuditLogListFilters = {
  page?: number;
  limit?: number;
  keyword?: string;
  entityType?: string;
  entityId?: string;
  entityTypes?: string[];
  actions?: string[];
  actorUserIds?: string[];
  dateStart?: string;
  dateEnd?: string;
  sortBy?: AuditLogSortField;
  sortOrder?: "asc" | "desc";
};

export type AuditLogListResponse = {
  data: DomainAuditLogRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type AuditLogExportColumn = {
  key: string;
  label: string;
};

export type AuditLogExportResponse = {
  columns: AuditLogExportColumn[];
  rows: Array<Record<string, string>>;
};
