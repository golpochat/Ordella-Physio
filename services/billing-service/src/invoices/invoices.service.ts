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
import { toInvoiceListResponse, toInvoiceResponse } from "@/invoices/invoices.mapper";

@Injectable()
export class InvoicesService {
  constructor(
    private readonly createInvoiceCommand: CreateInvoiceCommand,
    private readonly updateInvoiceCommand: UpdateInvoiceCommand,
    private readonly addInvoiceItemCommand: AddInvoiceItemCommand,
    private readonly updateInvoiceItemCommand: UpdateInvoiceItemCommand,
    private readonly invoicesRepository: InvoicesRepository,
  ) {}

  create(tenantId: string, dto: CreateInvoiceDto, correlationId?: string) {
    return this.createInvoiceCommand.execute({ tenantId, dto, correlationId });
  }

  async findById(tenantId: string, invoiceId: string) {
    const invoice = await this.invoicesRepository.findById(tenantId, invoiceId, true);
    return invoice ? toInvoiceResponse(invoice) : null;
  }

  async list(tenantId: string, patientId?: string) {
    const invoices = await this.invoicesRepository.list(tenantId, {
      ...(patientId ? { patientId } : {}),
    });
    return toInvoiceListResponse(invoices);
  }

  update(tenantId: string, invoiceId: string, dto: UpdateInvoiceDto, correlationId?: string) {
    return this.updateInvoiceCommand.execute({ tenantId, invoiceId, dto, correlationId });
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
}
