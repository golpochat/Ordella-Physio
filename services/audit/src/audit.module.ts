import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuditLogController } from "@/controllers/audit-log.controller";
import { InternalAuditLogController } from "@/controllers/internal-audit-log.controller";
import { AuditLogService } from "@/services/audit-log.service";
import { AuditLogExportService } from "@/services/audit-log-export.service";
import { AuditLogRepository } from "@/repositories/audit-log.repository";
import { AuditLogClient } from "@/integrations/audit-log.client";
import { JwtStrategy } from "@/strategies/jwt.strategy";
import { JwtGuard } from "@/guards/jwt.guard";
import { AuditViewGuard } from "@/guards/audit-view.guard";
import { AuditWriteGuard } from "@/guards/audit-write.guard";
import { AuditExportGuard } from "@/guards/audit-export.guard";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [AuditLogController, InternalAuditLogController],
  providers: [
    AuditLogService,
    AuditLogExportService,
    AuditLogRepository,
    AuditLogClient,
    JwtStrategy,
    JwtGuard,
    AuditViewGuard,
    AuditWriteGuard,
    AuditExportGuard,
  ],
  exports: [AuditLogService, AuditLogClient],
})
export class AuditModule {}
