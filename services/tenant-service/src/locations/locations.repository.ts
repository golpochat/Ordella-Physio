import { Injectable } from "@nestjs/common";
import type { Location, LocationStatus, Prisma } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";
import type { ListLocationSortField } from "@/models/Location";

export type LocationListFilter = {
  tenantId: string;
  search?: string;
  status?: LocationStatus;
  skip: number;
  take: number;
  sortBy: ListLocationSortField;
  sortOrder: "asc" | "desc";
};

@Injectable()
export class LocationsRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<Location, Prisma.LocationCreateInput, Prisma.LocationUpdateInput>(
      this.database.location as never,
      { tenantId },
    );
  }

  create(tenantId: string, data: Omit<Prisma.LocationCreateInput, "tenant">) {
    return this.forTenant(tenantId).create(data as Prisma.LocationCreateInput);
  }

  findByTenant(tenantId: string) {
    return this.forTenant(tenantId).findMany([]);
  }

  findActiveByTenant(tenantId: string) {
    return this.forTenant(tenantId).findMany([], { status: "ACTIVE" } as Prisma.LocationWhereInput);
  }

  private buildWhereClause(
    filter: Pick<LocationListFilter, "tenantId" | "search" | "status">,
  ): Prisma.LocationWhereInput {
    const conditions: Prisma.LocationWhereInput[] = [{ tenantId: filter.tenantId }];

    if (filter.status) {
      conditions.push({ status: filter.status });
    }

    if (filter.search) {
      conditions.push({
        OR: [
          { name: { contains: filter.search, mode: "insensitive" } },
          { code: { contains: filter.search, mode: "insensitive" } },
          { addressLine1: { contains: filter.search, mode: "insensitive" } },
          { city: { contains: filter.search, mode: "insensitive" } },
        ],
      });
    }

    return { AND: conditions };
  }

  findManyFiltered(filter: LocationListFilter): Promise<Location[]> {
    return this.database.location.findMany({
      where: this.buildWhereClause(filter),
      skip: filter.skip,
      take: filter.take,
      orderBy: { [filter.sortBy]: filter.sortOrder },
    });
  }

  countFiltered(filter: Pick<LocationListFilter, "tenantId" | "search" | "status">): Promise<number> {
    return this.database.location.count({
      where: this.buildWhereClause(filter),
    });
  }

  findByIdGlobal(locationId: string) {
    return this.database.location.findUnique({
      where: { id: locationId },
    });
  }

  findByCode(tenantId: string, code: string) {
    return this.database.location.findFirst({
      where: { tenantId, code },
    });
  }

  findById(tenantId: string, locationId: string) {
    return this.forTenant(tenantId).findById(locationId);
  }

  update(tenantId: string, locationId: string, data: Prisma.LocationUpdateInput) {
    return this.forTenant(tenantId).update(locationId, data);
  }

  setStatus(tenantId: string, locationId: string, status: "ACTIVE" | "INACTIVE") {
    return this.forTenant(tenantId).update(locationId, { status });
  }

  archive(tenantId: string, locationId: string) {
    return this.setStatus(tenantId, locationId, "INACTIVE");
  }
}
