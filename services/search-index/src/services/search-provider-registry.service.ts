import { Injectable, OnModuleInit } from "@nestjs/common";
import type { SearchProviderName } from "@/generated/prisma";
import { ElasticsearchProvider } from "@/services/providers/elasticsearch.provider";
import { LocalSearchProvider } from "@/services/providers/local.provider";
import { MeilisearchProvider } from "@/services/providers/meilisearch.provider";
import type { SearchProviderAdapter } from "@/services/providers/search-provider.interface";
import { searchProviderError } from "@/utils/search-errors";

@Injectable()
export class SearchProviderRegistryService implements OnModuleInit {
  private readonly providers = new Map<SearchProviderName, SearchProviderAdapter>();

  constructor(
    private readonly localProvider: LocalSearchProvider,
    private readonly meilisearchProvider: MeilisearchProvider,
    private readonly elasticsearchProvider: ElasticsearchProvider,
  ) {}

  onModuleInit() {
    this.registerProvider("LOCAL", this.localProvider);
    this.registerProvider("MEILISEARCH", this.meilisearchProvider);
    this.registerProvider("ELASTICSEARCH", this.elasticsearchProvider);
  }

  registerProvider(providerName: SearchProviderName, providerInstance: SearchProviderAdapter) {
    this.providers.set(providerName, providerInstance);
  }

  getProvider(providerName: SearchProviderName): SearchProviderAdapter {
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw searchProviderError(`Provider ${providerName} is not registered.`);
    }

    return provider;
  }
}
