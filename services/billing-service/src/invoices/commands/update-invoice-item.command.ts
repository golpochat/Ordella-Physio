import { Injectable } from "@nestjs/common";
import type { UpdateInvoiceItemDto } from "@/invoices/dto/update-invoice-item.dto";
import { InvoiceItemsRepository, InvoicesRepository } from "@/invoices/invoices.repository";
import { BillingEventPublisher } from "@/events/billing-event.publisher";
import { calculateLineTotal } from "@/utils/calculation-helpers";
import { toInvoiceItemResponse } from "@/invoices/invoices.mapper";

export type UpdateInvoiceItemCommandInput = {
  tenantId: string;
  invoiceId: string;
  itemId: string;
  dto: UpdateInvoiceItemDto;
  correlationId?: string;
};

@Injectable()
export class UpdateInvoiceItemCommand {
  constructor(
    private readonly invoicesRepository: InvoicesRepository,
    private readonly invoiceItemsRepository: InvoiceItemsRepository,
    private readonly eventPublisher: BillingEventPublisher,
  ) {}

  async execute(input: UpdateInvoiceItemCommandInput) {
    const invoice = await this.invoicesRepository.findById(input.tenantId, input.invoiceId);
    if (!invoice) {
      throw new Error("Invoice not found");
    }

    const existing = await this.invoiceItemsRepository.findById(input.itemId);
    if (!existing || existing.invoiceId !== input.invoiceId) {
      throw new Error("Invoice item not found");
    }

    const quantity = input.dto.quantity ?? existing.quantity;
    const unitPrice =
      input.dto.unitPrice ??
      (typeof existing.unitPrice === "number"
        ? existing.unitPrice
        : existing.unitPrice.toNumber());
    const lineTotal = calculateLineTotal(quantity, unitPrice);

    const item = await this.invoiceItemsRepository.update(input.itemId, {
      description: input.dto.description,
      quantity: input.dto.quantity,
      unitPrice: input.dto.unitPrice,
      total: lineTotal,
    });

    await this.eventPublisher.publishInvoiceItemUpdated(
      {
        tenantId: input.tenantId,
        invoiceId: input.invoiceId,
        itemId: item.id,
        changes: input.dto as Record<string, unknown>,
        updatedAt: item.updatedAt.toISOString(),
      },
      input.correlationId,
    );

    return toInvoiceItemResponse(item);
  }
}
