import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { WorkflowVersionService } from "@/services/workflow-version.service";
import type { AuthenticatedAiUser } from "@/utils/ai-user";
import { aiValidationError } from "@/utils/ai-errors";

function parseVersionNumber(value: string, field: string): number {
  const versionNumber = Number(value);
  if (!Number.isInteger(versionNumber) || versionNumber < 1) {
    throw aiValidationError([{ field, message: "Invalid version number." }]);
  }
  return versionNumber;
}

@Controller("workflows")
export class WorkflowVersionController {
  constructor(private readonly workflowVersionService: WorkflowVersionService) {}

  @Get(":workflowId/versions")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AUTOMATION_VIEW)
  listVersions(
    @CurrentUser() user: AuthenticatedAiUser,
    @Param("workflowId") workflowId: string,
  ) {
    return this.workflowVersionService.getVersions(user.tenantId, workflowId);
  }

  @Get(":workflowId/versions/:fromVersion/diff/:toVersion")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AUTOMATION_VIEW)
  diffVersions(
    @CurrentUser() user: AuthenticatedAiUser,
    @Param("workflowId") workflowId: string,
    @Param("fromVersion") fromVersion: string,
    @Param("toVersion") toVersion: string,
  ) {
    return this.workflowVersionService.diffVersions(
      user.tenantId,
      workflowId,
      parseVersionNumber(fromVersion, "fromVersion"),
      parseVersionNumber(toVersion, "toVersion"),
    );
  }

  @Get(":workflowId/versions/:versionNumber")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AUTOMATION_VIEW)
  getVersion(
    @CurrentUser() user: AuthenticatedAiUser,
    @Param("workflowId") workflowId: string,
    @Param("versionNumber") versionNumber: string,
  ) {
    return this.workflowVersionService.getVersion(
      user.tenantId,
      workflowId,
      parseVersionNumber(versionNumber, "versionNumber"),
    );
  }

  @Post(":workflowId/versions/:versionNumber/rollback")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AUTOMATION_VERSIONING)
  rollback(
    @CurrentUser() user: AuthenticatedAiUser,
    @Param("workflowId") workflowId: string,
    @Param("versionNumber") versionNumber: string,
  ) {
    return this.workflowVersionService.rollbackToVersion(
      user.tenantId,
      workflowId,
      parseVersionNumber(versionNumber, "versionNumber"),
      user.userId,
    );
  }

  @Put(":workflowId/versions/:versionNumber/label")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AUTOMATION_VERSIONING)
  updateLabel(
    @CurrentUser() user: AuthenticatedAiUser,
    @Param("workflowId") workflowId: string,
    @Param("versionNumber") versionNumber: string,
    @Body() body: Record<string, unknown>,
  ) {
    const label = body.label === null || body.label === undefined ? null : String(body.label).trim();
    return this.workflowVersionService.updateVersionLabel(
      user.tenantId,
      workflowId,
      parseVersionNumber(versionNumber, "versionNumber"),
      label || null,
    );
  }
}
