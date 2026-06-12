import { Injectable } from "@nestjs/common";
import { InvoiceAggregate } from "@ordella/domain";
import { randomString } from "@ordella/utils";
import type { Invoice, InvoiceItem } from "@/generated/prisma";
import type { CreateInvoiceDto } from "@/invoices/dto/create-invoice.dto";
import { InvoicesRepository } from "@/invoices/invoices.repository";
import { BillingEventPublisher } from "@/events/billing-event.publisher";
import { generateNextInvoiceNumber } from "@/utils/billing-helpers";
import { calculateInvoiceTotals } from "@/utils/invoice-calculator";
import { DEFAULT_CURRENCY } from "@/constants";
import { toInvoiceItemResponse, toInvoiceResponse } from "@/invoices/invoices.mapper";
import { validateCreateInvoice } from "@/validators/invoice.validator";
import {
  appointmentNotFoundError,
  invalidInvoiceItemError,
  invoiceTenantMismatchError,
  invoiceValidationError,
  patientNotFoundError,
  staffNotFoundError,
} from "@/utils/invoice-errors";
import { PatientServiceClient } from "@/integrations/patient-service.client";
import { StaffServiceClient } from "@/integrations/staff-service.client";
import { AppointmentServiceClient } from "@/integrations/appointment-service.client";
import { AuditLogClient } from "@/integrations/audit-log.client";
import type { AuditActorContext } from "@ordella/shared";

export type CreateInvoiceCommandInput = {
  tenantId: string;
  dto: CreateInvoiceDto;
  correlationId?: string;
  actor?: AuditActorContext;
};

@Injectable()
export class CreateInvoiceCommand {
  constructor(
    private readonly invoicesRepository: InvoicesRepository,
    private readonly eventPublisher: BillingEventPublisher,
    private readonly patientServiceClient: PatientServiceClient,
    private readonly staffServiceClient: StaffServiceClient,
    private readonly appointmentServiceClient: AppointmentServiceClient,
    private readonly auditLogClient: AuditLogClient,
  ) {}

  async execute(input: CreateInvoiceCommandInput) {
    if (!input.tenantId?.trim()) {
      throw invoiceTenantMismatchError();
    }

    const validation = validateCreateInvoice(input.dto);
    if (!validation.valid) {
      throw invoiceValidationError(validation.fields);
    }

    const patient = await this.patientServiceClient.getPatientForTenant(
      input.tenantId,
      input.dto.patientId,
    );
    if (!patient) {
      throw patientNotFoundError();
    }
    if (patient.tenantId !== input.tenantId) {
      throw invoiceTenantMismatchError();
    }

    if (input.dto.staffId) {
      const staff = await this.staffServiceClient.getStaffForTenant(
        input.tenantId,
        input.dto.staffId,
      );
      if (!staff) {
        throw staffNotFoundError();
      }
      if (staff.tenantId !== input.tenantId) {
        throw invoiceTenantMismatchError();
      }
    }

    if (input.dto.appointmentId) {
      const appointment = await this.appointmentServiceClient.getAppointmentForTenant(
        input.tenantId,
        input.dto.appointmentId,
      );
      if (!appointment) {
        throw appointmentNotFoundError();
      }
      if (appointment.tenantId !== input.tenantId) {
        throw invoiceTenantMismatchError();
      }
    }

    const items = input.dto.items;
    const currency = input.dto.currency ?? DEFAULT_CURRENCY;

    for (const item of items) {
      const lineSubtotal = item.quantity * item.unitPrice;
      const discount = item.discountAmount ?? 0;
      if (discount > lineSubtotal) {
        throw invalidInvoiceItemError("Discount amount cannot exceed line subtotal.");
      }
    }

    const totals = calculateInvoiceTotals(
      items.map((item) => ({
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        taxRate: item.taxRate,
        discountAmount: item.discountAmount,
      })),
    );

    const invoiceId = randomString(24);

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
      throw invalidInvoiceItemError(String(aggregateResult.error));
    }

    const invoiceNumber = await generateNextInvoiceNumber(
      (tenantId) => this.invoicesRepository.count(tenantId, {}),
      input.tenantId,
    );

    const invoice = await this.invoicesRepository.create(input.tenantId, {
      id: invoiceId,
      patientId: input.dto.patientId,
      staffId: input.dto.staffId,
      appointmentId: input.dto.appointmentId,
      invoiceNumber,
      status: "DRAFT",
      subtotal: totals.subtotal,
      tax: totals.taxTotal,
      discount: totals.discountTotal,
      total: totals.total,
      currency,
      dueDate: input.dto.dueDate ? new Date(input.dto.dueDate) : undefined,
      notes: input.dto.notes,
      taxRate: input.dto.taxRateId ? { connect: { id: input.dto.taxRateId } } : undefined,
      discountRef: input.dto.discountId ? { connect: { id: input.dto.discountId } } : undefined,
      items: {
        create: items.map((item, index) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          taxRate: item.taxRate,
          discountAmount: item.discountAmount ?? 0,
          total: totals.lines[index]?.lineTotal ?? item.quantity * item.unitPrice,
        })),
      },
    });

    const invoiceWithItems = (await this.invoicesRepository.findById(
      input.tenantId,
      invoice.id,
      true,
    )) as (Invoice & { items: InvoiceItem[] }) | null;

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

    if (input.actor?.userId) {
      void this.auditLogClient.logAction(
        {
          tenantId: input.tenantId,
          actorUserId: input.actor.userId,
          actorRole: input.actor.role,
          entityType: "INVOICE",
          entityId: invoice.id,
          action: "CREATE",
          metadata: {
            total: totals.total,
            patientId: invoice.patientId,
          },
        },
        {
          ipAddress: input.actor.ipAddress,
          userAgent: input.actor.userAgent,
        },
      );
    }

    const responseInvoice = toInvoiceResponse(invoiceWithItems ?? invoice);
    const responseItems = (invoiceWithItems?.items ?? []).map(toInvoiceItemResponse);

    return {
      invoice: responseInvoice,
      items: responseItems,
      message: "Invoice created successfully.",
    };
  }
}
