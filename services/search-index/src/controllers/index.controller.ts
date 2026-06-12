import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { SearchIndexService } from "@/services/search-index.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedSearchUser } from "@/utils/search-user";

@Controller("index")
export class IndexController {
  constructor(private readonly searchIndexService: SearchIndexService) {}

  @Post(":indexName")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SEARCH_INDEX)
  indexDocument(
    @Param("indexName") indexName: string,
    @Body() body: Record<string, unknown>,
    @CurrentUser() user: AuthenticatedSearchUser,
  ) {
    return this.searchIndexService.indexDocument({
      tenantId: user.tenantId,
      indexName,
      body,
    });
  }

  @Put(":indexName/:id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SEARCH_INDEX)
  updateDocument(
    @Param("indexName") indexName: string,
    @Param("id") id: string,
    @Body() body: Record<string, unknown>,
    @CurrentUser() user: AuthenticatedSearchUser,
  ) {
    const documentSource =
      body.document && typeof body.document === "object" && !Array.isArray(body.document)
        ? (body.document as Record<string, unknown>)
        : body;

    return this.searchIndexService.updateDocument({
      tenantId: user.tenantId,
      indexName,
      document: {
        ...documentSource,
        id,
      },
    });
  }

  @Delete(":indexName/:id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SEARCH_INDEX)
  deleteDocument(
    @Param("indexName") indexName: string,
    @Param("id") id: string,
    @CurrentUser() user: AuthenticatedSearchUser,
  ) {
    return this.searchIndexService.deleteDocument({
      tenantId: user.tenantId,
      indexName,
      documentId: id,
    });
  }
}
