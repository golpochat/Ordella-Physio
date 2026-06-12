import type { AIProviderType } from "@/generated/prisma";

export type AIProviderName = AIProviderType;

export type GenerateTextInput = {
  model: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  apiKey?: string;
  baseUrl?: string;
};

export type GenerateTextResult = {
  text: string;
  tokensInput: number;
  tokensOutput: number;
  latencyMs: number;
};

export type GenerateJSONInput = GenerateTextInput & {
  schema: Record<string, unknown>;
};

export type GenerateJSONResult = {
  data: unknown;
  raw: string;
  tokensInput: number;
  tokensOutput: number;
  latencyMs: number;
};

export type EmbedTextInput = {
  model: string;
  text: string;
  apiKey?: string;
  baseUrl?: string;
};

export type EmbedTextResult = {
  embedding: number[];
  tokensInput: number;
  latencyMs: number;
};

export interface AIProviderAdapter {
  readonly name: AIProviderName;
  generateText(input: GenerateTextInput): Promise<GenerateTextResult>;
  generateJSON(input: GenerateJSONInput): Promise<GenerateJSONResult>;
  embedText(input: EmbedTextInput): Promise<EmbedTextResult>;
}
