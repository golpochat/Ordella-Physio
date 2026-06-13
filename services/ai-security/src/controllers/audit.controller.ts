import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuditAction } from "@/models/AIAuditLog";
import { AuditLogService } from "@/services/audit-log.service";
import { ComplianceReportService } from "@/services/compliance-report.service";
import type { AuthenticatedSecurityUser } from "@/utils/security-user";

@Controller("security")
export class AuditController {
  constructor(
    private readonly auditLogService: AuditLogService,
    private readonly complianceReportService: ComplianceReportService,
  ) {}

  @Get("audit")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  searchAudit(
    @CurrentUser() user: AuthenticatedSecurityUser,
    @Query("action") action?: AuditAction,
    @Query("modelId") modelId?: string,
    @Query("userId") userId?: string,
    @Query("piiDetected") piiDetected?: string,
    @Query("since") since?: string,
  ) {
    return this.auditLogService.searchAuditLogs(user.tenantId, {
      action,
      modelId,
      userId,
      piiDetected: piiDetected === "true" ? true : piiDetected === "false" ? false : undefined,
      since: since ? new Date(since) : undefined,
    });
  }

  @Get("audit/export")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  exportAudit(@CurrentUser() user: AuthenticatedSecurityUser) {
    return this.auditLogService.exportAuditLogs(user.tenantId);
  }

  @Get("compliance/export")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  exportCompliance(@CurrentUser() user: AuthenticatedSecurityUser) {
    return this.complianceReportService.generateFullComplianceExport(user.tenantId);
  }

  @Get("compliance/soc2")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  soc2Report(@CurrentUser() user: AuthenticatedSecurityUser) {
    return this.complianceReportService.generateSoc2Report(user.tenantId);
  }

  @Get("compliance/iso27001")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  isoReport(@CurrentUser() user: AuthenticatedSecurityUser) {
    return this.complianceReportService.generateIso27001Report(user.tenantId);
  }
}
