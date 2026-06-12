import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { DashboardMetricsController } from "@/dashboard/dashboard.controller";
import { DashboardMetricsService } from "@/dashboard/dashboard.service";
import { IntegrationsModule } from "@/integrations/integrations.module";
import { JwtStrategy } from "@/metrics/strategies/jwt.strategy";
import { JwtGuard } from "@/metrics/guards/jwt.guard";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" }), IntegrationsModule],
  controllers: [DashboardMetricsController],
  providers: [DashboardMetricsService, JwtStrategy, JwtGuard],
})
export class DashboardMetricsModule {}
