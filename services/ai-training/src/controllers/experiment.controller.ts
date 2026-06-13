import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { CheckpointService } from "@/services/checkpoint.service";
import { ExperimentTrackingService } from "@/services/experiment-tracking.service";
import type { AuthenticatedTrainingUser } from "@/utils/training-user";
import { trainingValidationError } from "@/utils/training-errors";
import { TrainingJobService } from "@/services/training-job.service";

@Controller("training")
export class ExperimentController {
  constructor(
    private readonly experimentService: ExperimentTrackingService,
    private readonly checkpointService: CheckpointService,
    private readonly trainingJobService: TrainingJobService,
  ) {}

  @Get("experiments/:experimentId")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_TRAINING_VIEW)
  getExperiment(
    @CurrentUser() user: AuthenticatedTrainingUser,
    @Param("experimentId") experimentId: string,
  ) {
    return this.experimentService.getExperiment(user.tenantId, experimentId);
  }

  @Post("experiments/:experimentId/label")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_TRAINING_MANAGE)
  labelExperiment(
    @CurrentUser() user: AuthenticatedTrainingUser,
    @Param("experimentId") experimentId: string,
    @Body() body: Record<string, unknown>,
  ) {
    const label = typeof body.label === "string" ? body.label.trim() : null;
    return this.experimentService.labelExperiment(user.tenantId, experimentId, label);
  }

  @Get(":jobId/experiments")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_TRAINING_VIEW)
  listExperiments(
    @CurrentUser() user: AuthenticatedTrainingUser,
    @Param("jobId") jobId: string,
  ) {
    return this.experimentService.listExperiments(user.tenantId, jobId);
  }

  @Post(":jobId/experiments")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_TRAINING_MANAGE)
  async createExperiment(
    @CurrentUser() user: AuthenticatedTrainingUser,
    @Param("jobId") jobId: string,
    @Body() body: Record<string, unknown>,
  ) {
    await this.trainingJobService.getJob(user.tenantId, jobId);
    const experimentName =
      typeof body.experimentName === "string" ? body.experimentName.trim() : "";
    if (!experimentName) {
      throw trainingValidationError([{ field: "experimentName", message: "Name is required." }]);
    }
    const hyperparameters =
      body.hyperparameters && typeof body.hyperparameters === "object"
        ? (body.hyperparameters as Record<string, unknown>)
        : {};
    return this.experimentService.createExperiment({
      tenantId: user.tenantId,
      trainingJobId: jobId,
      experimentName,
      hyperparameters,
      createdByUserId: user.userId,
    });
  }

  @Get(":jobId/checkpoints")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_TRAINING_VIEW)
  listCheckpoints(
    @CurrentUser() user: AuthenticatedTrainingUser,
    @Param("jobId") jobId: string,
  ) {
    return this.checkpointService.listCheckpoints(user.tenantId, jobId);
  }

  @Post(":jobId/resume/:checkpointNumber")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_TRAINING_MANAGE)
  resumeFromCheckpoint(
    @CurrentUser() user: AuthenticatedTrainingUser,
    @Param("jobId") jobId: string,
    @Param("checkpointNumber") checkpointNumber: string,
    @Body() _body: Record<string, unknown>,
  ) {
    const parsed = Number(checkpointNumber);
    if (!Number.isInteger(parsed) || parsed < 1) {
      throw trainingValidationError([
        { field: "checkpointNumber", message: "Invalid checkpoint number." },
      ]);
    }
    return this.checkpointService.resumeTraining(user.tenantId, jobId, parsed, {
      "x-tenant-id": user.tenantId,
      "x-user-id": user.userId,
      "x-user-role": user.role,
    });
  }
}
