import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { FlagVariant } from "@/models/FeatureFlag";
import { FeatureFlagService } from "@/services/feature-flag.service";
import type { AuthenticatedFeatureFlagsUser } from "@/utils/feature-flags-user";

@Controller("flags")
export class FeatureFlagController {
  constructor(private readonly featureFlagService: FeatureFlagService) {}

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  listFlags(@CurrentUser() user: AuthenticatedFeatureFlagsUser) {
    return this.featureFlagService.listFlags(user.tenantId);
  }

  @Get("evaluate")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  evaluate(
    @CurrentUser() user: AuthenticatedFeatureFlagsUser,
    @Query("keys") keys: string,
    @Query("userId") userId?: string,
  ) {
    const keyList = keys.split(",").map((k) => k.trim()).filter(Boolean);
    return this.featureFlagService.evaluateMany(user.tenantId, keyList, {
      userId: userId ?? user.userId,
    });
  }

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  createFlag(
    @CurrentUser() user: AuthenticatedFeatureFlagsUser,
    @Body()
    body: {
      key: string;
      type: "BOOLEAN" | "PERCENTAGE" | "VARIANT";
      variants?: FlagVariant[];
      rollout?: Record<string, unknown>;
      isActive?: boolean;
    },
  ) {
    return this.featureFlagService.createFlag(user.tenantId, body);
  }

  @Put(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  updateFlag(
    @CurrentUser() user: AuthenticatedFeatureFlagsUser,
    @Param("id") id: string,
    @Body()
    body: Partial<{
      type: "BOOLEAN" | "PERCENTAGE" | "VARIANT";
      variants: FlagVariant[];
      rollout: Record<string, unknown>;
      isActive: boolean;
    }>,
  ) {
    return this.featureFlagService.updateFlag(user.tenantId, id, body);
  }

  @Post(":id/rollout")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  updateRollout(
    @CurrentUser() user: AuthenticatedFeatureFlagsUser,
    @Param("id") id: string,
    @Body() body: { rollout: Record<string, unknown> },
  ) {
    return this.featureFlagService.updateRollout(user.tenantId, id, body.rollout);
  }
}
