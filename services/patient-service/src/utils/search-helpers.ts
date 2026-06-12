import type { Prisma } from "@/generated/prisma";
import type { ListPatientSortField } from "@/models/Patient";
import type { ListPatientsQuery } from "@/validators/patient.validator";

export function buildPatientListWhere(
  tenantId: string,
  query: Pick<
    ListPatientsQuery,
    "search" | "gender" | "status" | "dobStart" | "dobEnd"
  >,
): Prisma.PatientWhereInput {
  const where: Prisma.PatientWhereInput = {
    tenantId,
    deletedAt: null,
  };

  if (query.search) {
    const term = query.search.trim();
    where.OR = [
      { firstName: { contains: term, mode: "insensitive" } },
      { lastName: { contains: term, mode: "insensitive" } },
      { email: { contains: term, mode: "insensitive" } },
      { phone: { contains: term, mode: "insensitive" } },
    ];
  }

  if (query.gender) {
    where.gender = query.gender;
  }

  if (query.status) {
    where.status = query.status;
  }

  if (query.dobStart || query.dobEnd) {
    const range: Prisma.DateTimeNullableFilter = {};
    if (query.dobStart) {
      const start = new Date(`${query.dobStart}T00:00:00.000Z`);
      range.gte = start;
    }
    if (query.dobEnd) {
      const end = new Date(`${query.dobEnd}T23:59:59.999Z`);
      range.lte = end;
    }
    where.dateOfBirth = range;
  }

  return where;
}

export function buildPatientListOrderBy(
  sortBy: ListPatientSortField,
  sortOrder: "asc" | "desc",
): Prisma.PatientOrderByWithRelationInput | Prisma.PatientOrderByWithRelationInput[] {
  if (sortBy === "lastName" || sortBy === "firstName") {
    return [{ lastName: sortOrder }, { firstName: sortOrder }];
  }

  return { [sortBy]: sortOrder };
}
