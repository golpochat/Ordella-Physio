import { Global, Module } from "@nestjs/common";
import { ReportingCacheService } from "@/caching/cache.service";

@Global()
@Module({
  providers: [ReportingCacheService],
  exports: [ReportingCacheService],
})
export class ReportingCacheModule {}
