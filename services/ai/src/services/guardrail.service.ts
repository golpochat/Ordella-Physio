import { Injectable } from "@nestjs/common";
import { HttpError, ERROR_CODES } from "@ordella/errors";

const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const PHONE_PATTERN = /(\+?\d[\d\s().-]{7,}\d)/g;
const DIAGNOSIS_PATTERNS = [
  /\bdiagnosed with\b/i,
  /\byou have (?:acute|chronic)?\s*[a-z]+\b/i,
  /\bclinical diagnosis\b/i,
  /\bprescription for\b/i,
  /\bthis is (?:definitely|certainly)\b/i,
];

@Injectable()
export class GuardrailService {
  scrubPII(text: string) {
    return text
      .replace(EMAIL_PATTERN, "[REDACTED_EMAIL]")
      .replace(PHONE_PATTERN, "[REDACTED_PHONE]");
  }

  enforceAllowedContent(text: string) {
    const blocked = ["hack", "exploit", "bypass security"];
    const lower = text.toLowerCase();
    if (blocked.some((term) => lower.includes(term))) {
      throw new HttpError({
        statusCode: 400,
        code: ERROR_CODES.AI.VALIDATION_FAILED,
        message: "Request contains disallowed content.",
        metadata: { error: "CONTENT_BLOCKED" },
      });
    }
    return text;
  }

  blockMedicalDiagnosis(text: string) {
    if (DIAGNOSIS_PATTERNS.some((pattern) => pattern.test(text))) {
      return `${text}\n\n[Disclaimer: This assistant provides operational insights only and does not provide medical diagnosis or treatment advice.]`;
    }
    return text;
  }

  sanitizeOutput(text: string) {
    const scrubbed = this.scrubPII(text);
    return this.blockMedicalDiagnosis(scrubbed);
  }

  sanitizeStructured<T extends Record<string, unknown>>(payload: T): T {
    const clone: Record<string, unknown> = { ...payload };
    for (const [key, value] of Object.entries(clone)) {
      if (typeof value === "string") {
        clone[key] = this.sanitizeOutput(value);
      } else if (Array.isArray(value)) {
        clone[key] = value.map((entry) =>
          typeof entry === "string" ? this.sanitizeOutput(entry) : entry,
        );
      }
    }
    return clone as T;
  }
}
