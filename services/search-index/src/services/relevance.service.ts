import { Injectable } from "@nestjs/common";
import type { SupportedIndexName } from "@/config/search.config";
import { SearchIndexConfigRepository } from "@/repositories/search-index-config.repository";
import { invalidRankingRulesError } from "@/utils/search-errors";
import { validateIndexName } from "@/validators/index.validator";

export type FieldBoostRules = Record<string, number>;

export type RankingRules = {
  exactMatchBoost: number;
  prefixMatchBoost: number;
  typoMatchBoost: number;
  fieldBoosts: FieldBoostRules;
};

export const DEFAULT_RANKING_RULES: RankingRules = {
  exactMatchBoost: 10,
  prefixMatchBoost: 5,
  typoMatchBoost: 2,
  fieldBoosts: {
    name: 5,
    label: 5,
    firstName: 5,
    lastName: 5,
    phone: 3,
    email: 3,
    tags: 2,
    invoiceNumber: 5,
    patientName: 4,
    providerName: 4,
  },
};

@Injectable()
export class RelevanceService {
  constructor(private readonly configRepository: SearchIndexConfigRepository) {}

  async getRankingRules(tenantId: string, indexName: SupportedIndexName): Promise<RankingRules> {
    const config = await this.configRepository.findByTenantAndIndex(tenantId, indexName);
    const settings = (config?.settings ?? {}) as Record<string, unknown>;
    const stored = settings.rankingRules as Partial<RankingRules> | undefined;

    return {
      ...DEFAULT_RANKING_RULES,
      ...stored,
      fieldBoosts: {
        ...DEFAULT_RANKING_RULES.fieldBoosts,
        ...(stored?.fieldBoosts ?? {}),
      },
    };
  }

  async setRankingRules(tenantId: string, indexNameInput: string, rules: Record<string, unknown>) {
    const indexName = validateIndexName(indexNameInput);
    const parsed = this.parseRankingRules(rules);
    await this.mergeSettings(tenantId, indexName, { rankingRules: parsed });
    return { message: "Ranking rules updated.", rankingRules: parsed };
  }

  private parseRankingRules(rules: Record<string, unknown>): RankingRules {
    const fields: string[] = [];

    const exactMatchBoost = Number(rules.exactMatchBoost ?? DEFAULT_RANKING_RULES.exactMatchBoost);
    const prefixMatchBoost = Number(rules.prefixMatchBoost ?? DEFAULT_RANKING_RULES.prefixMatchBoost);
    const typoMatchBoost = Number(rules.typoMatchBoost ?? DEFAULT_RANKING_RULES.typoMatchBoost);

    if ([exactMatchBoost, prefixMatchBoost, typoMatchBoost].some((value) => Number.isNaN(value) || value < 0)) {
      fields.push("boost values must be non-negative numbers");
    }

    const fieldBoostsInput = rules.fieldBoosts;
    const fieldBoosts: FieldBoostRules = { ...DEFAULT_RANKING_RULES.fieldBoosts };

    if (fieldBoostsInput && typeof fieldBoostsInput === "object" && !Array.isArray(fieldBoostsInput)) {
      for (const [field, boost] of Object.entries(fieldBoostsInput)) {
        const numericBoost = Number(boost);
        if (Number.isNaN(numericBoost) || numericBoost < 0) {
          fields.push(`fieldBoosts.${field} must be a non-negative number`);
        } else {
          fieldBoosts[field] = numericBoost;
        }
      }
    }

    if (fields.length > 0) {
      throw invalidRankingRulesError();
    }

    return {
      exactMatchBoost,
      prefixMatchBoost,
      typoMatchBoost,
      fieldBoosts,
    };
  }

  private async mergeSettings(tenantId: string, indexName: string, patch: Record<string, unknown>) {
    const existing = await this.configRepository.findByTenantAndIndex(tenantId, indexName);
    const current = (existing?.settings ?? {}) as Record<string, unknown>;

    if (existing) {
      await this.configRepository.updateSettings(existing.id, {
        ...current,
        ...patch,
      });
      return;
    }

    await this.configRepository.create({
      tenantId,
      indexName,
      provider: "LOCAL",
      settings: patch,
    });
  }
}
