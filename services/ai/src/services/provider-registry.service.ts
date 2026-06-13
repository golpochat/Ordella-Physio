import { Injectable, OnModuleInit } from "@nestjs/common";
import type { AIProviderType } from "@/generated/prisma";
import type { AIProviderAdapter } from "@/services/providers/ai-provider.interface";
import { AnthropicProvider } from "@/services/providers/anthropic.provider";
import { AzureOpenAIProvider } from "@/services/providers/azure-openai.provider";
import { LocalLlmProvider } from "@/services/providers/local-llm.provider";
import { OpenAIProvider } from "@/services/providers/openai.provider";
import { aiProviderNotFoundError } from "@/utils/ai-errors";

export type ModelPricing = {
  promptPer1kTokens: number;
  completionPer1kTokens: number;
  minimumCharge: number;
  currency: string;
  provider: string;
};

@Injectable()
export class ProviderRegistryService implements OnModuleInit {
  private readonly providers = new Map<AIProviderType, AIProviderAdapter>();
  private readonly deployedEndpoints = new Map<string, { region: string; endpoint: string; modelId: string; version: string }>();
  private readonly experimentModels = new Map<string, { variant: string; modelId: string }>();
  private readonly gatewayScopedModels = new Map<string, Set<string>>();
  private readonly modelPricing = new Map<string, ModelPricing>([
    ["gpt-4o", { promptPer1kTokens: 0.005, completionPer1kTokens: 0.015, minimumCharge: 0, currency: "USD", provider: "OPENAI" }],
    ["gpt-4o-mini", { promptPer1kTokens: 0.00015, completionPer1kTokens: 0.0006, minimumCharge: 0, currency: "USD", provider: "OPENAI" }],
    ["claude-3-5-sonnet", { promptPer1kTokens: 0.003, completionPer1kTokens: 0.015, minimumCharge: 0, currency: "USD", provider: "ANTHROPIC" }],
    ["text-embedding-3-small", { promptPer1kTokens: 0.00002, completionPer1kTokens: 0, minimumCharge: 0, currency: "USD", provider: "OPENAI" }],
  ]);

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

  registerDeployedEndpoint(key: string, config: { region: string; endpoint: string; modelId: string; version: string }) {
    this.deployedEndpoints.set(key, config);
  }

  getDeployedEndpoint(tenantId: string, modelId: string, region?: string) {
    const direct = this.deployedEndpoints.get(`${tenantId}:${modelId}`);
    if (direct && (!region || direct.region === region)) {
      return direct;
    }
    return [...this.deployedEndpoints.values()].find(
      (entry) => entry.modelId === modelId && (!region || entry.region === region),
    ) ?? null;
  }

  listDeployedModels(tenantId: string) {
    return [...this.deployedEndpoints.entries()]
      .filter(([key]) => key.startsWith(`${tenantId}:`))
      .map(([, value]) => value);
  }

  registerExperimentModel(key: string, variant: string, modelId: string) {
    this.experimentModels.set(key, { variant, modelId });
  }

  getExperimentModel(key: string, variant?: string) {
    const entry = this.experimentModels.get(key);
    if (!entry) return null;
    if (variant && entry.variant !== variant) return null;
    return entry;
  }

  listExperimentModels(tenantId: string) {
    return [...this.experimentModels.entries()]
      .filter(([key]) => key.startsWith(`${tenantId}:`))
      .map(([key, value]) => ({ key, ...value }));
  }

  registerGatewayModelScope(tenantId: string, modelId: string) {
    const scoped = this.gatewayScopedModels.get(tenantId) ?? new Set<string>();
    scoped.add(modelId);
    this.gatewayScopedModels.set(tenantId, scoped);
    return { registered: true, tenantId, modelId };
  }

  isModelGatewayAccessible(tenantId: string, modelId: string) {
    const scoped = this.gatewayScopedModels.get(tenantId);
    if (!scoped || scoped.size === 0) return true;
    return scoped.has(modelId);
  }

  listGatewayScopedModels(tenantId: string) {
    return [...(this.gatewayScopedModels.get(tenantId) ?? [])];
  }

  registerModelPricing(modelId: string, pricing: ModelPricing) {
    this.modelPricing.set(modelId, pricing);
    return { registered: true, modelId, pricing };
  }

  getModelPricing(modelId: string): ModelPricing {
    return this.modelPricing.get(modelId) ?? {
      promptPer1kTokens: 0.002,
      completionPer1kTokens: 0.006,
      minimumCharge: 0,
      currency: "USD",
      provider: "LOCAL",
    };
  }

  calculateModelCost(modelId: string, tokensPrompt: number, tokensCompletion: number) {
    const pricing = this.getModelPricing(modelId);
    const cost =
      (tokensPrompt / 1000) * pricing.promptPer1kTokens +
      (tokensCompletion / 1000) * pricing.completionPer1kTokens;
    return Math.max(pricing.minimumCharge, cost);
  }

  listModelPricing() {
    return [...this.modelPricing.entries()].map(([modelId, pricing]) => ({ modelId, ...pricing }));
  }
}
