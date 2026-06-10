import { Module } from "@nestjs/common";
import { MetricsRepository } from "@/metrics/metrics.repository";

@Module({
  providers: [MetricsRepository],
  exports: [MetricsRepository],
})
export class MetricsDataModule {}
