import { Injectable } from "@nestjs/common";
import { randomString } from "@ordella/utils";
import type { CreateInvoiceItemDto } from "@/invoices/dto/create-invoice-item.dto";
import { InvoiceItemsRepository, InvoicesRepository } from "@/invoices/invoices.repository";
import { BillingEventPublisher } from "@/events/billing-event.publisher";
import { calculateLineTotal } from "@/utils/calculation-helpers";
import { toInvoiceItemResponse } from "@/invoices/invoices.mapper";

export type AddInvoiceItemCommandInput = {
  tenantId: string;
  invoiceId: string;
  dto: CreateInvoiceItemDto;
  correlationId?: string;
};

@Injectable()
export class AddInvoiceItemCommand {
  constructor(
    private readonly invoicesRepository: InvoicesRepository,
    private readonly invoiceItemsRepository: InvoiceItemsRepository,
    private readonly eventPublisher: BillingEventPublisher,
  ) {}

  async execute(input: AddInvoiceItemCommandInput) {
    const invoice = await this.invoicesRepository.findById(input.tenantId, input.invoiceId);
    if (!invoice) {
      throw new Error("Invoice not found");
    }

    const itemId = randomString(24);
    const lineTotal = calculateLineTotal(input.dto.quantity, input.dto.unitPrice);

    const item = await this.invoiceItemsRepository.create(input.invoiceId, {
      id: itemId,
      description: input.dto.description,
      quantity: input.dto.quantity,
      unitPrice: input.dto.unitPrice,
      total: lineTotal,
    });

    await this.eventPublisher.publishInvoiceItemAdded(
      {
        tenantId: input.tenantId,
        invoiceId: input.invoiceId,
        itemId: item.id,
        description: item.description,
        quantity: item.quantity,
        unitPrice: input.dto.unitPrice,
        total: lineTotal,
        createdAt: item.createdAt.toISOString(),
      },
      input.correlationId,
    );

    return toInvoiceItemResponse(item);
  }
}
