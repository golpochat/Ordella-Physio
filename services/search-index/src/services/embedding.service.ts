import { Injectable, Logger } from "@nestjs/common";
import type { SupportedIndexName } from "@/config/search.config";
import {
  DEFAULT_EMBEDDING_MODEL,
  EMBEDDING_DIMENSIONS,
  resolveEmbeddingConfig,
} from "@/config/embedding.config";
import type { EmbeddingModel } from "@/generated/prisma";
import { normalizeVector } from "@/utils/vector-math";
import { embeddingProviderError } from "@/utils/search-errors";

export type EmbedTextOptions = {
  model?: EmbeddingModel;
  dimensions?: number;
};

@Injectable()
export class EmbeddingService {
  private readonly logger = new Logger(EmbeddingService.name);

  embedText(text: string, options: EmbedTextOptions = {}): number[] {
    const config = resolveEmbeddingConfig();
    const model = options.model ?? config.defaultModel ?? DEFAULT_EMBEDDING_MODEL;
    const dimensions = options.dimensions ?? EMBEDDING_DIMENSIONS[model] ?? 384;

    try {
      if (model === "OPENAI_TEXT_EMBEDDING" && config.openAiApiKey) {
        this.logger.warn("OpenAI embedding requested but sync client is not configured; using deterministic fallback.");
      }

      return this.hashTextToVector(text, dimensions);
    } catch (error) {
      this.logger.warn(
        "Embedding generation failed",
        error instanceof Error ? error.message : error,
      );
      throw embeddingProviderError();
    }
  }

  embedDocument(indexName: SupportedIndexName, document: Record<string, unknown>): number[] {
    return this.embedText(this.buildDocumentText(indexName, document));
  }

  buildDocumentText(indexName: SupportedIndexName, document: Record<string, unknown>): string {
    switch (indexName) {
      case "patients":
        return [
          document.name,
          document.email,
          document.phone,
          ...(Array.isArray(document.tags) ? document.tags : []),
        ]
          .filter(Boolean)
          .join(" ");
      case "appointments":
        return [
          document.patientName,
          document.providerName,
          document.staffName,
          document.notes,
          document.label,
          document.searchableText,
        ]
          .filter(Boolean)
          .join(" ");
      case "invoices":
        return [
          document.patientName,
          document.invoiceNumber,
          document.notes,
          document.label,
          document.searchableText,
        ]
          .filter(Boolean)
          .join(" ");
      case "staff":
        return [
          document.name,
          document.email,
          document.phone,
          document.role,
          document.label,
          document.searchableText,
        ]
          .filter(Boolean)
          .join(" ");
      default:
        return String(document.searchableText ?? document.label ?? document.id ?? "");
    }
  }

  private hashTextToVector(text: string, dimensions: number): number[] {
    const vector = new Array<number>(dimensions).fill(0);
    const normalized = text.toLowerCase().trim();

    if (!normalized) {
      return vector;
    }

    const tokens = normalized.split(/\s+/).filter(Boolean);
    for (const token of tokens) {
      for (let index = 0; index < token.length; index += 1) {
        const charCode = token.charCodeAt(index);
        const slot = (charCode * (index + 1) * token.length) % dimensions;
        vector[slot] += charCode / 255;
      }
    }

    for (let index = 0; index < normalized.length; index += 1) {
      const charCode = normalized.charCodeAt(index);
      const slot = (charCode * (index + 7)) % dimensions;
      vector[slot] += 0.01;
    }

    return normalizeVector(vector);
  }
}
