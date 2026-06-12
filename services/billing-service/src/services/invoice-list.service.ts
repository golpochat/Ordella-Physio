import { Injectable } from "@nestjs/common";
import type { Invoice, Prisma } from "@/generated/prisma";
import { InvoicesRepository } from "@/invoices/invoices.repository";
import { PatientServiceClient } from "@/integrations/patient-service.client";
import { StaffServiceClient } from "@/integrations/staff-service.client";
import { toInvoiceListItemResponse } from "@/invoices/invoices.mapper";
import {
  invalidInvoiceFilterError,
  invalidInvoicePaginationError,
  invoiceUpdateTenantMismatchError,
} from "@/utils/invoice-errors";
import { parseListInvoicesQuery } from "@/validators/invoice.validator";

@Injectable()
export class InvoiceListService {
  constructor(
    private readonly invoicesRepository: InvoicesRepository,
    private readonly patientServiceClient: PatientServiceClient,
    private readonly staffServiceClient: StaffServiceClient,
  ) {}

  async listInvoices(tenantId: string, query: unknown) {
    if (!tenantId?.trim()) {
      throw invoiceUpdateTenantMismatchError();
    }

    const parsed = parseListInvoicesQuery(query);
    if (!parsed.valid) {
      if (parsed.error === "INVALID_PAGINATION") {
        throw invalidInvoicePaginationError();
      }
      throw invalidInvoiceFilterError();
    }

    const {
      page,
      limit,
      search,
      patientId,
      staffId,
      status,
      dateStart,
      dateEnd,
      minTotal,
      maxTotal,
      sortBy,
      sortOrder,
    } = parsed.payload;

    const where = await this.buildWhereClause(tenantId, {
      search,
      patientId,
      staffId,
      status,
      dateStart,
      dateEnd,
      minTotal,
      maxTotal,
    });

    const orderBy: Prisma.InvoiceOrderByWithRelationInput = { [sortBy]: sortOrder };
    const skip = (page - 1) * limit;

    const [invoices, total] = await Promise.all([
      this.invoicesRepository.list(tenantId, where, { skip, take: limit, orderBy }),
      this.invoicesRepository.count(tenantId, where),
    ]);

    const uniquePatientIds = [...new Set(invoices.map((invoice) => invoice.patientId))];
    const uniqueStaffIds = [
      ...new Set(
        invoices.map((invoice) => invoice.staffId).filter((id): id is string => Boolean(id)),
      ),
    ];

    const [patients, staffMembers] = await Promise.all([
      this.patientServiceClient.getPatientSummaries(tenantId, uniquePatientIds),
      this.staffServiceClient.getStaffSummaries(tenantId, uniqueStaffIds),
    ]);

    const patientById = new Map(patients.map((patient) => [patient.id, patient]));
    const staffById = new Map(staffMembers.map((member) => [member.id, member]));

    const data = invoices.map((invoice: Invoice) => {
      const patient = patientById.get(invoice.patientId) ?? {
        id: invoice.patientId,
        firstName: "Unknown",
        lastName: "Patient",
      };
      const staff = invoice.staffId
        ? (staffById.get(invoice.staffId) ?? {
            id: invoice.staffId,
            firstName: "Unknown",
            lastName: "Staff",
          })
        : null;

      return toInvoiceListItemResponse(invoice, patient, staff);
    });

    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  private async buildWhereClause(
    tenantId: string,
    filters: {
      search?: string;
      patientId?: string;
      staffId?: string;
      status?: string;
      dateStart?: string;
      dateEnd?: string;
      minTotal?: number;
      maxTotal?: number;
    },
  ): Promise<Prisma.InvoiceWhereInput> {
    const andConditions: Prisma.InvoiceWhereInput[] = [];

    if (filters.patientId) {
      andConditions.push({ patientId: filters.patientId });
    }

    if (filters.staffId) {
      andConditions.push({ staffId: filters.staffId });
    }

    if (filters.status) {
      andConditions.push({
        status: filters.status as Prisma.EnumInvoiceStatusFilter["equals"],
      });
    }

    if (filters.dateStart || filters.dateEnd) {
      andConditions.push({
        createdAt: {
          ...(filters.dateStart ? { gte: new Date(`${filters.dateStart}T00:00:00.000Z`) } : {}),
          ...(filters.dateEnd ? { lte: new Date(`${filters.dateEnd}T23:59:59.999Z`) } : {}),
        },
      });
    }

    if (filters.minTotal !== undefined || filters.maxTotal !== undefined) {
      andConditions.push({
        total: {
          ...(filters.minTotal !== undefined ? { gte: filters.minTotal } : {}),
          ...(filters.maxTotal !== undefined ? { lte: filters.maxTotal } : {}),
        },
      });
    }

    if (filters.search) {
      const [patientIds, staffIds] = await Promise.all([
        this.patientServiceClient.searchPatientIds(tenantId, filters.search),
        this.staffServiceClient.searchStaffIds(tenantId, filters.search),
      ]);

      const searchConditions: Prisma.InvoiceWhereInput[] = [
        { invoiceNumber: { contains: filters.search, mode: "insensitive" } },
        { notes: { contains: filters.search, mode: "insensitive" } },
      ];

      if (patientIds.length > 0) {
        searchConditions.push({ patientId: { in: patientIds } });
      }

      if (staffIds.length > 0) {
        searchConditions.push({ staffId: { in: staffIds } });
      }

      andConditions.push({ OR: searchConditions });
    }

    return andConditions.length > 0 ? { AND: andConditions } : {};
  }
}
