export type AIProviderType = "OPENAI" | "AZURE_OPENAI" | "ANTHROPIC" | "LOCAL";

export type AIProviderConfig = {
  id: string;
  tenantId: string;
  provider: AIProviderType;
  modelName: string;
  baseUrl: string | null;
  isActive: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
};

export type AITextResult = {
  task: string;
  provider: string;
  model: string;
  text: string;
  tokensInput: number;
  tokensOutput: number;
  latencyMs: number;
};

export type AIStructuredResult = {
  task: string;
  provider: string;
  model: string;
  data: Record<string, unknown>;
  tokensInput: number;
  tokensOutput: number;
  latencyMs: number;
};

export type AIEmbedResult = {
  provider: string;
  model: string;
  embedding: number[];
  dimensions: number;
  tokensInput: number;
  latencyMs: number;
};
