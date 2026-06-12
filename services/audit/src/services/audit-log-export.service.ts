import { Injectable } from "@nestjs/common";
import type { AuditLogExportResult } from "@/models/AuditLog";
import { AuditLogRepository } from "@/repositories/audit-log.repository";
import { parseExportAuditLogsQuery } from "@/validators/audit-log.validator";
import { invalidDateRangeError, invalidFilterError } from "@/utils/audit-errors";
import { toAuditLogResponse, type AuthenticatedAuditUser } from "@/utils/audit-helpers";

const EXPORT_COLUMNS = [
  { key: "createdAt", label: "Timestamp" },
  { key: "actorUserId", label: "Actor" },
  { key: "entityType", label: "Entity Type" },
  { key: "entityId", label: "Entity ID" },
  { key: "action", label: "Action" },
  { key: "metadata", label: "Metadata" },
] as const;

@Injectable()
export class AuditLogExportService {
  constructor(private readonly auditLogRepository: AuditLogRepository) {}

  async exportAuditLogs(query: unknown, requestingUser: AuthenticatedAuditUser): Promise<AuditLogExportResult> {
    const parsed = parseExportAuditLogsQuery(query);
    if (!parsed.valid) {
      if (parsed.error === "INVALID_DATE_RANGE") {
        throw invalidDateRangeError();
      }
      throw invalidFilterError();
    }

    const rows = await this.auditLogRepository.findAllFiltered(
      requestingUser.tenantId,
      parsed.payload,
    );

    return {
      columns: [...EXPORT_COLUMNS],
      rows: rows.map((record) => {
        const normalized = toAuditLogResponse(record);
        return {
          createdAt: normalized.createdAt,
          actorUserId: normalized.actorUserId,
          entityType: normalized.entityType,
          entityId: normalized.entityId,
          action: normalized.action,
          metadata:
            normalized.metadata && Object.keys(normalized.metadata).length > 0
              ? JSON.stringify(normalized.metadata)
              : "",
        };
      }),
    };
  }
}
