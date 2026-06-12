import type { AIProviderType } from "@/generated/prisma";
import { aiValidationError } from "@/utils/ai-errors";

const PROVIDERS: AIProviderType[] = ["OPENAI", "AZURE_OPENAI", "ANTHROPIC", "LOCAL"];

export type CreateProviderInput = {
  provider: AIProviderType;
  modelName: string;
  apiKey: string;
  baseUrl?: string;
  isActive?: boolean;
  priority?: number;
};

export type UpdateProviderInput = Partial<CreateProviderInput>;

export function validateProviderType(value: string): AIProviderType {
  const provider = value.trim().toUpperCase() as AIProviderType;
  if (!PROVIDERS.includes(provider)) {
    throw aiValidationError([{ field: "provider", message: "Invalid AI provider." }]);
  }
  return provider;
}

export function validateCreateProvider(body: Record<string, unknown>): CreateProviderInput {
  const provider = validateProviderType(String(body.provider ?? ""));
  const modelName = String(body.modelName ?? "").trim();
  const apiKey = String(body.apiKey ?? "").trim();
  const fields: Array<{ field: string; message: string }> = [];

  if (!modelName) {
    fields.push({ field: "modelName", message: "modelName is required." });
  }
  if (!apiKey) {
    fields.push({ field: "apiKey", message: "apiKey is required." });
  }

  const priority = body.priority !== undefined ? Number(body.priority) : 0;
  if (!Number.isFinite(priority)) {
    fields.push({ field: "priority", message: "priority must be a number." });
  }

  if (fields.length) {
    throw aiValidationError(fields);
  }

  return {
    provider,
    modelName,
    apiKey,
    baseUrl: body.baseUrl ? String(body.baseUrl).trim() : undefined,
    isActive: body.isActive !== false,
    priority,
  };
}

export function validateUpdateProvider(body: Record<string, unknown>): UpdateProviderInput {
  const input: UpdateProviderInput = {};

  if (body.provider !== undefined) {
    input.provider = validateProviderType(String(body.provider));
  }
  if (body.modelName !== undefined) {
    input.modelName = String(body.modelName).trim();
  }
  if (body.apiKey !== undefined) {
    input.apiKey = String(body.apiKey).trim();
  }
  if (body.baseUrl !== undefined) {
    input.baseUrl = String(body.baseUrl).trim();
  }
  if (body.isActive !== undefined) {
    input.isActive = body.isActive === true;
  }
  if (body.priority !== undefined) {
    input.priority = Number(body.priority);
  }

  return input;
}
