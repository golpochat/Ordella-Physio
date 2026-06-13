import { Body, Controller, ForbiddenException, Headers, Post } from "@nestjs/common";
import { AuditLogService } from "@/services/audit-log.service";
import { AccessPolicyService } from "@/services/access-policy.service";
import { PIIDetectionService } from "@/services/pii-detection.service";
import { PIIRedactionService } from "@/services/pii-redaction.service";
import { SecurityRepository } from "@/repositories/security.repository";

@Controller("security/internal")
export class InternalSecurityController {
  constructor(
    private readonly accessPolicyService: AccessPolicyService,
    private readonly piiDetectionService: PIIDetectionService,
    private readonly piiRedactionService: PIIRedactionService,
    private readonly auditLogService: AuditLogService,
    private readonly repository: SecurityRepository,
  ) {}

  private assertInternal(service: string, tenantId: string) {
    if (!service || !tenantId) throw new ForbiddenException("Internal service headers required.");
  }

  @Post("check-access")
  async checkAccess(
    @Headers("x-internal-service") service: string,
    @Headers("x-tenant-id") tenantId: string,
    @Body() body: { userId?: string; apiKeyId?: string; modelId: string; userRole?: string },
  ) {
    this.assertInternal(service, tenantId);
    if (body.apiKeyId) {
      return this.accessPolicyService.checkApiKeyAccess(tenantId, body.modelId);
    }
    return this.accessPolicyService.checkModelAccess(tenantId, body.userId ?? "unknown", body.modelId, body.userRole);
  }

  @Post("scan-pii")
  scanPii(
    @Headers("x-internal-service") service: string,
    @Headers("x-tenant-id") tenantId: string,
    @Body() body: { text: string; modelId?: string },
  ) {
    this.assertInternal(service, tenantId);
    const detection = this.piiDetectionService.detect(body.text);
    return detection;
  }

  @Post("redact")
  async redact(
    @Headers("x-internal-service") service: string,
    @Headers("x-tenant-id") tenantId: string,
    @Body() body: { text: string; modelId?: string; store?: boolean },
  ) {
    this.assertInternal(service, tenantId);
    const result = await this.piiRedactionService.generateRedactionReport(tenantId, body.modelId, body.text);
    if (body.store) {
      await this.repository.storeSecurePrompt({
        tenantId,
        modelId: body.modelId,
        promptHash: this.piiRedactionService.hashText(body.text),
        redactedPrompt: result.redacted.slice(0, 2000),
      });
    }
    return result;
  }

  @Post("audit")
  async recordAudit(
    @Headers("x-internal-service") service: string,
    @Headers("x-tenant-id") tenantId: string,
    @Body()
    body: {
      action: "INFERENCE" | "TRAINING" | "DEPLOYMENT" | "DATASET" | "MODEL_ACCESS";
      userId?: string;
      apiKeyId?: string;
      modelId?: string;
      requestMetadata?: Record<string, unknown>;
      responseMetadata?: Record<string, unknown>;
      piiDetected?: boolean;
      redacted?: boolean;
    },
  ) {
    this.assertInternal(service, tenantId);
    const handlers = {
      INFERENCE: this.auditLogService.recordInferenceEvent.bind(this.auditLogService),
      TRAINING: this.auditLogService.recordTrainingEvent.bind(this.auditLogService),
      DEPLOYMENT: this.auditLogService.recordDeploymentEvent.bind(this.auditLogService),
      DATASET: this.auditLogService.recordDatasetEvent.bind(this.auditLogService),
      MODEL_ACCESS: this.auditLogService.recordModelAccessEvent.bind(this.auditLogService),
    };
    return handlers[body.action]({ tenantId, ...body });
  }
}
