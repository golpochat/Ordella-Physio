import { Injectable } from "@nestjs/common";
import { CostAggregationService } from "@/services/cost-aggregation.service";
import { CostCalculatorService } from "@/services/cost-calculator.service";
import { CostBudgetService } from "@/services/cost-alert.service";

const CHEAPER_ALTERNATIVES: Record<string, { modelId: string; estimatedSavingsPercent: number; reason: string }> = {
  "gpt-4o": { modelId: "gpt-4o-mini", estimatedSavingsPercent: 85, reason: "Mini variant handles most clinic tasks at lower cost." },
  "claude-3-5-sonnet": { modelId: "gpt-4o-mini", estimatedSavingsPercent: 70, reason: "Switch routine tasks to a smaller model." },
  "gpt-4": { modelId: "gpt-4o-mini", estimatedSavingsPercent: 90, reason: "Legacy model pricing is significantly higher." },
};

@Injectable()
export class CostOptimizerService {
  constructor(
    private readonly calculator: CostCalculatorService,
    private readonly aggregationService: CostAggregationService,
    private readonly budgetService: CostBudgetService,
  ) {}

  async suggestCheaperModel(modelId: string, useCase = "general") {
    const alt = CHEAPER_ALTERNATIVES[modelId];
    if (!alt) {
      return { modelId, suggestion: null, useCase };
    }
    const currentPricing = await this.calculator.getModelPricing(modelId);
    const altPricing = await this.calculator.getModelPricing(alt.modelId);
    const sampleTokens = 2000;
    const currentCost = await this.calculator.calculateCost(modelId, sampleTokens / 2, sampleTokens / 2);
    const altCost = await this.calculator.calculateCost(alt.modelId, sampleTokens / 2, sampleTokens / 2);
    return {
      modelId,
      useCase,
      suggestion: {
        ...alt,
        currentCostPer2kTokens: currentCost,
        suggestedCostPer2kTokens: altCost,
        estimatedMonthlySavings: Math.max(0, currentCost - altCost) * 500,
      },
      currentPricing,
      suggestedPricing: altPricing,
    };
  }

  async suggestMaxTokensLimit(tenantId: string) {
    const summary = await this.aggregationService.getTenantCostSummary(tenantId);
    const totalRequests = Object.values(summary.breakdownByModel).reduce((sum, m) => sum + m.requests, 0)
      + Object.values(summary.breakdownByFeature).reduce((sum, f) => sum + f.requests, 0);
    const avgTokensPerRequest = totalRequests
      ? (summary.totalTokensPrompt + summary.totalTokensCompletion) / totalRequests
      : 1000;
    const suggestedMax = Math.min(4096, Math.ceil(avgTokensPerRequest * 1.2));
    return {
      tenantId,
      currentAvgTokens: Math.round(avgTokensPerRequest),
      suggestedMaxTokens: suggestedMax,
      reason: "Cap max tokens slightly above your average to reduce runaway completions.",
      estimatedSavingsPercent: avgTokensPerRequest > 2000 ? 25 : 10,
    };
  }

  async suggestCachingStrategy(tenantId: string) {
    const byFeature = await this.aggregationService.getCostByFeature(tenantId);
    const repetitive = byFeature.filter((f) => f.requests > 50 && f.tokens / f.requests < 500);
    return {
      tenantId,
      suggestions: repetitive.map((feature) => ({
        feature: feature.feature,
        strategy: "response_cache",
        ttlMinutes: 60,
        reason: `High repeat volume (${feature.requests} requests) with moderate token size.`,
        estimatedSavingsPercent: 30,
      })),
      globalRecommendation: repetitive.length
        ? "Enable embedding + semantic cache for repeated prompts."
        : "Low repeat volume — caching may have limited impact.",
    };
  }

  async suggestTruncationRules(tenantId: string) {
    const byModel = await this.aggregationService.getCostByModel(tenantId);
    const expensive = byModel.filter((m) => m.tokens > 100_000);
    return {
      tenantId,
      rules: expensive.map((model) => ({
        modelId: model.modelId,
        maxInputTokens: 8000,
        maxOutputTokens: 1500,
        truncateStrategy: "tail",
        reason: `Model ${model.modelId} accounts for ${model.tokens.toLocaleString()} tokens this period.`,
        estimatedSavingsPercent: 15,
      })),
    };
  }

  async generateOptimizationReport(tenantId: string) {
    const [summary, byModel, budget, caching, truncation, tokenLimit] = await Promise.all([
      this.aggregationService.getTenantCostSummary(tenantId),
      this.aggregationService.getCostByModel(tenantId),
      this.budgetService.getBudgetWithUsage(tenantId),
      this.suggestCachingStrategy(tenantId),
      this.suggestTruncationRules(tenantId),
      this.suggestMaxTokensLimit(tenantId),
    ]);

    const modelSuggestions = await Promise.all(
      byModel.slice(0, 3).map((m) => this.suggestCheaperModel(m.modelId)),
    );

    const totalEstimatedSavings = modelSuggestions.reduce((sum, s) => {
      return sum + (s.suggestion?.estimatedMonthlySavings ?? 0);
    }, 0);

    return {
      tenantId,
      generatedAt: new Date().toISOString(),
      currentSpend: summary.totalCost,
      budgetStatus: budget,
      cheaperModels: modelSuggestions.filter((s) => s.suggestion),
      maxTokens: tokenLimit,
      caching,
      truncation,
      totalEstimatedMonthlySavings: totalEstimatedSavings,
    };
  }
}
