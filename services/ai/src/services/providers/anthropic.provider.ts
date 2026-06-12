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
export class AnthropicProvider implements AIProviderAdapter {
  readonly name = "ANTHROPIC" as const;

  async generateText(input: GenerateTextInput): Promise<GenerateTextResult> {
    const { result, latencyMs } = await runWithMockLatency(() =>
      mockTextCompletion(input.prompt, "Anthropic"),
    );

    return {
      text: result,
      tokensInput: estimateTokens(input.prompt),
      tokensOutput: estimateTokens(result),
      latencyMs,
    };
  }

  async generateJSON(input: GenerateJSONInput): Promise<GenerateJSONResult> {
    const data = mockJsonCompletion(input.prompt, input.schema);
    const raw = JSON.stringify(data);
    const { latencyMs } = await runWithMockLatency(() => data);

    return {
      data,
      raw,
      tokensInput: estimateTokens(input.prompt),
      tokensOutput: estimateTokens(raw),
      latencyMs,
    };
  }

  async embedText(input: EmbedTextInput): Promise<EmbedTextResult> {
    const embedding = mockEmbedding(input.text, 10);
    const { latencyMs } = await runWithMockLatency(() => embedding);

    return {
      embedding,
      tokensInput: estimateTokens(input.text),
      latencyMs,
    };
  }
}
