import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { DatasetService } from "@/services/dataset.service";
import type { AuthenticatedAiUser } from "@/utils/ai-user";

@Controller("datasets")
export class DatasetController {
  constructor(private readonly datasetService: DatasetService) {}

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_VIEW)
  list(@CurrentUser() user: AuthenticatedAiUser) {
    return this.datasetService.listDatasets(user.tenantId, user);
  }

  @Post("import")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_MANAGE)
  importDataset(@CurrentUser() user: AuthenticatedAiUser, @Body() body: Record<string, unknown>) {
    return this.datasetService.importDataset(user.tenantId, body, user.userId, user);
  }

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_MANAGE)
  create(@CurrentUser() user: AuthenticatedAiUser, @Body() body: Record<string, unknown>) {
    return this.datasetService.createDataset(user.tenantId, body, user.userId);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_VIEW)
  getOne(@CurrentUser() user: AuthenticatedAiUser, @Param("id") id: string) {
    return this.datasetService.getDataset(user.tenantId, id, user);
  }

  @Put(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_MANAGE)
  update(
    @CurrentUser() user: AuthenticatedAiUser,
    @Param("id") id: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.datasetService.updateDataset(user.tenantId, id, body, user.userId, user);
  }

  @Delete(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_MANAGE)
  remove(@CurrentUser() user: AuthenticatedAiUser, @Param("id") id: string) {
    return this.datasetService.deleteDataset(user.tenantId, id, user.userId, user);
  }

  @Post(":id/clone")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_MANAGE)
  clone(@CurrentUser() user: AuthenticatedAiUser, @Param("id") id: string) {
    return this.datasetService.cloneDataset(user.tenantId, id, user.userId, user);
  }

  @Post(":id/export")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_VIEW)
  exportDataset(@CurrentUser() user: AuthenticatedAiUser, @Param("id") id: string) {
    return this.datasetService.exportDataset(user.tenantId, id, user);
  }
}
