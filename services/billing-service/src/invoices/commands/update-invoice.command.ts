import { Injectable } from "@nestjs/common";
import { randomString } from "@ordella/utils";
import type { Invoice, InvoiceItem, InvoiceStatus } from "@/generated/prisma";
import type { UpdateInvoiceDto } from "@/invoices/dto/update-invoice.dto";
import { InvoicesRepository } from "@/invoices/invoices.repository";
import { BillingEventPublisher } from "@/events/billing-event.publisher";
import { DatabaseService } from "@/database/database.module";
import { calculateInvoiceTotals } from "@/utils/invoice-calculator";
import { toInvoiceItemResponse, toInvoiceResponse } from "@/invoices/invoices.mapper";
import { validateUpdateInvoice } from "@/validators/invoice.validator";
import {
  appointmentNotFoundError,
  cannotEditFinalizedInvoiceError,
  invalidInvoiceItemError,
  invoiceNotFoundError,
  invoiceUpdateTenantMismatchError,
  invoiceValidationError,
  patientNotFoundError,
  staffNotFoundError,
} from "@/utils/invoice-errors";
import { PatientServiceClient } from "@/integrations/patient-service.client";
import { StaffServiceClient } from "@/integrations/staff-service.client";
import { AppointmentServiceClient } from "@/integrations/appointment-service.client";
import { AuditLogClient } from "@/integrations/audit-log.client";
import type { AuditActorContext } from "@ordella/shared";

export type UpdateInvoiceCommandInput = {
  tenantId: string;
  invoiceId: string;
  dto: UpdateInvoiceDto;
  correlationId?: string;
  actor?: AuditActorContext;
};

const FINALIZED_STATUSES: InvoiceStatus[] = ["PAID", "VOIDED"];

@Injectable()
export class UpdateInvoiceCommand {
  constructor(
    private readonly invoicesRepository: InvoicesRepository,
    private readonly database: DatabaseService,
    private readonly eventPublisher: BillingEventPublisher,
    private readonly patientServiceClient: PatientServiceClient,
    private readonly staffServiceClient: StaffServiceClient,
    private readonly appointmentServiceClient: AppointmentServiceClient,
    private readonly auditLogClient: AuditLogClient,
  ) {}

  async execute(input: UpdateInvoiceCommandInput) {
    if (!input.tenantId?.trim()) {
      throw invoiceUpdateTenantMismatchError();
    }

    const existing = (await this.invoicesRepository.findById(
      input.tenantId,
      input.invoiceId,
      true,
    )) as (Invoice & { items: InvoiceItem[] }) | null;

    if (!existing) {
      throw invoiceNotFoundError();
    }

    if (existing.tenantId !== input.tenantId) {
      throw invoiceUpdateTenantMismatchError();
    }

    if (FINALIZED_STATUSES.includes(existing.status)) {
      throw cannotEditFinalizedInvoiceError();
    }

    const validation = validateUpdateInvoice(input.dto);
    if (!validation.valid) {
      throw invoiceValidationError(validation.fields);
    }

    if (input.dto.patientId && input.dto.patientId !== existing.patientId) {
      const patient = await this.patientServiceClient.getPatientForTenant(
        input.tenantId,
        input.dto.patientId,
      );
      if (!patient || patient.tenantId !== input.tenantId) {
        throw patientNotFoundError();
      }
    }

    if (input.dto.staffId) {
      const staff = await this.staffServiceClient.getStaffForTenant(
        input.tenantId,
        input.dto.staffId,
      );
      if (!staff || staff.tenantId !== input.tenantId) {
        throw staffNotFoundError();
      }
    }

    if (input.dto.appointmentId) {
      const appointment = await this.appointmentServiceClient.getAppointmentForTenant(
        input.tenantId,
        input.dto.appointmentId,
      );
      if (!appointment || appointment.tenantId !== input.tenantId) {
        throw appointmentNotFoundError();
      }
    }

    if (input.dto.status) {
      this.assertAllowedStatusTransition(existing.status, input.dto.status);
    }

    let totals:
      | ReturnType<typeof calculateInvoiceTotals>
      | null = null;

    if (input.dto.items) {
      for (const item of input.dto.items) {
        const lineSubtotal = item.quantity * item.unitPrice;
        const discount = item.discountAmount ?? 0;
        if (discount > lineSubtotal) {
          throw invalidInvoiceItemError("Discount amount cannot exceed line subtotal.");
        }
      }

      const existingItemIds = new Set(existing.items.map((item) => item.id));
      for (const item of input.dto.items) {
        if (item.id && !existingItemIds.has(item.id)) {
          throw invalidInvoiceItemError("One or more invoice items do not belong to this invoice.");
        }
      }

      totals = calculateInvoiceTotals(
        input.dto.items.map((item) => ({
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          taxRate: item.taxRate,
          discountAmount: item.discountAmount,
        })),
      );
    }

    const nextStatus = input.dto.status ?? existing.status;
    const shouldSetIssuedAt = nextStatus === "ISSUED" && existing.status === "DRAFT";

    await this.database.$transaction(async (tx) => {
      if (input.dto.items && totals) {
        const keepIds = new Set(
          input.dto.items.map((item) => item.id).filter((id): id is string => Boolean(id)),
        );
        const deleteIds = existing.items
          .filter((item) => !keepIds.has(item.id))
          .map((item) => item.id);

        if (deleteIds.length > 0) {
          await tx.invoiceItem.deleteMany({
            where: { id: { in: deleteIds }, invoiceId: input.invoiceId },
          });
        }

        for (const [index, item] of input.dto.items.entries()) {
          const lineTotal = totals.lines[index]?.lineTotal ?? item.quantity * item.unitPrice;

          if (item.id) {
            await tx.invoiceItem.update({
              where: { id: item.id },
              data: {
                description: item.description,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                taxRate: item.taxRate,
                discountAmount: item.discountAmount ?? 0,
                total: lineTotal,
              },
            });
          } else {
            await tx.invoiceItem.create({
              data: {
                id: randomString(24),
                invoiceId: input.invoiceId,
                description: item.description,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                taxRate: item.taxRate,
                discountAmount: item.discountAmount ?? 0,
                total: lineTotal,
              },
            });
          }
        }
      }

      await tx.invoice.update({
        where: { id: input.invoiceId, tenantId: input.tenantId },
        data: {
          patientId: input.dto.patientId,
          staffId:
            input.dto.staffId === undefined
              ? undefined
              : input.dto.staffId,
          appointmentId:
            input.dto.appointmentId === undefined
              ? undefined
              : input.dto.appointmentId,
          notes: input.dto.notes,
          status: input.dto.status,
          currency: input.dto.currency,
          dueDate: input.dto.dueDate ? new Date(input.dto.dueDate) : undefined,
          issuedAt: shouldSetIssuedAt ? new Date() : undefined,
          ...(totals
            ? {
                subtotal: totals.subtotal,
                tax: totals.taxTotal,
                discount: totals.discountTotal,
                total: totals.total,
              }
            : {}),
          ...(input.dto.taxRateId
            ? { taxRate: { connect: { id: input.dto.taxRateId } } }
            : {}),
          ...(input.dto.discountId
            ? { discountRef: { connect: { id: input.dto.discountId } } }
            : {}),
        },
      });
    });

    const updated = (await this.invoicesRepository.findById(
      input.tenantId,
      input.invoiceId,
      true,
    )) as (Invoice & { items: InvoiceItem[] }) | null;

    if (!updated) {
      throw invoiceNotFoundError();
    }

    await this.eventPublisher.publishInvoiceUpdated(
      {
        tenantId: input.tenantId,
        invoiceId: updated.id,
        changes: input.dto as Record<string, unknown>,
        updatedAt: updated.updatedAt.toISOString(),
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
          entityId: updated.id,
          action: "UPDATE",
          metadata: {
            invoiceId: updated.id,
            changedFields: Object.keys(input.dto),
          },
        },
        {
          ipAddress: input.actor.ipAddress,
          userAgent: input.actor.userAgent,
        },
      );
    }

    return {
      invoice: toInvoiceResponse(updated),
      items: updated.items.map(toInvoiceItemResponse),
      message: "Invoice updated successfully.",
    };
  }

  private assertAllowedStatusTransition(
    currentStatus: InvoiceStatus,
    nextStatus: "DRAFT" | "ISSUED",
  ): void {
    if (currentStatus === "DRAFT" && (nextStatus === "DRAFT" || nextStatus === "ISSUED")) {
      return;
    }

    if (currentStatus === "ISSUED" && nextStatus === "ISSUED") {
      return;
    }

    throw invoiceValidationError([
      {
        field: "status",
        message: "Invalid invoice status transition.",
      },
    ]);
  }
}
