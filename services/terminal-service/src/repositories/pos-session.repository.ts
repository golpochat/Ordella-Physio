import { Injectable } from "@nestjs/common";
import type { PosPaymentStatus, PosSession, PosSessionStatus, Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class PosSessionRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: {
    tenantId: string;
    terminalId: string;
    operatorId: string;
    openingCash?: number;
  }): Promise<PosSession> {
    return this.database.posSession.create({
      data: {
        tenantId: data.tenantId,
        terminalId: data.terminalId,
        operatorId: data.operatorId,
        openingCash: data.openingCash ?? 0,
      },
      include: { items: true, payments: true },
    });
  }

  findById(tenantId: string, id: string) {
    return this.database.posSession.findFirst({
      where: { id, tenantId },
      include: { items: true, payments: true, terminal: true },
    });
  }

  findOpenByTerminal(tenantId: string, terminalId: string) {
    return this.database.posSession.findFirst({
      where: { tenantId, terminalId, status: "OPEN" },
      include: { items: true, payments: true },
    });
  }

  list(tenantId: string, filters: { terminalId?: string; status?: PosSessionStatus }) {
    const where: Prisma.PosSessionWhereInput = { tenantId };
    if (filters.terminalId) where.terminalId = filters.terminalId;
    if (filters.status) where.status = filters.status;

    return this.database.posSession.findMany({
      where,
      include: { items: true, payments: true },
      orderBy: { openedAt: "desc" },
    });
  }

  addItem(sessionId: string, item: { description: string; quantity: number; unitPrice: number }) {
    return this.database.posSessionItem.create({
      data: { sessionId, ...item },
    });
  }

  closeSession(
    id: string,
    data: { closingCash: number; expectedTotal: number; actualTotal: number },
  ) {
    return this.database.posSession.update({
      where: { id },
      data: {
        status: "CLOSED",
        closingCash: data.closingCash,
        expectedTotal: data.expectedTotal,
        actualTotal: data.actualTotal,
        closedAt: new Date(),
      },
      include: { items: true, payments: true },
    });
  }

  reconcileSession(id: string, variance: number) {
    return this.database.posSession.update({
      where: { id },
      data: {
        status: "RECONCILED",
        variance,
        reconciledAt: new Date(),
      },
      include: { items: true, payments: true },
    });
  }

  createPayment(data: {
    sessionId: string;
    amount: number;
    currency?: string;
    stripeIntentId?: string;
    paymentIntentId?: string;
    status?: PosPaymentStatus;
  }) {
    return this.database.posPayment.create({ data });
  }

  updatePaymentStatus(id: string, status: PosPaymentStatus, stripeIntentId?: string) {
    return this.database.posPayment.update({
      where: { id },
      data: {
        status,
        ...(stripeIntentId ? { stripeIntentId } : {}),
      },
    });
  }
}
