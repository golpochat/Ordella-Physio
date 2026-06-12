import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AdminController } from "@/controllers/admin.controller";
import { HealthController } from "@/controllers/health.controller";
import { IndexController } from "@/controllers/index.controller";
import { SearchController } from "@/controllers/search.controller";
import { SemanticSearchController } from "@/controllers/semantic-search.controller";
import { SearchIndexEventsConsumer } from "@/consumers/search-index-events.consumer";
import { DomainFeedClient } from "@/integrations/domain-feed.client";
import { SearchIndexConfigRepository } from "@/repositories/search-index-config.repository";
import { SearchQueryLogRepository } from "@/repositories/search-query-log.repository";
import { ElasticsearchProvider } from "@/services/providers/elasticsearch.provider";
import { LocalSearchProvider } from "@/services/providers/local.provider";
import { MeilisearchProvider } from "@/services/providers/meilisearch.provider";
import { VectorIndexConfigRepository } from "@/repositories/vector-index-config.repository";
import { EmbeddingService } from "@/services/embedding.service";
import { FederatedSearchService } from "@/services/federated-search.service";
import { HybridSearchService } from "@/services/hybrid-search.service";
import { IndexSyncService } from "@/services/index-sync.service";
import { RelevanceService } from "@/services/relevance.service";
import { SearchIndexService } from "@/services/search-index.service";
import { SearchProviderRegistryService } from "@/services/search-provider-registry.service";
import { SuggestionService } from "@/services/suggestion.service";
import { SynonymService } from "@/services/synonym.service";
import { VectorIndexService } from "@/services/vector-index.service";
import { JwtStrategy } from "@/strategies/jwt.strategy";
import { JwtGuard } from "@/guards/jwt.guard";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [
    HealthController,
    IndexController,
    SearchController,
    SemanticSearchController,
    AdminController,
  ],
  providers: [
    SearchIndexService,
    SearchProviderRegistryService,
    FederatedSearchService,
    HybridSearchService,
    EmbeddingService,
    VectorIndexService,
    SuggestionService,
    IndexSyncService,
    RelevanceService,
    SynonymService,
    DomainFeedClient,
    SearchIndexEventsConsumer,
    SearchIndexConfigRepository,
    VectorIndexConfigRepository,
    SearchQueryLogRepository,
    LocalSearchProvider,
    MeilisearchProvider,
    ElasticsearchProvider,
    JwtStrategy,
    JwtGuard,
  ],
  exports: [SearchIndexService, IndexSyncService],
})
export class SearchIndexModule {}
