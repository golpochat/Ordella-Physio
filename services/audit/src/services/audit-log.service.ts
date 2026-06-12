import { Injectable } from "@nestjs/common";
import { PERMISSIONS } from "@ordella/security";
import type { CreateAuditLogPayload, LogActionInput } from "@/models/AuditLog";
import { AuditLogRepository } from "@/repositories/audit-log.repository";
import {
  parseListAuditLogsQuery,
  validateCreateAuditLog,
} from "@/validators/audit-log.validator";
import {
  auditTenantMismatchError,
  auditValidationError,
  invalidDateRangeError,
  invalidFilterError,
  invalidPaginationError,
} from "@/utils/audit-errors";
import {
  toAuditLogResponse,
  type AuthenticatedAuditUser,
  type CreateAuditLogContext,
} from "@/utils/audit-helpers";

@Injectable()
export class AuditLogService {
  constructor(private readonly auditLogRepository: AuditLogRepository) {}

  async logAction(input: LogActionInput, context: CreateAuditLogContext = {}) {
    return this.createAuditLog(
      {
        tenantId: input.tenantId,
        actorUserId: input.actorUserId,
        actorRole: input.actorRole,
        entityType: input.entityType,
        entityId: input.entityId,
        action: input.action,
        metadata: input.metadata,
      },
      context,
    );
  }

  async createAuditLog(payload: CreateAuditLogPayload, context: CreateAuditLogContext = {}) {
    const validation = validateCreateAuditLog(payload);
    if (!validation.valid) {
      throw auditValidationError(validation.fields);
    }

    const normalized = validation.payload;
    const tenantId = normalized.tenantId || context.user?.tenantId;

    if (!tenantId) {
      throw auditValidationError([{ field: "tenantId", message: "tenantId is required." }]);
    }

    if (context.user) {
      this.assertWriteTenantAccess(context.user, tenantId);
    }

    const record = await this.auditLogRepository.create({
      tenantId,
      actorUserId: normalized.actorUserId,
      actorRole: normalized.actorRole ?? context.user?.role,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
      entityType: normalized.entityType,
      entityId: normalized.entityId,
      action: normalized.action,
      metadata: normalized.metadata,
    });

    return toAuditLogResponse(record);
  }

  async listAuditLogs(query: unknown, requestingUser: AuthenticatedAuditUser) {
    const parsed = parseListAuditLogsQuery(query);
    if (!parsed.valid) {
      if (parsed.error === "INVALID_PAGINATION") {
        throw invalidPaginationError();
      }
      if (parsed.error === "INVALID_DATE_RANGE") {
        throw invalidDateRangeError();
      }
      throw invalidFilterError();
    }

    const filters = parsed.payload;
    const tenantId = requestingUser.tenantId;

    const [rows, total] = await Promise.all([
      this.auditLogRepository.findManyFiltered(tenantId, filters),
      this.auditLogRepository.countFiltered(tenantId, filters),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / filters.limit);

    return {
      data: rows.map(toAuditLogResponse),
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        totalPages,
      },
    };
  }

  private assertWriteTenantAccess(user: AuthenticatedAuditUser, tenantId: string): void {
    if (user.role === "SYSTEM") {
      return;
    }

    if (user.permissions?.includes(PERMISSIONS.AUDIT_WRITE_INTERNAL)) {
      return;
    }

    if (user.tenantId !== tenantId) {
      throw auditTenantMismatchError();
    }
  }
}
