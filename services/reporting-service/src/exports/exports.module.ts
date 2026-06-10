import { Module } from "@nestjs/common";
import { ExportsService } from "@/exports/exports.service";
import { MetricsDataModule } from "@/metrics/metrics-data.module";

@Module({
  imports: [MetricsDataModule],
  providers: [ExportsService],
  exports: [ExportsService],
})
export class ExportsModule {}
