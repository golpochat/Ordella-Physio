import { Injectable } from "@nestjs/common";
import type { PIIDetectionResult, PIIType } from "@/models/AIPIIIncident";

const PII_PATTERNS: Array<{ type: PIIType; pattern: RegExp }> = [
  { type: "EMAIL", pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g },
  { type: "PHONE", pattern: /(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/g },
  { type: "ID_NUMBER", pattern: /\b\d{3}-\d{2}-\d{4}\b|\b[A-Z]{2}\d{6,8}\b/g },
  { type: "ADDRESS", pattern: /\b\d{1,5}\s+\w+(\s+\w+){0,3}\s+(Street|St|Road|Rd|Avenue|Ave|Lane|Ln|Drive|Dr)\b/gi },
];

@Injectable()
export class PIIDetectionService {
  detect(text: string): PIIDetectionResult {
    const matches: PIIDetectionResult["matches"] = [];
    const types = new Set<PIIType>();

    for (const { type, pattern } of PII_PATTERNS) {
      const regex = new RegExp(pattern.source, pattern.flags);
      let match: RegExpExecArray | null;
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          type,
          value: match[0],
          start: match.index,
          end: match.index + match[0].length,
        });
        types.add(type);
      }
    }

    if (this.detectGenericPII(text)) {
      types.add("GENERIC");
    }

    return {
      detected: matches.length > 0 || types.has("GENERIC"),
      types: [...types],
      matches,
    };
  }

  private detectGenericPII(text: string) {
    const keywords = ["ssn", "social security", "passport", "date of birth", "dob", "national insurance"];
    const lower = text.toLowerCase();
    return keywords.some((kw) => lower.includes(kw));
  }

  detectInObject(obj: Record<string, unknown>): PIIDetectionResult {
    const text = JSON.stringify(obj);
    return this.detect(text);
  }
}
