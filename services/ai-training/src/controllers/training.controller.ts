import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import type { Request, Response } from "express";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { TrainingJobService } from "@/services/training-job.service";
import { TrainingLogStreamService } from "@/services/training-log-stream.service";
import type { AuthenticatedTrainingUser } from "@/utils/training-user";

function buildForwardHeaders(request: Request, user: AuthenticatedTrainingUser) {
  const headers: Record<string, string> = {
    Authorization: request.headers.authorization ?? "",
    "x-tenant-id": user.tenantId,
    "x-user-id": user.userId,
    "x-user-role": user.role,
  };
  if (user.permissions?.length) {
    headers["x-user-permissions"] = user.permissions.join(",");
  }
  return headers;
}

@Controller("training")
export class TrainingController {
  constructor(
    private readonly trainingJobService: TrainingJobService,
    private readonly logStreamService: TrainingLogStreamService,
  ) {}

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_TRAINING_MANAGE)
  createJob(
    @CurrentUser() user: AuthenticatedTrainingUser,
    @Req() request: Request,
    @Body() body: Record<string, unknown>,
  ) {
    return this.trainingJobService.createJob(
      user.tenantId,
      body,
      user.userId,
      buildForwardHeaders(request, user),
    );
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_TRAINING_VIEW)
  listJobs(@CurrentUser() user: AuthenticatedTrainingUser) {
    return this.trainingJobService.listJobs(user.tenantId);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_TRAINING_VIEW)
  getJob(@CurrentUser() user: AuthenticatedTrainingUser, @Param("id") id: string) {
    return this.trainingJobService.getJob(user.tenantId, id);
  }

  @Get(":id/metrics")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_TRAINING_VIEW)
  getMetrics(@CurrentUser() user: AuthenticatedTrainingUser, @Param("id") id: string) {
    return this.trainingJobService.getJobMetrics(user.tenantId, id);
  }

  @Get(":id/logs")
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
}
