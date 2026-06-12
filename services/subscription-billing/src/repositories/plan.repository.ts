import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import type { PlanRecord } from "@/models/Plan";

@Injectable()
export class PlanRepository {
  constructor(private readonly database: DatabaseService) {}

  findById(id: string): Promise<PlanRecord | null> {
    return this.database.plan.findUnique({ where: { id } });
  }

  findByName(name: string): Promise<PlanRecord | null> {
    return this.database.plan.findFirst({ where: { name } });
  }

  listActive(): Promise<PlanRecord[]> {
    return this.database.plan.findMany({
      where: { isActive: true },
      orderBy: { priceMonthly: "asc" },
    });
  }

  listAll(): Promise<PlanRecord[]> {
    return this.database.plan.findMany({ orderBy: { priceMonthly: "asc" } });
  }

  create(data: Prisma.PlanCreateInput): Promise<PlanRecord> {
    return this.database.plan.create({ data });
  }

  update(id: string, data: Prisma.PlanUpdateInput): Promise<PlanRecord> {
    return this.database.plan.update({ where: { id }, data });
  }
}
