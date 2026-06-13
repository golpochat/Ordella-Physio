import { Injectable, OnModuleInit } from "@nestjs/common";
import type { ModelPricing } from "@/models/AICostProfile";
import { aiCostConfig } from "@/config/ai-cost.config";
import { CostRepository } from "@/repositories/cost.repository";

const DEFAULT_PRICING: ModelPricing = {
  promptPer1kTokens: 0.002,
  completionPer1kTokens: 0.006,
  minimumCharge: 0,
  currency: "USD",
};

@Injectable()
export class CostCalculatorService implements OnModuleInit {
  private readonly pricingCache = new Map<string, ModelPricing>();

  constructor(private readonly repository: CostRepository) {}

  async onModuleInit() {
    await this.seedDefaultProfiles();
  }

  private async seedDefaultProfiles() {
    const defaults = [
      { modelId: "gpt-4o", provider: "OPENAI", pricing: { promptPer1kTokens: 0.005, completionPer1kTokens: 0.015, minimumCharge: 0, currency: "USD" } },
      { modelId: "gpt-4o-mini", provider: "OPENAI", pricing: { promptPer1kTokens: 0.00015, completionPer1kTokens: 0.0006, minimumCharge: 0, currency: "USD" } },
      { modelId: "claude-3-5-sonnet", provider: "ANTHROPIC", pricing: { promptPer1kTokens: 0.003, completionPer1kTokens: 0.015, minimumCharge: 0, currency: "USD" } },
      { modelId: "text-embedding-3-small", provider: "OPENAI", pricing: { promptPer1kTokens: 0.00002, completionPer1kTokens: 0, minimumCharge: 0, currency: "USD" } },
      { modelId: "unknown", provider: "LOCAL", pricing: DEFAULT_PRICING },
    ];

    for (const entry of defaults) {
      const existing = await this.repository.getActiveProfile(entry.modelId);
      if (!existing) {
        await this.repository.upsertProfile(entry);
      }
      this.pricingCache.set(entry.modelId, entry.pricing);
    }
  }

  async getModelPricing(modelId: string): Promise<ModelPricing> {
    const cached = this.pricingCache.get(modelId);
    if (cached) return cached;

    const profile = await this.repository.getActiveProfile(modelId);
    if (profile) {
      const pricing = (profile.pricing as ModelPricing) ?? DEFAULT_PRICING;
      this.pricingCache.set(modelId, pricing);
      return pricing;
    }

    const fallback: ModelPricing = {
      promptPer1kTokens: aiCostConfig.defaultPromptPer1kTokens,
      completionPer1kTokens: aiCostConfig.defaultCompletionPer1kTokens,
      minimumCharge: 0,
      currency: "USD",
    };
    this.pricingCache.set(modelId, fallback);
    return fallback;
  }

  async calculateCost(modelId: string, tokensPrompt: number, tokensCompletion: number) {
    const pricing = await this.getModelPricing(modelId);
    const promptCost = (tokensPrompt / 1000) * pricing.promptPer1kTokens;
    const completionCost = (tokensCompletion / 1000) * pricing.completionPer1kTokens;
    return Math.max(pricing.minimumCharge, promptCost + completionCost);
  }

  async estimateCostForRequest(modelId: string, estimatedTokens: number) {
    const pricing = await this.getModelPricing(modelId);
    const half = estimatedTokens / 2;
    return Math.max(
      pricing.minimumCharge,
      (half / 1000) * pricing.promptPer1kTokens + (half / 1000) * pricing.completionPer1kTokens,
    );
  }

  registerPricing(modelId: string, pricing: ModelPricing) {
    this.pricingCache.set(modelId, pricing);
  }
}
