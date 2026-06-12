import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { FederatedSearchService } from "@/services/federated-search.service";
import { SearchIndexService } from "@/services/search-index.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedSearchUser } from "@/utils/search-user";

@Controller("search")
export class SearchController {
  constructor(
    private readonly searchIndexService: SearchIndexService,
    private readonly federatedSearchService: FederatedSearchService,
  ) {}

  @Get("federated")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SEARCH_QUERY)
  federatedSearch(
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedSearchUser,
  ) {
    const mode = String(query.mode ?? "grouped");
    const searchQuery = String(query.q ?? "");

    if (mode === "top") {
      return this.federatedSearchService.searchTopHits({
        tenantId: user.tenantId,
        query: searchQuery,
        perIndex: query.limit ? Number(query.limit) : undefined,
      });
    }

    return this.federatedSearchService.searchAll({
      tenantId: user.tenantId,
      query: searchQuery,
      limit: query.limit ? Number(query.limit) : undefined,
    });
  }

  @Get(":indexName/autocomplete")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SEARCH_QUERY)
  autocomplete(
    @Param("indexName") indexName: string,
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedSearchUser,
  ) {
    return this.searchIndexService.autocomplete({
      tenantId: user.tenantId,
      indexName,
      prefix: String(query.prefix ?? ""),
      limit: query.limit ? Number(query.limit) : undefined,
    });
  }

  @Get(":indexName")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SEARCH_QUERY)
  search(
    @Param("indexName") indexName: string,
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedSearchUser,
  ) {
    return this.searchIndexService.search({
      tenantId: user.tenantId,
      indexName,
      query: String(query.q ?? ""),
      limit: query.limit ? Number(query.limit) : undefined,
      offset: query.offset ? Number(query.offset) : undefined,
      filters: query.filters ? String(query.filters) : undefined,
    });
  }
}
