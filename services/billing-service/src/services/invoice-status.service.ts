import { Injectable } from "@nestjs/common";
import type { Invoice } from "@/generated/prisma";
import { InvoicesRepository } from "@/invoices/invoices.repository";
import { BillingEventPublisher } from "@/events/billing-event.publisher";
import { PaymentServiceClient } from "@/integrations/payment-service.client";
import { AuditLogClient } from "@/integrations/audit-log.client";
import { toInvoiceResponse } from "@/invoices/invoices.mapper";
import type { AuditActorContext } from "@ordella/shared";
import {
  cannotVoidPaidInvoiceError,
  invalidInvoiceStatusTransitionError,
  invoiceAlreadyVoidError,
  invoiceNotFoundError,
  invoiceUpdateTenantMismatchError,
} from "@/utils/invoice-errors";

export type MarkInvoicePaidPayload = {
  paymentReference?: string;
};

@Injectable()
export class InvoiceStatusService {
  constructor(
    private readonly invoicesRepository: InvoicesRepository,
    private readonly eventPublisher: BillingEventPublisher,
    private readonly paymentServiceClient: PaymentServiceClient,
    private readonly auditLogClient: AuditLogClient,
  ) {}

  async issueInvoice(
    tenantId: string,
    invoiceId: string,
    correlationId?: string,
    actor?: AuditActorContext,
  ) {
    const invoice = await this.requireInvoice(tenantId, invoiceId);

    if (invoice.status !== "DRAFT") {
      throw invalidInvoiceStatusTransitionError();
    }

    const issuedAt = new Date();
    const updated = await this.invoicesRepository.update(tenantId, invoiceId, {
      status: "ISSUED",
      issuedAt,
    });

    await this.eventPublisher.publishInvoiceIssued(
      {
        tenantId,
        invoiceId: updated.id,
        patientId: updated.patientId,
        invoiceNumber: updated.invoiceNumber,
        status: updated.status,
        total: this.toAmount(updated.total),
        currency: updated.currency,
        issuedAt: issuedAt.toISOString(),
      },
      correlationId,
    );

    if (actor?.userId) {
      void this.auditLogClient.logAction(
        {
          tenantId,
          actorUserId: actor.userId,
          actorRole: actor.role,
          entityType: "INVOICE",
          entityId: updated.id,
          action: "STATUS_CHANGE",
          metadata: { from: "DRAFT", to: "ISSUED" },
        },
        { ipAddress: actor.ipAddress, userAgent: actor.userAgent },
      );
    }

    return {
      invoice: toInvoiceResponse(updated),
      message: "Invoice issued successfully.",
    };
  }

  async markInvoicePaid(
    tenantId: string,
    invoiceId: string,
    payload: MarkInvoicePaidPayload = {},
    correlationId?: string,
    actor?: AuditActorContext,
  ) {
    const invoice = await this.requireInvoice(tenantId, invoiceId);

    if (invoice.status !== "ISSUED") {
      throw invalidInvoiceStatusTransitionError();
    }

    const paidAt = new Date();
    const updated = await this.invoicesRepository.update(tenantId, invoiceId, {
      status: "PAID",
      paidAt,
      paymentReference: payload.paymentReference?.trim() || null,
    });

    const paidEvent = {
      tenantId,
      invoiceId: updated.id,
      patientId: updated.patientId,
      invoiceNumber: updated.invoiceNumber,
      status: updated.status,
      total: this.toAmount(updated.total),
      currency: updated.currency,
      paymentReference: updated.paymentReference,
      paidAt: paidAt.toISOString(),
    };

    await this.eventPublisher.publishInvoicePaid(paidEvent, correlationId);

    await this.paymentServiceClient.notifyInvoicePaid({
      tenantId,
      invoiceId: updated.id,
      invoiceNumber: updated.invoiceNumber,
      patientId: updated.patientId,
      total: paidEvent.total,
      currency: updated.currency,
      paymentReference: updated.paymentReference,
      paidAt: paidAt.toISOString(),
    });

    if (actor?.userId) {
      void this.auditLogClient.logAction(
        {
          tenantId,
          actorUserId: actor.userId,
          actorRole: actor.role,
          entityType: "INVOICE",
          entityId: updated.id,
          action: "STATUS_CHANGE",
          metadata: {
            from: "ISSUED",
            to: "PAID",
            total: paidEvent.total,
          },
        },
        { ipAddress: actor.ipAddress, userAgent: actor.userAgent },
      );
    }

    return {
      invoice: toInvoiceResponse(updated),
      message: "Invoice marked as paid.",
    };
  }

  async voidInvoice(
    tenantId: string,
    invoiceId: string,
    correlationId?: string,
    actor?: AuditActorContext,
  ) {
    const invoice = await this.requireInvoice(tenantId, invoiceId);

    if (invoice.status === "PAID") {
      throw cannotVoidPaidInvoiceError();
    }

    if (invoice.status === "VOIDED") {
      throw invoiceAlreadyVoidError();
    }

    const voidedAt = new Date();
    const updated = await this.invoicesRepository.update(tenantId, invoiceId, {
      status: "VOIDED",
    });

    await this.eventPublisher.publishInvoiceVoided(
      {
        tenantId,
        invoiceId: updated.id,
        patientId: updated.patientId,
        invoiceNumber: updated.invoiceNumber,
        status: updated.status,
        total: this.toAmount(updated.total),
        currency: updated.currency,
        voidedAt: voidedAt.toISOString(),
      },
      correlationId,
    );

    if (actor?.userId) {
      void this.auditLogClient.logAction(
        {
          tenantId,
          actorUserId: actor.userId,
          actorRole: actor.role,
          entityType: "INVOICE",
          entityId: updated.id,
          action: "STATUS_CHANGE",
          metadata: { from: invoice.status, to: "VOIDED" },
        },
        { ipAddress: actor.ipAddress, userAgent: actor.userAgent },
      );
    }

    return {
      invoice: toInvoiceResponse(updated),
      message: "Invoice voided successfully.",
    };
  }

  private async requireInvoice(tenantId: string, invoiceId: string): Promise<Invoice> {
    if (!tenantId?.trim()) {
      throw invoiceUpdateTenantMismatchError();
    }

    const invoice = await this.invoicesRepository.findById(tenantId, invoiceId);
    if (!invoice) {
      throw invoiceNotFoundError();
    }

    if (invoice.tenantId !== tenantId) {
      throw invoiceUpdateTenantMismatchError();
    }

    return invoice;
  }

  private toAmount(value: Invoice["total"]): number {
    return typeof value === "number" ? value : value.toNumber();
  }
}
