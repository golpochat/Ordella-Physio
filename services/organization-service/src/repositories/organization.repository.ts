import { Injectable } from "@nestjs/common";
import type { Organization, OrganizationStatus, Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import type { ListOrganizationSortField } from "@/models/Organization";

export type OrganizationListFilter = {
  search?: string;
  status?: OrganizationStatus;
  skip: number;
  take: number;
  sortBy: ListOrganizationSortField;
  sortOrder: "asc" | "desc";
};

@Injectable()
export class OrganizationRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    return this.database.organization.create({ data });
  }

  findByCode(code: string): Promise<Organization | null> {
    return this.database.organization.findUnique({ where: { code } });
  }

  findById(id: string): Promise<Organization | null> {
    return this.database.organization.findUnique({ where: { id } });
  }

  private buildWhereClause(filter: Pick<OrganizationListFilter, "search" | "status">): Prisma.OrganizationWhereInput {
    const conditions: Prisma.OrganizationWhereInput[] = [];

    if (filter.status) {
      conditions.push({ status: filter.status });
    }

    if (filter.search) {
      conditions.push({
        OR: [
          { name: { contains: filter.search, mode: "insensitive" } },
          { code: { contains: filter.search, mode: "insensitive" } },
          { primaryContactName: { contains: filter.search, mode: "insensitive" } },
          { primaryContactEmail: { contains: filter.search, mode: "insensitive" } },
        ],
      });
    }

    if (conditions.length === 0) {
      return {};
    }

    return { AND: conditions };
  }

  findManyFiltered(filter: OrganizationListFilter): Promise<Organization[]> {
    return this.database.organization.findMany({
      where: this.buildWhereClause(filter),
      skip: filter.skip,
      take: filter.take,
      orderBy: { [filter.sortBy]: filter.sortOrder },
    });
  }

  countFiltered(filter: Pick<OrganizationListFilter, "search" | "status">): Promise<number> {
    return this.database.organization.count({
      where: this.buildWhereClause(filter),
    });
  }

  update(id: string, data: Prisma.OrganizationUpdateInput): Promise<Organization> {
    return this.database.organization.update({ where: { id }, data });
  }

  linkTenant(organizationId: string, tenantId: string) {
    return this.database.organizationTenant.create({
      data: {
        organization: { connect: { id: organizationId } },
        tenantId,
      },
    });
  }

  unlinkTenant(organizationId: string, tenantId: string) {
    return this.database.organizationTenant.deleteMany({
      where: { organizationId, tenantId },
    });
  }

  isTenantLinked(organizationId: string, tenantId: string) {
    return this.database.organizationTenant
      .findFirst({
        where: { organizationId, tenantId },
        select: { id: true },
      })
      .then((link) => Boolean(link));
  }

  findLinkedTenantIds(organizationId: string): Promise<string[]> {
    return this.database.organizationTenant
      .findMany({
        where: { organizationId },
        select: { tenantId: true },
      })
      .then((links) => links.map((link) => link.tenantId));
  }

  setStatus(id: string, status: OrganizationStatus): Promise<Organization> {
    return this.database.organization.update({
      where: { id },
      data: { status },
    });
  }
}
