export type AuditLogRecord = {
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

export type CreateAuditLogPayload = {
  tenantId?: string;
  actorUserId?: string;
  actorRole?: string;
  entityType?: string;
  entityId?: string;
  action?: string;
  metadata?: Record<string, unknown>;
};

export type AuditLogValidationFieldError = {
  field: string;
  message: string;
};

export type AuditLogSortField = "createdAt" | "action" | "entityType" | "entityId" | "actorUserId";

export type AuditLogSearchFilters = {
  keyword?: string;
  entityType?: string;
  entityTypes?: string[];
  entityId?: string;
  action?: string;
  actions?: string[];
  actorUserId?: string;
  actorUserIds?: string[];
  dateStart?: Date;
  dateEnd?: Date;
  sortBy?: AuditLogSortField;
  sortOrder?: "asc" | "desc";
};

export type ListAuditLogsQuery = AuditLogSearchFilters & {
  page: number;
  limit: number;
};

export type AuditLogListResult = {
  data: AuditLogRecord[];
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

export type AuditLogExportRow = {
  createdAt: string;
  actorUserId: string;
  entityType: string;
  entityId: string;
  action: string;
  metadata: string;
};

export type AuditLogExportResult = {
  columns: AuditLogExportColumn[];
  rows: AuditLogExportRow[];
};

export type LogActionInput = {
  tenantId: string;
  actorUserId: string;
  actorRole?: string;
  entityType: string;
  entityId: string;
  action: string;
  metadata?: Record<string, unknown>;
};
