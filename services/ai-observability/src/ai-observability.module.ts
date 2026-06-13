import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { DashboardController } from "@/controllers/dashboard.controller";
import { HealthController } from "@/controllers/health.controller";
import { InternalObservabilityController } from "@/controllers/internal-observability.controller";
import { LogsController } from "@/controllers/logs.controller";
import { MetricsController } from "@/controllers/metrics.controller";
import { TraceController } from "@/controllers/trace.controller";
import { JwtGuard } from "@/guards/jwt.guard";
import { ObservabilityRepository } from "@/repositories/observability.repository";
import { BottleneckDetectorService } from "@/services/bottleneck-detector.service";
import { HeatmapService } from "@/services/heatmap.service";
import { LoggingService } from "@/services/logging.service";
import { MetricsService } from "@/services/metrics.service";
import { ObservabilityDashboardService } from "@/services/observability-dashboard.service";
import { TraceSpanService } from "@/services/trace.service";
import { JwtStrategy } from "@/strategies/jwt.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [
    HealthController,
    TraceController,
    LogsController,
    MetricsController,
    DashboardController,
    InternalObservabilityController,
  ],
  providers: [
    ObservabilityRepository,
    TraceSpanService,
    LoggingService,
    MetricsService,
    HeatmapService,
    BottleneckDetectorService,
    ObservabilityDashboardService,
    JwtStrategy,
    JwtGuard,
  ],
})
export class AiObservabilityModule {}
