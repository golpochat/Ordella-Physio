import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { DatasetEmbeddingService } from "@/services/dataset-embedding.service";
import { DatasetRecordService } from "@/services/dataset-record.service";
import type { AuthenticatedAiUser } from "@/utils/ai-user";

@Controller("datasets")
export class DatasetRecordController {
  constructor(
    private readonly datasetRecordService: DatasetRecordService,
    private readonly datasetEmbeddingService: DatasetEmbeddingService,
  ) {}

  @Get(":datasetId/versions/:versionId/records")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_VIEW)
  listRecords(
    @CurrentUser() user: AuthenticatedAiUser,
    @Param("datasetId") datasetId: string,
    @Param("versionId") versionId: string,
    @Query("search") search?: string,
  ) {
    return this.datasetRecordService.listRecords(
      user.tenantId,
      datasetId,
      versionId,
      user,
      search,
    );
  }

  @Post(":datasetId/versions/:versionId/records/bulk")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_MANAGE)
  bulkAdd(
    @CurrentUser() user: AuthenticatedAiUser,
    @Param("datasetId") datasetId: string,
    @Param("versionId") versionId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.datasetRecordService.bulkAddRecords(
      user.tenantId,
      datasetId,
      versionId,
      body,
      user,
    );
  }

  @Post(":datasetId/versions/:versionId/records")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_MANAGE)
  addRecord(
    @CurrentUser() user: AuthenticatedAiUser,
    @Param("datasetId") datasetId: string,
    @Param("versionId") versionId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.datasetRecordService.addRecord(
      user.tenantId,
      datasetId,
      versionId,
      body,
      user,
    );
  }

  @Post(":datasetId/versions/:versionId/embed")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_MANAGE)
  batchEmbed(
    @CurrentUser() user: AuthenticatedAiUser,
    @Param("datasetId") datasetId: string,
    @Param("versionId") versionId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.datasetEmbeddingService.batchEmbedVersion(
      user.tenantId,
      versionId,
      body.model ? String(body.model) : undefined,
    );
  }

  @Put("records/:recordId")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_MANAGE)
  updateRecord(
    @CurrentUser() user: AuthenticatedAiUser,
    @Param("recordId") recordId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.datasetRecordService.updateRecord(user.tenantId, recordId, body, user);
  }

  @Delete("records/:recordId")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_MANAGE)
  deleteRecord(@CurrentUser() user: AuthenticatedAiUser, @Param("recordId") recordId: string) {
    return this.datasetRecordService.deleteRecord(user.tenantId, recordId, user);
  }

  @Post("records/:recordId/labels")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_DATASET_LABEL)
  addLabel(
    @CurrentUser() user: AuthenticatedAiUser,
    @Param("recordId") recordId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.datasetRecordService.addLabel(user.tenantId, recordId, body, user);
  }
}
