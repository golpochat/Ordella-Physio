import { aiValidationError } from "@/utils/ai-errors";

export type TextCompletionInput = {
  task?: string;
  prompt: string;
  template?: string;
  variables?: Record<string, string>;
  maxTokens?: number;
  temperature?: number;
  model?: string;
};

export type StructuredOutputInput = TextCompletionInput & {
  schema: Record<string, unknown>;
};

export type EmbeddingInput = {
  text: string;
  model?: string;
};

export function validateTextCompletion(body: Record<string, unknown>): TextCompletionInput {
  const prompt = String(body.prompt ?? "").trim();
  const fields: Array<{ field: string; message: string }> = [];

  if (!prompt && !body.template) {
    fields.push({ field: "prompt", message: "prompt or template is required." });
  }

  const maxTokens = body.maxTokens !== undefined ? Number(body.maxTokens) : undefined;
  if (maxTokens !== undefined && (!Number.isFinite(maxTokens) || maxTokens <= 0)) {
    fields.push({ field: "maxTokens", message: "maxTokens must be a positive number." });
  }

  const temperature = body.temperature !== undefined ? Number(body.temperature) : undefined;
  if (temperature !== undefined && (!Number.isFinite(temperature) || temperature < 0 || temperature > 2)) {
    fields.push({ field: "temperature", message: "temperature must be between 0 and 2." });
  }

  if (fields.length) {
    throw aiValidationError(fields);
  }

  return {
    task: body.task ? String(body.task) : undefined,
    prompt,
    template: body.template ? String(body.template) : undefined,
    variables:
      body.variables && typeof body.variables === "object"
        ? Object.fromEntries(
            Object.entries(body.variables as Record<string, unknown>).map(([key, value]) => [
              key,
              String(value),
            ]),
          )
        : undefined,
    maxTokens,
    temperature,
    model: body.model ? String(body.model) : undefined,
  };
}

export function validateStructuredOutput(body: Record<string, unknown>): StructuredOutputInput {
  const base = validateTextCompletion(body);
  const schema = body.schema;

  if (!schema || typeof schema !== "object" || Array.isArray(schema)) {
    throw aiValidationError([{ field: "schema", message: "schema object is required." }]);
  }

  return {
    ...base,
    schema: schema as Record<string, unknown>,
  };
}

export function validateEmbedding(body: Record<string, unknown>): EmbeddingInput {
  const text = String(body.text ?? "").trim();

  if (!text) {
    throw aiValidationError([{ field: "text", message: "text is required." }]);
  }

  return {
    text,
    model: body.model ? String(body.model) : undefined,
  };
}
