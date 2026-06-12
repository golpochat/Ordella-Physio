import { Injectable, OnModuleInit } from "@nestjs/common";
import type { AIProviderType } from "@/generated/prisma";
import type { AIProviderAdapter } from "@/services/providers/ai-provider.interface";
import { AnthropicProvider } from "@/services/providers/anthropic.provider";
import { AzureOpenAIProvider } from "@/services/providers/azure-openai.provider";
import { LocalLlmProvider } from "@/services/providers/local-llm.provider";
import { OpenAIProvider } from "@/services/providers/openai.provider";
import { aiProviderNotFoundError } from "@/utils/ai-errors";

@Injectable()
export class ProviderRegistryService implements OnModuleInit {
  private readonly providers = new Map<AIProviderType, AIProviderAdapter>();

  constructor(
    private readonly openAiProvider: OpenAIProvider,
    private readonly azureOpenAiProvider: AzureOpenAIProvider,
    private readonly anthropicProvider: AnthropicProvider,
    private readonly localLlmProvider: LocalLlmProvider,
  ) {}

  onModuleInit() {
    this.registerProvider("OPENAI", this.openAiProvider);
    this.registerProvider("AZURE_OPENAI", this.azureOpenAiProvider);
    this.registerProvider("ANTHROPIC", this.anthropicProvider);
    this.registerProvider("LOCAL", this.localLlmProvider);
  }

  registerProvider(providerName: AIProviderType, providerInstance: AIProviderAdapter) {
    this.providers.set(providerName, providerInstance);
  }

  getProvider(providerName: AIProviderType) {
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw aiProviderNotFoundError(`Provider ${providerName} is not registered.`);
    }
    return provider;
  }

  listProviders() {
    return [...this.providers.keys()];
  }
}
