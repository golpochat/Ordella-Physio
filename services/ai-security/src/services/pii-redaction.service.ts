import { createHash } from "node:crypto";
import { Injectable } from "@nestjs/common";
import type { PIIType } from "@/models/AIPIIIncident";
import { SecurityRepository } from "@/repositories/security.repository";
import { PIIDetectionService } from "@/services/pii-detection.service";

const REDACTION_MASK: Record<PIIType, string> = {
  EMAIL: "[REDACTED_EMAIL]",
  PHONE: "[REDACTED_PHONE]",
  ADDRESS: "[REDACTED_ADDRESS]",
  ID_NUMBER: "[REDACTED_ID]",
  GENERIC: "[REDACTED_PII]",
};

@Injectable()
export class PIIRedactionService {
  constructor(
    private readonly detectionService: PIIDetectionService,
    private readonly repository: SecurityRepository,
  ) {}

  redactText(input: string) {
    const detection = this.detectionService.detect(input);
    let redacted = input;

    for (const match of [...detection.matches].sort((a, b) => b.start - a.start)) {
      const mask = REDACTION_MASK[match.type];
      redacted = redacted.slice(0, match.start) + mask + redacted.slice(match.end);
    }

    if (detection.types.includes("GENERIC") && redacted === input) {
      redacted = `${input.slice(0, 200)} [REDACTED_PII_TRUNCATED]`;
    }

    return {
      original: input,
      redacted,
      piiDetected: detection.detected,
      types: detection.types,
    };
  }

  maskSensitiveFields<T extends Record<string, unknown>>(obj: T): T {
    const sensitiveKeys = ["email", "phone", "address", "ssn", "password", "token", "apiKey"];
    const result = { ...obj } as T;
    for (const key of Object.keys(result)) {
      if (sensitiveKeys.some((s) => key.toLowerCase().includes(s))) {
        (result as Record<string, unknown>)[key] = "[REDACTED]";
      }
    }
    return result;
  }

  async generateRedactionReport(tenantId: string, modelId: string | undefined, text: string) {
    const result = this.redactText(text);
    const incidents = [];

    for (const type of result.types) {
      const incident = await this.repository.createPIIIncident({
        tenantId,
        modelId,
        piiType: type,
        originalText: createHash("sha256").update(text).digest("hex"),
        redactedText: result.redacted.slice(0, 500),
      });
      incidents.push(this.repository.mapIncident(incident));
    }

    return { ...result, incidents };
  }

  hashText(text: string) {
    return createHash("sha256").update(text).digest("hex");
  }
}
