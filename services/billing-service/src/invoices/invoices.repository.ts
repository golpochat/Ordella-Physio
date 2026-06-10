import { Injectable } from "@nestjs/common";
import type { Invoice, InvoiceItem, Prisma } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class InvoicesRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<Invoice, Prisma.InvoiceCreateInput, Prisma.InvoiceUpdateInput>(
      this.database.invoice as never,
      { tenantId },
    );
  }

  create(tenantId: string, data: Omit<Prisma.InvoiceCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.InvoiceCreateInput);
  }

  findById(tenantId: string, invoiceId: string, includeItems = false) {
    return this.database.invoice.findFirst({
      where: { id: invoiceId, tenantId },
      include: includeItems ? { items: true } : undefined,
    });
  }

  list(tenantId: string, where: Prisma.InvoiceWhereInput, options?: Prisma.InvoiceFindManyArgs) {
    return this.database.invoice.findMany({
      where: { ...where, tenantId },
      ...options,
    });
  }

  count(tenantId: string, where: Prisma.InvoiceWhereInput) {
    return this.database.invoice.count({
      where: { ...where, tenantId },
    });
  }

  update(tenantId: string, invoiceId: string, data: Prisma.InvoiceUpdateInput) {
    return this.forTenant(tenantId).update(invoiceId, data);
  }
}

@Injectable()
export class InvoiceItemsRepository {
  constructor(private readonly database: DatabaseService) {}

  create(invoiceId: string, data: Omit<Prisma.InvoiceItemCreateInput, "invoice">) {
    return this.database.invoiceItem.create({
      data: {
        ...data,
        invoice: { connect: { id: invoiceId } },
      },
    });
  }

  findById(itemId: string) {
    return this.database.invoiceItem.findUnique({
      where: { id: itemId },
      include: { invoice: true },
    });
  }

  listByInvoice(invoiceId: string) {
    return this.database.invoiceItem.findMany({
      where: { invoiceId },
      orderBy: { createdAt: "asc" },
    });
  }

  update(itemId: string, data: Prisma.InvoiceItemUpdateInput) {
    return this.database.invoiceItem.update({
      where: { id: itemId },
      data,
    });
  }

  delete(itemId: string) {
    return this.database.invoiceItem.delete({
      where: { id: itemId },
    });
  }
}
