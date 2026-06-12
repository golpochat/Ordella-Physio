import { Injectable } from "@nestjs/common";
import { CreateInvoiceCommand } from "@/invoices/commands/create-invoice.command";
import { UpdateInvoiceCommand } from "@/invoices/commands/update-invoice.command";
import { AddInvoiceItemCommand } from "@/invoices/commands/add-invoice-item.command";
import { UpdateInvoiceItemCommand } from "@/invoices/commands/update-invoice-item.command";
import { InvoicesRepository } from "@/invoices/invoices.repository";
import type { CreateInvoiceDto } from "@/invoices/dto/create-invoice.dto";
import type { UpdateInvoiceDto } from "@/invoices/dto/update-invoice.dto";
import type { CreateInvoiceItemDto } from "@/invoices/dto/create-invoice-item.dto";
import type { UpdateInvoiceItemDto } from "@/invoices/dto/update-invoice-item.dto";
import { toInvoiceResponse } from "@/invoices/invoices.mapper";
import { InvoiceListService } from "@/services/invoice-list.service";
import { InvoiceStatusService } from "@/services/invoice-status.service";
import type { MarkInvoicePaidDto } from "@/invoices/dto/mark-invoice-paid.dto";
import type { AuditActorContext } from "@ordella/shared";

@Injectable()
export class InvoicesService {
  constructor(
    private readonly createInvoiceCommand: CreateInvoiceCommand,
    private readonly updateInvoiceCommand: UpdateInvoiceCommand,
    private readonly addInvoiceItemCommand: AddInvoiceItemCommand,
    private readonly updateInvoiceItemCommand: UpdateInvoiceItemCommand,
    private readonly invoicesRepository: InvoicesRepository,
    private readonly invoiceListService: InvoiceListService,
    private readonly invoiceStatusService: InvoiceStatusService,
  ) {}

  create(tenantId: string, dto: CreateInvoiceDto, correlationId?: string, actor?: AuditActorContext) {
    return this.createInvoiceCommand.execute({ tenantId, dto, correlationId, actor });
  }

  async findById(tenantId: string, invoiceId: string) {
    const invoice = await this.invoicesRepository.findById(tenantId, invoiceId, true);
    return invoice ? toInvoiceResponse(invoice) : null;
  }

  async getAiContext(tenantId: string, invoiceId: string) {
    const invoice = await this.findById(tenantId, invoiceId);
    if (!invoice) {
      return null;
    }

    const related = invoice.patientId
      ? await this.invoiceListService.listInvoices(tenantId, {
          patientId: invoice.patientId,
          limit: "5",
        })
      : { data: [] };

    return {
      invoice,
      lineItems: invoice.items ?? [],
      paymentHistory: related.data ?? [],
    };
  }

  list(tenantId: string, query: Record<string, string | string[] | undefined> = {}) {
    return this.invoiceListService.listInvoices(tenantId, query);
  }

  update(
    tenantId: string,
    invoiceId: string,
    dto: UpdateInvoiceDto,
    correlationId?: string,
    actor?: AuditActorContext,
  ) {
    return this.updateInvoiceCommand.execute({ tenantId, invoiceId, dto, correlationId, actor });
  }

  addItem(
    tenantId: string,
    invoiceId: string,
    dto: CreateInvoiceItemDto,
    correlationId?: string,
  ) {
    return this.addInvoiceItemCommand.execute({ tenantId, invoiceId, dto, correlationId });
  }

  updateItem(
    tenantId: string,
    invoiceId: string,
    itemId: string,
    dto: UpdateInvoiceItemDto,
    correlationId?: string,
  ) {
    return this.updateInvoiceItemCommand.execute({
      tenantId,
      invoiceId,
      itemId,
      dto,
      correlationId,
    });
  }

  issueInvoice(
    tenantId: string,
    invoiceId: string,
    correlationId?: string,
    actor?: AuditActorContext,
  ) {
    return this.invoiceStatusService.issueInvoice(tenantId, invoiceId, correlationId, actor);
  }

  markInvoicePaid(
    tenantId: string,
    invoiceId: string,
    dto: MarkInvoicePaidDto,
    correlationId?: string,
    actor?: AuditActorContext,
  ) {
    return this.invoiceStatusService.markInvoicePaid(tenantId, invoiceId, dto, correlationId, actor);
  }

  voidInvoice(
    tenantId: string,
    invoiceId: string,
    correlationId?: string,
    actor?: AuditActorContext,
  ) {
    return this.invoiceStatusService.voidInvoice(tenantId, invoiceId, correlationId, actor);
  }
}
