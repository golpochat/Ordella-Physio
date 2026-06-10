import { Injectable } from "@nestjs/common";
import { InvoiceAggregate } from "@ordella/domain";
import { randomString } from "@ordella/utils";
import type { CreateInvoiceDto } from "@/invoices/dto/create-invoice.dto";
import { InvoicesRepository } from "@/invoices/invoices.repository";
import { BillingEventPublisher } from "@/events/billing-event.publisher";
import {
  generateInvoiceNumber,
  validateAppointmentReferencePlaceholder,
  validatePatientReferencePlaceholder,
} from "@/utils/billing-helpers";
import { calculateInvoiceTotals } from "@/utils/calculation-helpers";
import { DEFAULT_CURRENCY } from "@/constants";
import { toInvoiceResponse } from "@/invoices/invoices.mapper";

export type CreateInvoiceCommandInput = {
  tenantId: string;
  dto: CreateInvoiceDto;
  correlationId?: string;
};

@Injectable()
export class CreateInvoiceCommand {
  constructor(
    private readonly invoicesRepository: InvoicesRepository,
    private readonly eventPublisher: BillingEventPublisher,
  ) {}

  async execute(input: CreateInvoiceCommandInput) {
    const invoiceId = randomString(24);
    await validatePatientReferencePlaceholder(input.dto.patientId);

    if (input.dto.appointmentId) {
      await validateAppointmentReferencePlaceholder(input.dto.appointmentId);
    }

    const items = input.dto.items ?? [];
    const currency = input.dto.currency ?? DEFAULT_CURRENCY;

    const aggregateResult = InvoiceAggregate.create({
      id: invoiceId,
      tenantId: input.tenantId,
      patientId: input.dto.patientId,
      currency,
      items: items.map((item) => ({
        id: randomString(24),
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      correlationId: input.correlationId,
    });

    if (aggregateResult.isFailure) {
      throw new Error(String(aggregateResult.error));
    }

    const totals = calculateInvoiceTotals({
      items: items.map((item) => ({
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
    });

    const invoice = await this.invoicesRepository.create(input.tenantId, {
      id: invoiceId,
      patientId: input.dto.patientId,
      appointmentId: input.dto.appointmentId,
      invoiceNumber: generateInvoiceNumber(),
      status: "DRAFT",
      subtotal: totals.subtotal,
      tax: totals.tax,
      discount: totals.discount,
      total: totals.total,
      currency,
      dueDate: input.dto.dueDate ? new Date(input.dto.dueDate) : undefined,
      notes: input.dto.notes,
      taxRate: input.dto.taxRateId ? { connect: { id: input.dto.taxRateId } } : undefined,
      discountRef: input.dto.discountId ? { connect: { id: input.dto.discountId } } : undefined,
      items: {
        create: items.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.quantity * item.unitPrice,
        })),
      },
    });

    await this.eventPublisher.publishInvoiceCreated(
      {
        tenantId: input.tenantId,
        invoiceId: invoice.id,
        patientId: invoice.patientId,
        invoiceNumber: invoice.invoiceNumber,
        status: invoice.status,
        total: totals.total,
        currency: invoice.currency,
        createdAt: invoice.createdAt.toISOString(),
      },
      input.correlationId,
    );

    return toInvoiceResponse(invoice);
  }
}
