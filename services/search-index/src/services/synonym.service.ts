import { Injectable } from "@nestjs/common";
import { SearchIndexConfigRepository } from "@/repositories/search-index-config.repository";
import { validateIndexName } from "@/validators/index.validator";

export type SynonymMap = Record<string, string[]>;

@Injectable()
export class SynonymService {
  constructor(private readonly configRepository: SearchIndexConfigRepository) {}

  async getSynonyms(tenantId: string, indexName: string): Promise<SynonymMap> {
    const config = await this.configRepository.findByTenantAndIndex(tenantId, indexName);
    const settings = (config?.settings ?? {}) as Record<string, unknown>;
    return (settings.synonyms as SynonymMap | undefined) ?? {};
  }

  async getStopwords(tenantId: string, indexName: string): Promise<string[]> {
    const config = await this.configRepository.findByTenantAndIndex(tenantId, indexName);
    const settings = (config?.settings ?? {}) as Record<string, unknown>;
    return (settings.stopwords as string[] | undefined) ?? [];
  }

  async setSynonyms(tenantId: string, indexNameInput: string, synonyms: Record<string, unknown>) {
    const indexName = validateIndexName(indexNameInput);
    const parsed = this.parseSynonyms(synonyms);
    await this.mergeSettings(tenantId, indexName, { synonyms: parsed });
    return { message: "Synonyms updated.", synonyms: parsed };
  }

  async setStopwords(tenantId: string, indexNameInput: string, stopwords: unknown) {
    const indexName = validateIndexName(indexNameInput);
    const parsed = this.parseStopwords(stopwords);
    await this.mergeSettings(tenantId, indexName, { stopwords: parsed });
    return { message: "Stopwords updated.", stopwords: parsed };
  }

  expandQuery(query: string, synonyms: SynonymMap) {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    const expanded = new Set(tokens);

    for (const token of tokens) {
      for (const [canonical, aliases] of Object.entries(synonyms)) {
        const canonicalLower = canonical.toLowerCase();
        const aliasLower = aliases.map((alias) => alias.toLowerCase());
        if (token === canonicalLower || aliasLower.includes(token)) {
          expanded.add(canonicalLower);
          aliasLower.forEach((alias) => expanded.add(alias));
        }
      }
    }

    return [...expanded];
  }

  private parseSynonyms(synonyms: Record<string, unknown>): SynonymMap {
    const parsed: SynonymMap = {};

    for (const [key, value] of Object.entries(synonyms)) {
      if (!Array.isArray(value)) {
        continue;
      }

      parsed[key] = value.filter((entry): entry is string => typeof entry === "string");
    }

    return parsed;
  }

  private parseStopwords(stopwords: unknown): string[] {
    if (!Array.isArray(stopwords)) {
      return [];
    }

    return stopwords.filter((entry): entry is string => typeof entry === "string");
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
