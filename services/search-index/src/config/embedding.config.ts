import type { EmbeddingModel } from "@/generated/prisma";

export const DEFAULT_EMBEDDING_MODEL: EmbeddingModel = "LOCAL_MINILM";

export const EMBEDDING_DIMENSIONS: Record<EmbeddingModel, number> = {
  LOCAL_MINILM: 384,
  OPENAI_TEXT_EMBEDDING: 1536,
};

export const DEFAULT_LEXICAL_WEIGHT = 0.6;
export const DEFAULT_SEMANTIC_WEIGHT = 0.4;

export type EmbeddingConfig = {
  defaultModel: EmbeddingModel;
  openAiApiKey?: string;
};

export function resolveEmbeddingConfig(): EmbeddingConfig {
  const model = (process.env.DEFAULT_EMBEDDING_MODEL ?? DEFAULT_EMBEDDING_MODEL) as EmbeddingModel;

  return {
    defaultModel: model in EMBEDDING_DIMENSIONS ? model : DEFAULT_EMBEDDING_MODEL,
    openAiApiKey: process.env.OPENAI_API_KEY,
  };
}
