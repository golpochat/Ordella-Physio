import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { DriftController } from "@/controllers/drift.controller";
import { HealthController } from "@/controllers/health.controller";
import { JwtGuard } from "@/guards/jwt.guard";
import { AiInferenceStatsClient } from "@/integrations/ai-inference-stats.client";
import { AiTrainingMitigationClient } from "@/integrations/ai-training-mitigation.client";
import { AiDriftEventRepository, AiDriftMetricRepository } from "@/repositories/drift.repository";
import { DriftAlertService } from "@/services/drift-alert.service";
import { DriftDashboardService } from "@/services/drift-dashboard.service";
import { DriftDetectionService } from "@/services/drift-detection.service";
import { DriftMetricsService } from "@/services/drift-metrics.service";
import { DriftMitigationService } from "@/services/drift-mitigation.service";
import { JwtStrategy } from "@/strategies/jwt.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [HealthController, DriftController],
  providers: [
    DriftDetectionService,
    DriftMetricsService,
    DriftAlertService,
    DriftDashboardService,
    DriftMitigationService,
    AiInferenceStatsClient,
    AiTrainingMitigationClient,
    AiDriftEventRepository,
    AiDriftMetricRepository,
    JwtStrategy,
    JwtGuard,
  ],
})
export class AiMonitoringModule {}
