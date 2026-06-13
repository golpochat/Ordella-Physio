import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { InferenceService } from "@/services/inference.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedAiUser } from "@/utils/ai-user";

@Controller()
export class InferenceController {
  constructor(private readonly inferenceService: InferenceService) {}

  @Post("text")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  runText(@CurrentUser() user: AuthenticatedAiUser, @Body() body: Record<string, unknown>) {
    return this.inferenceService.runTextCompletion(body, user.tenantId, user.userId);
  }

  @Post("json")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  runJson(@CurrentUser() user: AuthenticatedAiUser, @Body() body: Record<string, unknown>) {
    return this.inferenceService.runStructuredOutput(body, user.tenantId);
  }

  @Post("embed")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  runEmbed(@CurrentUser() user: AuthenticatedAiUser, @Body() body: Record<string, unknown>) {
    return this.inferenceService.runEmbedding(body, user.tenantId);
  }
}
