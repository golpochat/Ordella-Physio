import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { aiNotesConfig } from "@ordella/config";

export type ChatCompletionResult = {
  content: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  modelName: string;
};

@Injectable()
export class AiProviderService {
  async complete(prompt: string): Promise<ChatCompletionResult> {
    const config = aiNotesConfig;
    if (config.aiProvider === "azure") {
      return this.completeAzure(prompt);
    }
    return this.completeOpenAi(prompt);
  }

  async transcribeAudio(audioBuffer: Buffer, filename: string): Promise<string> {
    const apiKey = aiNotesConfig.openaiApiKey;
    if (!apiKey) {
      throw new ServiceUnavailableException("OPENAI_API_KEY is not configured for transcription");
    }

    const form = new FormData();
    form.append("file", new Blob([new Uint8Array(audioBuffer)]), filename);
    form.append("model", "whisper-1");

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new ServiceUnavailableException(`Whisper transcription failed: ${error}`);
    }

    const payload = (await response.json()) as { text?: string };
    return payload.text?.trim() ?? "";
  }

  private async completeOpenAi(prompt: string): Promise<ChatCompletionResult> {
    const config = aiNotesConfig;
    const apiKey = config.openaiApiKey;
    if (!apiKey) {
      throw new ServiceUnavailableException("OPENAI_API_KEY is not configured");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: config.modelName,
        temperature: config.temperature,
        max_tokens: config.maxTokens,
        messages: [
          {
            role: "system",
            content:
              "You are a physiotherapy clinical documentation assistant. Respond with valid JSON only.",
          },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new ServiceUnavailableException(`OpenAI request failed: ${error}`);
    }

    return this.parseChatResponse(await response.json(), config.modelName);
  }

  private async completeAzure(prompt: string): Promise<ChatCompletionResult> {
    const config = aiNotesConfig;
    const apiKey = config.azureOpenaiKey;
    const endpoint = config.azureOpenaiEndpoint;
    const deployment = config.azureOpenaiDeployment;

    if (!apiKey || !endpoint || !deployment) {
      throw new ServiceUnavailableException("Azure OpenAI is not fully configured");
    }

    const url = `${endpoint.replace(/\/$/, "")}/openai/deployments/${deployment}/chat/completions?api-version=2024-02-15-preview`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        temperature: config.temperature,
        max_tokens: config.maxTokens,
        messages: [
          {
            role: "system",
            content:
              "You are a physiotherapy clinical documentation assistant. Respond with valid JSON only.",
          },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new ServiceUnavailableException(`Azure OpenAI request failed: ${error}`);
    }

    return this.parseChatResponse(await response.json(), deployment);
  }

  private parseChatResponse(payload: unknown, modelName: string): ChatCompletionResult {
    const data = payload as {
      choices?: Array<{ message?: { content?: string } }>;
      usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number };
      model?: string;
    };

    return {
      content: data.choices?.[0]?.message?.content ?? "",
      promptTokens: data.usage?.prompt_tokens ?? 0,
      completionTokens: data.usage?.completion_tokens ?? 0,
      totalTokens: data.usage?.total_tokens ?? 0,
      modelName: data.model ?? modelName,
    };
  }
}
