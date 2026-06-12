import { Injectable } from "@nestjs/common";
import type {
  AIProviderAdapter,
  EmbedTextInput,
  EmbedTextResult,
  GenerateJSONInput,
  GenerateJSONResult,
  GenerateTextInput,
  GenerateTextResult,
} from "@/services/providers/ai-provider.interface";
import {
  estimateTokens,
  mockEmbedding,
  mockJsonCompletion,
  mockTextCompletion,
  runWithMockLatency,
} from "@/services/providers/mock-provider.util";

@Injectable()
export class OpenAIProvider implements AIProviderAdapter {
  readonly name = "OPENAI" as const;

  async generateText(input: GenerateTextInput): Promise<GenerateTextResult> {
    const { result, latencyMs } = await runWithMockLatency(() =>
      mockTextCompletion(input.prompt, "OpenAI"),
    );

    const tokensInput = estimateTokens(input.prompt);
    const tokensOutput = estimateTokens(result);

    return { text: result, tokensInput, tokensOutput, latencyMs };
  }

  async generateJSON(input: GenerateJSONInput): Promise<GenerateJSONResult> {
    const data = mockJsonCompletion(input.prompt, input.schema);
    const raw = JSON.stringify(data);
    const tokensInput = estimateTokens(input.prompt);
    const tokensOutput = estimateTokens(raw);

    const { latencyMs } = await runWithMockLatency(() => data);

    return { data, raw, tokensInput, tokensOutput, latencyMs };
  }

  async embedText(input: EmbedTextInput): Promise<EmbedTextResult> {
    const embedding = mockEmbedding(input.text, 12);
    const tokensInput = estimateTokens(input.text);
    const { latencyMs } = await runWithMockLatency(() => embedding);

    return { embedding, tokensInput, latencyMs };
  }
}
