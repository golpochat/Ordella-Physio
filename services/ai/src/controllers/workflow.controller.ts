import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { WorkflowManagementService } from "@/services/workflow-management.service";
import type { AuthenticatedAiUser } from "@/utils/ai-user";

@Controller("workflows")
export class WorkflowController {
  constructor(private readonly workflowManagementService: WorkflowManagementService) {}

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AUTOMATION_VIEW)
  list(@CurrentUser() user: AuthenticatedAiUser) {
    return this.workflowManagementService.listWorkflows(user.tenantId);
  }

  @Get("runs")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AUTOMATION_VIEW)
  listAllRuns(@CurrentUser() user: AuthenticatedAiUser, @Query() query: Record<string, unknown>) {
    return this.workflowManagementService.listAllRuns(user.tenantId, query);
  }

  @Get(":id/runs")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AUTOMATION_VIEW)
  listRuns(
    @CurrentUser() user: AuthenticatedAiUser,
    @Param("id") id: string,
    @Query() query: Record<string, unknown>,
  ) {
    return this.workflowManagementService.listWorkflowRuns(user.tenantId, id, query);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AUTOMATION_VIEW)
  getOne(@CurrentUser() user: AuthenticatedAiUser, @Param("id") id: string) {
    return this.workflowManagementService.getWorkflow(user.tenantId, id);
  }

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AUTOMATION_MANAGE)
  create(@CurrentUser() user: AuthenticatedAiUser, @Body() body: Record<string, unknown>) {
    return this.workflowManagementService.createWorkflow(user.tenantId, body, user.userId);
  }

  @Put(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AUTOMATION_MANAGE)
  update(
    @CurrentUser() user: AuthenticatedAiUser,
    @Param("id") id: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.workflowManagementService.updateWorkflow(user.tenantId, id, body, user.userId);
  }

  @Post(":id/enable")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AUTOMATION_MANAGE)
  enable(@CurrentUser() user: AuthenticatedAiUser, @Param("id") id: string) {
    return this.workflowManagementService.enableWorkflow(user.tenantId, id);
  }

  @Post(":id/disable")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AUTOMATION_MANAGE)
  disable(@CurrentUser() user: AuthenticatedAiUser, @Param("id") id: string) {
    return this.workflowManagementService.disableWorkflow(user.tenantId, id);
  }
}
