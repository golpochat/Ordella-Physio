import { Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { SecurityRepository } from "@/repositories/security.repository";
import { ComplianceReportService } from "@/services/compliance-report.service";
import type { AuthenticatedSecurityUser } from "@/utils/security-user";

@Controller("security")
export class PIIController {
  constructor(
    private readonly repository: SecurityRepository,
    private readonly complianceReportService: ComplianceReportService,
  ) {}

  @Get("pii/incidents")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  listIncidents(
    @CurrentUser() user: AuthenticatedSecurityUser,
    @Query("unresolved") unresolved?: string,
  ) {
    return this.repository.listPIIIncidents(user.tenantId, unresolved === "true").then((rows) =>
      rows.map((row) => this.repository.mapIncident(row)),
    );
  }

  @Post("pii/resolve/:id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  async resolveIncident(@CurrentUser() user: AuthenticatedSecurityUser, @Param("id") id: string) {
    await this.repository.resolvePIIIncident(id, user.tenantId);
    return { resolved: true, id };
  }

  @Get("pii/report")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  piiReport(@CurrentUser() user: AuthenticatedSecurityUser) {
    return this.complianceReportService.generatePIIIncidentReport(user.tenantId);
  }
}
