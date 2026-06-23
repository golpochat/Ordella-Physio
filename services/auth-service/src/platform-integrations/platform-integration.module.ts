import { Module } from "@nestjs/common";
import { AuditModule } from "@/audit/audit.module";
import { InternalPlatformIntegrationController } from "@/platform-integrations/internal-platform-integration.controller";
import { PlatformIntegrationController } from "@/platform-integrations/platform-integration.controller";
import { PlatformIntegrationRepository } from "@/platform-integrations/platform-integration.repository";
import { PlatformIntegrationService } from "@/platform-integrations/platform-integration.service";

@Module({
  imports: [AuditModule],
  controllers: [PlatformIntegrationController, InternalPlatformIntegrationController],
  providers: [PlatformIntegrationRepository, PlatformIntegrationService],
  exports: [PlatformIntegrationService],
})
export class PlatformIntegrationModule {}
