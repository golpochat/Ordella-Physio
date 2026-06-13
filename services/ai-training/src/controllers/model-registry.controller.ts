import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { ModelRegistryService } from "@/services/model-registry.service";
import type { AuthenticatedTrainingUser } from "@/utils/training-user";

@Controller("models")
export class ModelRegistryController {
  constructor(private readonly modelRegistryService: ModelRegistryService) {}

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  listModels(@CurrentUser() user: AuthenticatedTrainingUser) {
    return this.modelRegistryService.listModels(user.tenantId);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getModel(@CurrentUser() user: AuthenticatedTrainingUser, @Param("id") id: string) {
    return this.modelRegistryService.getModel(user.tenantId, id);
  }

  @Post(":id/publish")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  publishModel(@CurrentUser() user: AuthenticatedTrainingUser, @Param("id") id: string) {
    return this.modelRegistryService.publishModel(user.tenantId, id);
  }

  @Post(":id/deprecate")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  deprecateModel(@CurrentUser() user: AuthenticatedTrainingUser, @Param("id") id: string) {
    return this.modelRegistryService.deprecateModel(user.tenantId, id);
  }
}
