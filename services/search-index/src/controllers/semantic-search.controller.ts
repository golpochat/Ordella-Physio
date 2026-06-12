import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { FEDERATED_INDEXES } from "@/config/search.config";
import { HybridSearchService } from "@/services/hybrid-search.service";
import { SuggestionService } from "@/services/suggestion.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedSearchUser } from "@/utils/search-user";
import { searchValidationError } from "@/utils/search-errors";
import { isSupportedIndexName } from "@/config/search.config";

@Controller("semantic-search")
export class SemanticSearchController {
  constructor(
    private readonly hybridSearchService: HybridSearchService,
    private readonly suggestionService: SuggestionService,
  ) {}

  @Get("federated")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SEARCH_QUERY)
  async federatedSemanticSearch(
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedSearchUser,
  ) {
    const searchQuery = String(query.q ?? "").trim();
    const mode = String(query.mode ?? "hybrid");
    const limit = query.limit ? Number(query.limit) : 5;
    const includeDebug = String(query.debug ?? "") === "true";

    const entries = await Promise.all(
      FEDERATED_INDEXES.map(async (indexName) => {
        const result =
          mode === "semantic"
            ? await this.hybridSearchService.semanticOnlySearch({
                tenantId: user.tenantId,
                indexName,
                query: searchQuery,
                limit,
              })
            : await this.hybridSearchService.hybridSearch({
                tenantId: user.tenantId,
                indexName,
                query: searchQuery,
                limit,
                includeDebug,
              });

        return [indexName, result.hits] as const;
      }),
    );

    return {
      grouped: Object.fromEntries(entries),
      mode,
    };
  }

  @Get(":indexName/suggestions")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SEARCH_QUERY)
  getSuggestions(
    @Param("indexName") indexName: string,
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedSearchUser,
  ) {
    if (!isSupportedIndexName(indexName)) {
      throw searchValidationError([{ field: "indexName", message: "Unsupported index name." }]);
    }

    return this.suggestionService.getSuggestions({
      tenantId: user.tenantId,
      indexName,
      query: String(query.q ?? ""),
    });
  }

  @Get(":indexName")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SEARCH_QUERY)
  semanticSearch(
    @Param("indexName") indexName: string,
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedSearchUser,
  ) {
    if (!isSupportedIndexName(indexName)) {
      throw searchValidationError([{ field: "indexName", message: "Unsupported index name." }]);
    }

    const mode = String(query.mode ?? "hybrid");
    const searchQuery = String(query.q ?? "");
    const limit = query.limit ? Number(query.limit) : undefined;
    const offset = query.offset ? Number(query.offset) : undefined;
    const includeDebug = String(query.debug ?? "") === "true";

    if (mode === "semantic") {
      return this.hybridSearchService.semanticOnlySearch({
        tenantId: user.tenantId,
        indexName,
        query: searchQuery,
        limit,
        offset,
      });
    }

    return this.hybridSearchService.hybridSearch({
      tenantId: user.tenantId,
      indexName,
      query: searchQuery,
      limit,
      offset,
      includeDebug,
    });
  }
}
