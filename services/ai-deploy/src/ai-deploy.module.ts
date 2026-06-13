import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { DeploymentController } from "@/controllers/deployment.controller";
import { HealthController } from "@/controllers/health.controller";
import { JwtGuard } from "@/guards/jwt.guard";
import { AiInferenceRoutingClient } from "@/integrations/ai-inference-routing.client";
import { DeploymentRepository } from "@/repositories/deployment.repository";
import { DeploymentArtifactService } from "@/services/deployment-artifact.service";
import { DeploymentHealthService } from "@/services/deployment-health.service";
import { DeploymentMetricsService } from "@/services/deployment-metrics.service";
import { DeploymentPipelineService } from "@/services/deployment-pipeline.service";
import { DeploymentService } from "@/services/deployment.service";
import { RegionRouterService } from "@/services/region-router.service";
import { JwtStrategy } from "@/strategies/jwt.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [HealthController, DeploymentController],
  providers: [
    DeploymentService,
    DeploymentPipelineService,
    DeploymentArtifactService,
    DeploymentHealthService,
    DeploymentMetricsService,
    RegionRouterService,
    DeploymentRepository,
    AiInferenceRoutingClient,
    JwtStrategy,
    JwtGuard,
  ],
})
export class AiDeployModule {}
