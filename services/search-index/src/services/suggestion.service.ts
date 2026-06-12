import { Injectable } from "@nestjs/common";
import { SearchQueryLogRepository } from "@/repositories/search-query-log.repository";
import { SynonymService } from "@/services/synonym.service";
import { levenshteinDistance } from "@/utils/vector-math";
import { validateIndexName } from "@/validators/index.validator";

const AI_EXPANSION_STUB: Record<string, string[]> = {
  doc: ["doctor", "physician"],
  dr: ["doctor", "physician"],
  bill: ["invoice", "payment"],
  appt: ["appointment", "visit"],
  pt: ["patient", "physiotherapy"],
};

@Injectable()
export class SuggestionService {
  constructor(
    private readonly queryLogRepository: SearchQueryLogRepository,
    private readonly synonymService: SynonymService,
  ) {}

  async didYouMean(input: { tenantId: string; indexName: string; query: string }) {
    const indexName = validateIndexName(input.indexName);
    const query = input.query.trim().toLowerCase();
    if (!query) {
      return null;
    }

    const logs = await this.queryLogRepository.findRecentQueries(input.tenantId, indexName, 1000);
    const frequency = new Map<string, number>();
    const scores = new Map<string, number>();

    for (const log of logs) {
      const candidate = log.query.trim().toLowerCase();
      if (!candidate || candidate === query) {
        continue;
      }

      frequency.set(candidate, (frequency.get(candidate) ?? 0) + 1);
      const distance = levenshteinDistance(query, candidate);
      const maxLength = Math.max(query.length, candidate.length);
      const similarity = maxLength > 0 ? 1 - distance / maxLength : 0;

      if (similarity >= 0.55) {
        const frequencyBoost = Math.log2((frequency.get(candidate) ?? 1) + log.totalHits + 1);
        const score = similarity * frequencyBoost;
        const previous = scores.get(candidate) ?? 0;
        if (score > previous) {
          scores.set(candidate, score);
        }
      }
    }

    const candidates = scores;

    const best = [...candidates.entries()].sort((left, right) => right[1] - left[1])[0];
    if (!best) {
      return null;
    }

    return {
      original: input.query,
      suggestion: best[0],
      confidence: Number(best[1].toFixed(2)),
    };
  }

  async relatedSearches(input: { tenantId: string; indexName: string; query: string }) {
    const indexName = validateIndexName(input.indexName);
    const query = input.query.trim().toLowerCase();
    if (!query) {
      return [];
    }

    const sessions = await this.queryLogRepository.findCoOccurringQueries(
      input.tenantId,
      indexName,
      query,
    );

    return sessions
      .filter((entry) => entry.query.toLowerCase() !== query)
      .slice(0, 5)
      .map((entry) => ({
        query: entry.query,
        count: entry.count,
      }));
  }

  async queryExpansion(input: { tenantId: string; indexName: string; query: string }) {
    const indexName = validateIndexName(input.indexName);
    const synonyms = await this.synonymService.getSynonyms(input.tenantId, indexName);
    const expanded = new Set(
      this.synonymService.expandQuery(input.query, synonyms).map((token) => token.toLowerCase()),
    );

    const tokens = input.query.toLowerCase().split(/\s+/).filter(Boolean);
    for (const token of tokens) {
      const stub = AI_EXPANSION_STUB[token];
      if (stub) {
        stub.forEach((entry) => expanded.add(entry));
      }
    }

    return {
      original: input.query,
      expandedTerms: [...expanded],
    };
  }

  async getSuggestions(input: { tenantId: string; indexName: string; query: string }) {
    const [didYouMean, relatedSearches, queryExpansion] = await Promise.all([
      this.didYouMean(input),
      this.relatedSearches(input),
      this.queryExpansion(input),
    ]);

    return {
      didYouMean,
      relatedSearches,
      queryExpansion,
    };
  }
}
