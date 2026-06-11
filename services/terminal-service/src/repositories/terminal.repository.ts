import { Injectable } from "@nestjs/common";
import type { Prisma, Terminal, TerminalStatus, TerminalType } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import type { ListTerminalSortField } from "@/models/Terminal";

export type TerminalListFilter = {
  tenantId: string;
  search?: string;
  type?: TerminalType;
  status?: TerminalStatus;
  locationId?: string;
  skip: number;
  take: number;
  sortBy: ListTerminalSortField;
  sortOrder: "asc" | "desc";
};

@Injectable()
export class TerminalRepository {
  constructor(private readonly database: DatabaseService) {}

  private buildWhereClause(
    filter: Pick<TerminalListFilter, "tenantId" | "search" | "type" | "status" | "locationId">,
  ): Prisma.TerminalWhereInput {
    const conditions: Prisma.TerminalWhereInput[] = [{ tenantId: filter.tenantId }];

    if (filter.type) {
      conditions.push({ type: filter.type });
    }

    if (filter.status) {
      conditions.push({ status: filter.status });
    }

    if (filter.locationId) {
      conditions.push({ locationId: filter.locationId });
    }

    if (filter.search) {
      conditions.push({
        OR: [
          { name: { contains: filter.search, mode: "insensitive" } },
          { code: { contains: filter.search, mode: "insensitive" } },
          { ipAddress: { contains: filter.search, mode: "insensitive" } },
          { macAddress: { contains: filter.search, mode: "insensitive" } },
        ],
      });
    }

    return { AND: conditions };
  }

  findManyFiltered(filter: TerminalListFilter): Promise<Terminal[]> {
    return this.database.terminal.findMany({
      where: this.buildWhereClause(filter),
      skip: filter.skip,
      take: filter.take,
      orderBy: { [filter.sortBy]: filter.sortOrder },
    });
  }

  countFiltered(
    filter: Pick<TerminalListFilter, "tenantId" | "search" | "type" | "status" | "locationId">,
  ): Promise<number> {
    return this.database.terminal.count({
      where: this.buildWhereClause(filter),
    });
  }

  create(data: Prisma.TerminalCreateInput): Promise<Terminal> {
    return this.database.terminal.create({ data });
  }

  findById(id: string): Promise<Terminal | null> {
    return this.database.terminal.findUnique({ where: { id } });
  }

  findByLocationAndCode(locationId: string, code: string): Promise<Terminal | null> {
    return this.database.terminal.findFirst({
      where: { locationId, code },
    });
  }

  update(id: string, data: Prisma.TerminalUpdateInput): Promise<Terminal> {
    return this.database.terminal.update({ where: { id }, data });
  }

  setStatus(id: string, status: TerminalStatus): Promise<Terminal> {
    return this.database.terminal.update({
      where: { id },
      data: { status },
    });
  }
}
