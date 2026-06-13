import { Injectable } from "@nestjs/common";
import type { DatasetExportRecord } from "@/integrations/ai-dataset.client";
import type { TrainingProvider } from "@/models/AITrainingJob";

export type PreprocessedTrainingFile = {
  format: "jsonl" | "openai-jsonl" | "azure-jsonl";
  content: string;
  recordCount: number;
  fileName: string;
};

@Injectable()
export class TrainingPreprocessorService {
  cleanText(value: string): string {
    return value.replace(/\s+/g, " ").trim();
  }

  normalizeJSON(value: unknown): unknown {
    if (typeof value === "string") {
      try {
        return JSON.parse(value) as unknown;
      } catch {
        return this.cleanText(value);
      }
    }
    return value;
  }

  splitIntoChunks(text: string, maxChars = 4000): string[] {
    if (text.length <= maxChars) {
      return [text];
    }
    const chunks: string[] = [];
    for (let index = 0; index < text.length; index += maxChars) {
      chunks.push(text.slice(index, index + maxChars));
    }
    return chunks;
  }

  convertToTrainingFormat(
    records: DatasetExportRecord[],
    provider: TrainingProvider,
    modelType: "LLM" | "EMBEDDING",
  ): PreprocessedTrainingFile {
    const lines = records.map((record) => {
      const input = this.normalizeJSON(record.input);
      const output = record.output != null ? this.normalizeJSON(record.output) : null;
      const inputText =
        typeof input === "string" ? this.cleanText(input) : JSON.stringify(input);

      if (modelType === "EMBEDDING") {
        return JSON.stringify({ text: inputText, metadata: record.metadata ?? {} });
      }

      if (provider === "OPENAI" || provider === "AZURE") {
        const messages = [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: inputText },
        ];
        if (output != null) {
          messages.push({
            role: "assistant",
            content: typeof output === "string" ? output : JSON.stringify(output),
          });
        }
        return JSON.stringify({ messages });
      }

      return JSON.stringify({ input: inputText, output });
    });

    const format = provider === "LOCAL" ? "jsonl" : `${provider.toLowerCase()}-jsonl` as PreprocessedTrainingFile["format"];

    return {
      format,
      content: lines.join("\n"),
      recordCount: lines.length,
      fileName: `training-${Date.now()}.jsonl`,
    };
  }

  generateTrainingFile(
    records: DatasetExportRecord[],
    provider: TrainingProvider,
    modelType: "LLM" | "EMBEDDING",
  ): PreprocessedTrainingFile {
    const normalized = records.map((record) => ({
      input: this.normalizeJSON(record.input),
      output: record.output != null ? this.normalizeJSON(record.output) : null,
      metadata: record.metadata ?? {},
    }));

    return this.convertToTrainingFormat(normalized, provider, modelType);
  }
}
