import { Controller, Get, Param, Query, Res, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import type { Response } from "express";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { TrainingDashboardService } from "@/services/training-dashboard.service";
import { TrainingLogStreamService } from "@/services/training-log-stream.service";
import { TrainingMetricsStreamService } from "@/services/training-metrics-stream.service";
import { TrainingJobService } from "@/services/training-job.service";
import type { AuthenticatedTrainingUser } from "@/utils/training-user";

@Controller("training")
export class TrainingDashboardController {
  constructor(
    private readonly dashboardService: TrainingDashboardService,
    private readonly logStreamService: TrainingLogStreamService,
    private readonly metricsStreamService: TrainingMetricsStreamService,
    private readonly trainingJobService: TrainingJobService,
  ) {}

  @Get(":id/dashboard")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_TRAINING_VIEW)
  getDashboard(@CurrentUser() user: AuthenticatedTrainingUser, @Param("id") id: string) {
    return this.dashboardService.getDashboard(user.tenantId, id);
  }

  @Get(":id/logs/stream")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_TRAINING_VIEW)
  streamLogs(
    @CurrentUser() user: AuthenticatedTrainingUser,
    @Param("id") id: string,
    @Res() response: Response,
  ) {
    void this.trainingJobService.getJob(user.tenantId, id);
    this.logStreamService.subscribe(id, response);
  }

  @Get(":id/metrics/stream")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_TRAINING_VIEW)
  async streamMetrics(
    @CurrentUser() user: AuthenticatedTrainingUser,
    @Param("id") id: string,
    @Res() response: Response,
  ) {
    const job = await this.trainingJobService.getJob(user.tenantId, id);
    this.metricsStreamService.subscribe(id, response);
    this.metricsStreamService.publishMetrics(id, job.metrics);
  }

  @Get(":id/experiments/compare")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_TRAINING_VIEW)
  compareExperiments(
    @CurrentUser() user: AuthenticatedTrainingUser,
    @Param("id") id: string,
    @Query("ids") ids?: string,
  ) {
    const experimentIds = ids
      ? ids
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean)
      : undefined;
    return this.dashboardService.getExperimentComparison(user.tenantId, id, experimentIds);
  }
}
