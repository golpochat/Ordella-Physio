import type { Prisma } from "@/generated/prisma";
import type { SearchPatientDto } from "@/patients/dto/search-patient.dto";

export function buildPatientSearchWhere(
  tenantId: string,
  query: SearchPatientDto,
): Prisma.PatientWhereInput {
  const where: Prisma.PatientWhereInput = {
    tenantId,
    deletedAt: null,
  };

  if (query.name) {
    const terms = query.name.trim().split(/\s+/);
    where.AND = terms.map((term) => ({
      OR: [
        { firstName: { contains: term, mode: "insensitive" } },
        { lastName: { contains: term, mode: "insensitive" } },
      ],
    }));
  }

  if (query.email) {
    where.email = { equals: query.email, mode: "insensitive" };
  }

  if (query.phone) {
    where.phone = query.phone;
  }

  if (query.dateOfBirth) {
    where.dateOfBirth = new Date(query.dateOfBirth);
  }

  return where;
}

export function resolvePagination(query: SearchPatientDto) {
  const page = query.page ?? 1;
  const limit = query.limit ?? 20;
  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
}
