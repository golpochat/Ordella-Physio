import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ExperimentController } from "@/controllers/experiment.controller";
import { FeatureFlagController } from "@/controllers/feature-flag.controller";
import { HealthController } from "@/controllers/health.controller";
import { JwtGuard } from "@/guards/jwt.guard";
import { AiExperimentRoutingClient } from "@/integrations/ai-experiment-routing.client";
import { ExperimentRepository, FeatureFlagRepository } from "@/repositories/feature-flag.repository";
import { ExperimentAnalyticsService } from "@/services/experiment-analytics.service";
import { ExperimentAssignmentService } from "@/services/experiment-assignment.service";
import { ExperimentService } from "@/services/experiment.service";
import { FeatureFlagService } from "@/services/feature-flag.service";
import { JwtStrategy } from "@/strategies/jwt.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [HealthController, FeatureFlagController, ExperimentController],
  providers: [
    FeatureFlagService,
    ExperimentService,
    ExperimentAssignmentService,
    ExperimentAnalyticsService,
    FeatureFlagRepository,
    ExperimentRepository,
    AiExperimentRoutingClient,
    JwtStrategy,
    JwtGuard,
  ],
})
export class FeatureFlagsModule {}
