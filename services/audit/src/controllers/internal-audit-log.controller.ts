import { Body, Controller, Post } from "@nestjs/common";
import type { CreateAuditLogPayload } from "@/models/AuditLog";
import { AuditLogService } from "@/services/audit-log.service";

type InternalCreateAuditLogBody = CreateAuditLogPayload & {
  ipAddress?: string;
  userAgent?: string;
};

@Controller("audit-logs/internal")
export class InternalAuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Post()
  create(@Body() payload: InternalCreateAuditLogBody) {
    const { ipAddress, userAgent, ...auditPayload } = payload;
    return this.auditLogService.createAuditLog(auditPayload, { ipAddress, userAgent });
  }
}
