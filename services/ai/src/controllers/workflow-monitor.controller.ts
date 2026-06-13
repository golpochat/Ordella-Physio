import { Controller, Get, Query, Req, Res, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import type { Request, Response } from "express";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { WorkflowMonitorService } from "@/services/workflow-monitor.service";
import type { AuthenticatedAiUser } from "@/utils/ai-user";

@Controller("workflows/monitor")
export class WorkflowMonitorController {
  constructor(private readonly workflowMonitorService: WorkflowMonitorService) {}

  @Get("stream")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AUTOMATION_MONITOR)
  streamEvents(
    @CurrentUser() user: AuthenticatedAiUser,
    @Req() request: Request & { tenantId?: string },
    @Res() response: Response,
  ) {
    const headerTenantId = request.tenantId;
    const allTenants = user.role === "SYSTEM" && !headerTenantId;

    this.workflowMonitorService.subscribeToLiveEvents(response, {
      tenantId: headerTenantId ?? user.tenantId,
      allTenants,
    });
  }

  @Get("recent")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AUTOMATION_MONITOR)
  getRecentEvents(
    @CurrentUser() user: AuthenticatedAiUser,
    @Req() request: Request & { tenantId?: string },
    @Query() query: Record<string, unknown>,
  ) {
    const headerTenantId = request.tenantId;
    const allTenants = user.role === "SYSTEM" && !headerTenantId;

    return this.workflowMonitorService.getRecentEvents(
      headerTenantId ?? user.tenantId,
      query,
      { allTenants },
    );
  }
}
