import { Injectable } from "@nestjs/common";
import type { UpdateInvoiceDto } from "@/invoices/dto/update-invoice.dto";
import { InvoicesRepository } from "@/invoices/invoices.repository";
import { BillingEventPublisher } from "@/events/billing-event.publisher";
import { toInvoiceResponse } from "@/invoices/invoices.mapper";

export type UpdateInvoiceCommandInput = {
  tenantId: string;
  invoiceId: string;
  dto: UpdateInvoiceDto;
  correlationId?: string;
};

@Injectable()
export class UpdateInvoiceCommand {
  constructor(
    private readonly invoicesRepository: InvoicesRepository,
    private readonly eventPublisher: BillingEventPublisher,
  ) {}

  async execute(input: UpdateInvoiceCommandInput) {
    const invoice = await this.invoicesRepository.update(input.tenantId, input.invoiceId, {
      patientId: input.dto.patientId,
      appointmentId: input.dto.appointmentId,
      currency: input.dto.currency,
      dueDate: input.dto.dueDate ? new Date(input.dto.dueDate) : undefined,
      notes: input.dto.notes,
      status: input.dto.status,
      taxRate: input.dto.taxRateId ? { connect: { id: input.dto.taxRateId } } : undefined,
      discountRef: input.dto.discountId ? { connect: { id: input.dto.discountId } } : undefined,
    });

    await this.eventPublisher.publishInvoiceUpdated(
      {
        tenantId: input.tenantId,
        invoiceId: invoice.id,
        changes: input.dto as Record<string, unknown>,
        updatedAt: invoice.updatedAt.toISOString(),
      },
      input.correlationId,
    );

    return toInvoiceResponse(invoice);
  }
}
