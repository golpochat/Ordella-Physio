import { Injectable } from "@nestjs/common";
import type { Prisma, Staff, StaffLocation, StaffStatus, StaffType } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import type { ListStaffSortField } from "@/models/Staff";

export type StaffListFilter = {
  tenantId: string;
  search?: string;
  staffType?: StaffType;
  roleId?: string;
  locationId?: string;
  status?: StaffStatus;
  skip: number;
  take: number;
  sortBy: ListStaffSortField;
  sortOrder: "asc" | "desc";
};

export type CreateStaffInput = {
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  staffType: StaffType;
  roleId: string;
  status: StaffStatus;
  locationIds: string[];
};

export type UpdateStaffInput = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string | null;
  staffType?: StaffType;
  roleId?: string;
  status?: StaffStatus;
  locationIds?: string[];
};

@Injectable()
export class StaffRepository {
  constructor(private readonly database: DatabaseService) {}

  private buildWhereClause(
    filter: Pick<
      StaffListFilter,
      "tenantId" | "search" | "staffType" | "roleId" | "locationId" | "status"
    >,
  ): Prisma.StaffWhereInput {
    const conditions: Prisma.StaffWhereInput[] = [{ tenantId: filter.tenantId }];

    if (filter.staffType) {
      conditions.push({ staffType: filter.staffType });
    }

    if (filter.roleId) {
      conditions.push({ roleId: filter.roleId });
    }

    if (filter.status) {
      conditions.push({ status: filter.status });
    }

    if (filter.locationId) {
      conditions.push({
        locations: {
          some: { locationId: filter.locationId },
        },
      });
    }

    if (filter.search) {
      conditions.push({
        OR: [
          { firstName: { contains: filter.search, mode: "insensitive" } },
          { lastName: { contains: filter.search, mode: "insensitive" } },
          { email: { contains: filter.search, mode: "insensitive" } },
          { phone: { contains: filter.search, mode: "insensitive" } },
        ],
      });
    }

    return { AND: conditions };
  }

  findManyFiltered(filter: StaffListFilter) {
    return this.database.staff.findMany({
      where: this.buildWhereClause(filter),
      include: { locations: true },
      skip: filter.skip,
      take: filter.take,
      orderBy: { [filter.sortBy]: filter.sortOrder },
    });
  }

  countFiltered(
    filter: Pick<
      StaffListFilter,
      "tenantId" | "search" | "staffType" | "roleId" | "locationId" | "status"
    >,
  ): Promise<number> {
    return this.database.staff.count({
      where: this.buildWhereClause(filter),
    });
  }

  findById(id: string) {
    return this.database.staff.findUnique({
      where: { id },
      include: { locations: true },
    });
  }

  findByTenantAndEmail(tenantId: string, email: string): Promise<Staff | null> {
    return this.database.staff.findUnique({
      where: {
        tenantId_email: { tenantId, email },
      },
    });
  }

  createStaffWithLocations(input: CreateStaffInput): Promise<{ staff: Staff; locations: StaffLocation[] }> {
    return this.database.$transaction(async (tx) => {
      const staff = await tx.staff.create({
        data: {
          tenantId: input.tenantId,
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          staffType: input.staffType,
          roleId: input.roleId,
          status: input.status,
        },
      });

      const locations = await Promise.all(
        input.locationIds.map((locationId) =>
          tx.staffLocation.create({
            data: {
              staffId: staff.id,
              locationId,
            },
          }),
        ),
      );

      return { staff, locations };
    });
  }

  updateStaffWithLocations(
    id: string,
    input: UpdateStaffInput,
  ): Promise<{ staff: Staff; locations: StaffLocation[] }> {
    return this.database.$transaction(async (tx) => {
      const staff = await tx.staff.update({
        where: { id },
        data: {
          ...(input.firstName !== undefined ? { firstName: input.firstName } : {}),
          ...(input.lastName !== undefined ? { lastName: input.lastName } : {}),
          ...(input.email !== undefined ? { email: input.email } : {}),
          ...(input.phone !== undefined ? { phone: input.phone } : {}),
          ...(input.staffType !== undefined ? { staffType: input.staffType } : {}),
          ...(input.roleId !== undefined ? { roleId: input.roleId } : {}),
          ...(input.status !== undefined ? { status: input.status } : {}),
        },
      });

      let locations: StaffLocation[];
      if (input.locationIds !== undefined) {
        await tx.staffLocation.deleteMany({ where: { staffId: id } });
        locations = await Promise.all(
          input.locationIds.map((locationId) =>
            tx.staffLocation.create({
              data: {
                staffId: id,
                locationId,
              },
            }),
          ),
        );
      } else {
        locations = await tx.staffLocation.findMany({ where: { staffId: id } });
      }

      return { staff, locations };
    });
  }

  setStatus(id: string, status: StaffStatus): Promise<Staff> {
    return this.database.staff.update({
      where: { id },
      data: { status },
    });
  }
}
