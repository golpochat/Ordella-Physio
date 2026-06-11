import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { UseZodValidation } from "@ordella/validation";
import { ROLE_LEVELS } from "@ordella/security";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { RequireMinRoleLevel, RoleEnforcementGuard } from "@/auth/guards/role-enforcement.guard";
import { auditLogsQuerySchema, type AuditLogsQueryDto } from "@/auth/dto/audit-logs-query.dto";
import { AuditService } from "@/services/audit.service";

@Controller("auth")
@UseGuards(JwtGuard, RoleEnforcementGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get("audit-logs")
  @RequireMinRoleLevel(ROLE_LEVELS.SYSTEM)
  @UseZodValidation(auditLogsQuerySchema, "query")
  getAuditLogs(@Query() query: AuditLogsQueryDto) {
    return this.auditService.list({
      userId: query.userId,
      tenantId: query.tenantId,
      action: query.action,
      from: query.from ? new Date(query.from) : undefined,
      to: query.to ? new Date(query.to) : undefined,
      search: query.search,
      page: query.page,
      limit: query.limit,
    });
  }
}
