import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { DatasetVersionService } from "@/services/dataset-version.service";
import type { AuthenticatedAiUser } from "@/utils/ai-user";
import { aiValidationError } from "@/utils/ai-errors";

function parseVersion(value: string, field: string) {
  const versionNumber = Number(value);
  if (!Number.isInteger(versionNumber) || versionNumber < 1) {
    throw aiValidationError([{ field, message: "Invalid version number." }]);
  }
  return versionNumber;
}

@Controller("datasets")
export class DatasetVersionController {
  constructor(private readonly datasetVersionService: DatasetVersionService) {}

  @Get(":datasetId/versions")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_VIEW)
  listVersions(@CurrentUser() user: AuthenticatedAiUser, @Param("datasetId") datasetId: string) {
    return this.datasetVersionService.listVersions(user.tenantId, datasetId, user);
  }

  @Get(":datasetId/versions/:fromVersion/diff/:toVersion")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_VIEW)
  diffVersions(
    @CurrentUser() user: AuthenticatedAiUser,
    @Param("datasetId") datasetId: string,
    @Param("fromVersion") fromVersion: string,
    @Param("toVersion") toVersion: string,
  ) {
    return this.datasetVersionService.computeDiff(
      user.tenantId,
      datasetId,
      parseVersion(fromVersion, "fromVersion"),
      parseVersion(toVersion, "toVersion"),
      user,
    );
  }

  @Get(":datasetId/versions/:versionNumber")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_VIEW)
  getVersion(
    @CurrentUser() user: AuthenticatedAiUser,
    @Param("datasetId") datasetId: string,
    @Param("versionNumber") versionNumber: string,
  ) {
    return this.datasetVersionService.getVersion(
      user.tenantId,
      datasetId,
      parseVersion(versionNumber, "versionNumber"),
      user,
    );
  }

  @Post(":datasetId/versions")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_MANAGE)
  createVersion(@CurrentUser() user: AuthenticatedAiUser, @Param("datasetId") datasetId: string) {
    return this.datasetVersionService.createVersion(user.tenantId, datasetId, user.userId);
  }

  @Post(":datasetId/versions/:versionNumber/rollback")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_MANAGE)
  rollback(
    @CurrentUser() user: AuthenticatedAiUser,
    @Param("datasetId") datasetId: string,
    @Param("versionNumber") versionNumber: string,
  ) {
    return this.datasetVersionService.rollbackVersion(
      user.tenantId,
      datasetId,
      parseVersion(versionNumber, "versionNumber"),
      user.userId,
    );
  }
}
