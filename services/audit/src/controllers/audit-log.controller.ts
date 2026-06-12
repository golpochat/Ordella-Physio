import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import type { CreateAuditLogPayload } from "@/models/AuditLog";
import { AuditLogService } from "@/services/audit-log.service";
import { AuditLogExportService } from "@/services/audit-log-export.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { AuditViewGuard } from "@/guards/audit-view.guard";
import { AuditWriteGuard } from "@/guards/audit-write.guard";
import { AuditExportGuard } from "@/guards/audit-export.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedAuditUser } from "@/utils/audit-helpers";

@Controller("audit-logs")
export class AuditLogController {
  constructor(
    private readonly auditLogService: AuditLogService,
    private readonly auditLogExportService: AuditLogExportService,
  ) {}

  @Get("health")
  health() {
    return { status: "ok", service: "audit-service" };
  }

  @Get("export")
  @UseGuards(JwtGuard, AuditExportGuard)
  export(
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedAuditUser,
  ) {
    return this.auditLogExportService.exportAuditLogs(query, user);
  }

  @Get()
  @UseGuards(JwtGuard, AuditViewGuard)
  list(
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedAuditUser,
  ) {
    return this.auditLogService.listAuditLogs(query, user);
  }

  @Post()
  @UseGuards(JwtGuard, AuditWriteGuard)
  create(
    @Body() payload: CreateAuditLogPayload,
    @CurrentUser() user: AuthenticatedAuditUser,
    @Req() request: Request,
  ) {
    return this.auditLogService.createAuditLog(payload, {
      ipAddress: request.ip,
      userAgent: request.get("user-agent") ?? undefined,
      user,
    });
  }
}
