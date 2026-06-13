import { Injectable, Logger } from "@nestjs/common";
import { aiGatewayConfig } from "@/config/ai-gateway.config";

@Injectable()
export class AiSecurityClient {
  private readonly logger = new Logger(AiSecurityClient.name);
  private readonly securityServiceUrl = process.env.AI_SECURITY_SERVICE_URL ?? aiGatewayConfig.aiSecurityServiceUrl ?? "http://localhost:3082";

  private headers(tenantId: string) {
    return {
      "Content-Type": "application/json",
      "x-tenant-id": tenantId,
      "x-internal-service": "ai-gateway",
    };
  }

  async checkAccess(tenantId: string, modelId: string, apiKeyId: string) {
    try {
      const response = await fetch(`${this.securityServiceUrl}/ai/security/internal/check-access`, {
        method: "POST",
        headers: this.headers(tenantId),
        body: JSON.stringify({ apiKeyId, modelId }),
      });
      if (!response.ok) return { allowed: true };
      return response.json() as Promise<{ allowed: boolean; reason?: string }>;
    } catch {
      return { allowed: true };
    }
  }

  async redactText(tenantId: string, text: string, modelId?: string) {
    try {
      const response = await fetch(`${this.securityServiceUrl}/ai/security/internal/redact`, {
        method: "POST",
        headers: this.headers(tenantId),
        body: JSON.stringify({ text, modelId, store: true }),
      });
      if (!response.ok) return { redacted: text, piiDetected: false, types: [] };
      return response.json() as Promise<{ redacted: string; piiDetected: boolean; types: string[] }>;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Redaction failed";
      this.logger.debug(`Security redact unavailable: ${message}`);
      return { redacted: text, piiDetected: false, types: [] };
    }
  }

  async recordAudit(tenantId: string, event: {
    action: "INFERENCE";
    apiKeyId?: string;
    modelId?: string;
    requestMetadata?: Record<string, unknown>;
    responseMetadata?: Record<string, unknown>;
    piiDetected?: boolean;
    redacted?: boolean;
  }) {
    try {
      await fetch(`${this.securityServiceUrl}/ai/security/internal/audit`, {
        method: "POST",
        headers: this.headers(tenantId),
        body: JSON.stringify(event),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Audit failed";
      this.logger.debug(`Security audit unavailable: ${message}`);
    }
  }
}
