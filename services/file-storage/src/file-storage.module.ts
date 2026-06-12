import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { FileController } from "@/controllers/file.controller";
import { InternalFileController } from "@/controllers/internal-file.controller";
import { AuditLogClient } from "@/integrations/audit-log.client";
import { SubscriptionBillingClient } from "@/integrations/subscription-billing.client";
import { FileObjectRepository } from "@/repositories/file-object.repository";
import { FileLifecycleService } from "@/services/file-lifecycle.service";
import { FileStorageService } from "@/services/file-storage.service";
import { ImageTransformService } from "@/services/image-transform.service";
import { StorageProviderService } from "@/services/storage-provider.service";
import { ThumbnailService } from "@/services/thumbnail.service";
import { VirusScanService } from "@/services/virus-scan.service";
import { JwtStrategy } from "@/strategies/jwt.strategy";
import { JwtGuard } from "@/guards/jwt.guard";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [FileController, InternalFileController],
  providers: [
    FileStorageService,
    StorageProviderService,
    ImageTransformService,
    ThumbnailService,
    VirusScanService,
    FileLifecycleService,
    FileObjectRepository,
    AuditLogClient,
    SubscriptionBillingClient,
    JwtStrategy,
    JwtGuard,
  ],
  exports: [FileStorageService],
})
export class FileStorageModule {}
