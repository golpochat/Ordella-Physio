import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { EvaluationSuiteService } from "@/services/evaluation-suite.service";
import type { AuthenticatedTrainingUser } from "@/utils/training-user";

@Controller("models")
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationSuiteService) {}

  @Post(":id/evaluate")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  runEvaluation(
    @CurrentUser() user: AuthenticatedTrainingUser,
    @Param("id") id: string,
    @Body() body: Record<string, unknown>,
  ) {
    const datasetId = typeof body.datasetId === "string" ? body.datasetId.trim() : undefined;
    return this.evaluationService.runFullEvaluation(user.tenantId, id, datasetId, {
      "x-tenant-id": user.tenantId,
      "x-user-id": user.userId,
      "x-user-role": user.role,
    });
  }

  @Get(":id/evaluations")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  listEvaluations(@CurrentUser() user: AuthenticatedTrainingUser, @Param("id") id: string) {
    return this.evaluationService.listEvaluations(user.tenantId, id);
  }

  @Get(":id/evaluations/latest")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getLatestEvaluation(@CurrentUser() user: AuthenticatedTrainingUser, @Param("id") id: string) {
    return this.evaluationService.getLatestEvaluation(user.tenantId, id);
  }
}
