import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import type { SupportedIndexName } from "@/config/search.config";
import { isSupportedIndexName } from "@/config/search.config";
import { SearchQueryLogRepository } from "@/repositories/search-query-log.repository";
import { IndexSyncService } from "@/services/index-sync.service";
import { RelevanceService } from "@/services/relevance.service";
import { SynonymService } from "@/services/synonym.service";
import { VectorIndexService } from "@/services/vector-index.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedSearchUser } from "@/utils/search-user";
import { searchValidationError } from "@/utils/search-errors";

@Controller("admin")
export class AdminController {
  constructor(
    private readonly indexSyncService: IndexSyncService,
    private readonly relevanceService: RelevanceService,
    private readonly synonymService: SynonymService,
    private readonly queryLogRepository: SearchQueryLogRepository,
    private readonly vectorIndexService: VectorIndexService,
  ) {}

  @Post("reindex/:indexName")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SEARCH_ADMIN)
  reindexIndex(@Param("indexName") indexName: string, @CurrentUser() user: AuthenticatedSearchUser) {
    if (!isSupportedIndexName(indexName)) {
      throw searchValidationError([
        { field: "indexName", message: "Unsupported index name." },
      ]);
    }

    return this.indexSyncService.reindexIndex(user.tenantId, indexName as SupportedIndexName);
  }

  @Post("reindex-all")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SEARCH_ADMIN)
  reindexAll(@CurrentUser() user: AuthenticatedSearchUser) {
    return this.indexSyncService.reindexAll(user.tenantId);
  }

  @Post("ranking-rules/:indexName")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SEARCH_ADMIN)
  setRankingRules(
    @Param("indexName") indexName: string,
    @Body() body: Record<string, unknown>,
    @CurrentUser() user: AuthenticatedSearchUser,
  ) {
    return this.relevanceService.setRankingRules(user.tenantId, indexName, body);
  }

  @Post("synonyms/:indexName")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SEARCH_ADMIN)
  setSynonyms(
    @Param("indexName") indexName: string,
    @Body() body: Record<string, unknown>,
    @CurrentUser() user: AuthenticatedSearchUser,
  ) {
    return this.synonymService.setSynonyms(user.tenantId, indexName, body);
  }

  @Post("stopwords/:indexName")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SEARCH_ADMIN)
  setStopwords(
    @Param("indexName") indexName: string,
    @Body() body: Record<string, unknown>,
    @CurrentUser() user: AuthenticatedSearchUser,
  ) {
    return this.synonymService.setStopwords(user.tenantId, indexName, body.stopwords);
  }

  @Get("semantic-config/:indexName")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SEARCH_ADMIN)
  getSemanticConfig(@Param("indexName") indexName: string, @CurrentUser() user: AuthenticatedSearchUser) {
    if (!isSupportedIndexName(indexName)) {
      throw searchValidationError([{ field: "indexName", message: "Unsupported index name." }]);
    }

    return this.vectorIndexService.getVectorConfig(user.tenantId, indexName);
  }

  @Post("semantic-config/:indexName")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SEARCH_ADMIN)
  setSemanticConfig(
    @Param("indexName") indexName: string,
    @Body() body: Record<string, unknown>,
    @CurrentUser() user: AuthenticatedSearchUser,
  ) {
    if (!isSupportedIndexName(indexName)) {
      throw searchValidationError([{ field: "indexName", message: "Unsupported index name." }]);
    }

    return this.vectorIndexService.setSemanticSettings(user.tenantId, indexName, {
      semanticEnabled: body.semanticEnabled === true,
      lexicalWeight: typeof body.lexicalWeight === "number" ? body.lexicalWeight : undefined,
      semanticWeight: typeof body.semanticWeight === "number" ? body.semanticWeight : undefined,
    });
  }

  @Get("analytics")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SEARCH_ADMIN)
  getAnalytics(
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedSearchUser,
  ) {
    const dateStart = query.dateStart ? new Date(String(query.dateStart)) : undefined;
    const dateEnd = query.dateEnd ? new Date(String(query.dateEnd)) : undefined;

    return this.queryLogRepository.getAnalytics(user.tenantId, dateStart, dateEnd);
  }
}
