import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuditController } from "@/controllers/audit.controller";
import { HealthController } from "@/controllers/health.controller";
import { InternalSecurityController } from "@/controllers/internal-security.controller";
import { PIIController } from "@/controllers/pii.controller";
import { PolicyController } from "@/controllers/policy.controller";
import { JwtGuard } from "@/guards/jwt.guard";
import { SecurityRepository } from "@/repositories/security.repository";
import { AccessPolicyService } from "@/services/access-policy.service";
import { AuditLogService } from "@/services/audit-log.service";
import { ComplianceReportService } from "@/services/compliance-report.service";
import { PIIDetectionService } from "@/services/pii-detection.service";
import { PIIRedactionService } from "@/services/pii-redaction.service";
import { JwtStrategy } from "@/strategies/jwt.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [HealthController, AuditController, PolicyController, PIIController, InternalSecurityController],
  providers: [
    SecurityRepository,
    AuditLogService,
    AccessPolicyService,
    PIIDetectionService,
    PIIRedactionService,
    ComplianceReportService,
    JwtStrategy,
    JwtGuard,
  ],
})
export class AiSecurityModule {}
