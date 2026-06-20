import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PaymentServiceClient } from "@/integrations/payment-service.client";
import { PosSessionRepository } from "@/repositories/pos-session.repository";
import { TerminalRepository } from "@/repositories/terminal.repository";
import type { AuthenticatedTerminalUser } from "@/utils/terminal-helpers";
import { terminalNotFoundError, terminalTenantMismatchError } from "@/utils/terminal-errors";

type OpenSessionPayload = {
  terminalId: string;
  openingCash?: number;
};

type AddItemPayload = {
  description: string;
  quantity: number;
  unitPrice: number;
};

type CloseSessionPayload = {
  closingCash: number;
};

type ReconcilePayload = {
  actualTotal: number;
};

@Injectable()
export class PosSessionService {
  constructor(
    private readonly posSessionRepository: PosSessionRepository,
    private readonly terminalRepository: TerminalRepository,
    private readonly paymentClient: PaymentServiceClient,
  ) {}

  async openSession(tenantId: string, user: AuthenticatedTerminalUser, payload: OpenSessionPayload) {
    await this.requireTerminal(payload.terminalId, user);

    const existing = await this.posSessionRepository.findOpenByTerminal(tenantId, payload.terminalId);
    if (existing) {
      throw new BadRequestException("Terminal already has an open session");
    }

    return this.posSessionRepository.create({
      tenantId,
      terminalId: payload.terminalId,
      operatorId: user.userId,
      openingCash: payload.openingCash ?? 0,
    });
  }

  async getSession(tenantId: string, sessionId: string, user: AuthenticatedTerminalUser) {
    const session = await this.posSessionRepository.findById(tenantId, sessionId);
    if (!session) {
      throw new NotFoundException("POS session not found");
    }
    if (session.terminal.tenantId !== user.tenantId) {
      throw terminalTenantMismatchError();
    }
    return session;
  }

  async listSessions(
    tenantId: string,
    user: AuthenticatedTerminalUser,
    filters: { terminalId?: string; status?: "OPEN" | "CLOSED" | "RECONCILED" },
  ) {
    if (user.tenantId !== tenantId) {
      throw terminalTenantMismatchError();
    }
    return this.posSessionRepository.list(tenantId, filters);
  }

  async addItem(
    tenantId: string,
    sessionId: string,
    user: AuthenticatedTerminalUser,
    payload: AddItemPayload,
  ) {
    const session = await this.getOpenSession(tenantId, sessionId, user);
    return this.posSessionRepository.addItem(session.id, payload);
  }

  async createPaymentIntent(
    tenantId: string,
    sessionId: string,
    user: AuthenticatedTerminalUser,
    authHeader?: string,
  ) {
    const session = await this.getOpenSession(tenantId, sessionId, user);
    const subtotal = session.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    );
    if (subtotal <= 0) {
      throw new BadRequestException("Cart is empty");
    }

    const intent = await this.paymentClient.createPaymentIntent(
      {
        tenantId,
        amount: subtotal,
        currency: "usd",
        metadata: { sessionId: session.id },
      },
      authHeader,
    );

    const payment = await this.posSessionRepository.createPayment({
      sessionId: session.id,
      amount: subtotal,
      paymentIntentId: intent.id,
      stripeIntentId: intent.stripeIntentId,
      status: "PENDING",
    });

    return { payment, clientSecret: intent.clientSecret };
  }

  async closeSession(
    tenantId: string,
    sessionId: string,
    user: AuthenticatedTerminalUser,
    payload: CloseSessionPayload,
  ) {
    const session = await this.getOpenSession(tenantId, sessionId, user);
    const expectedTotal =
      session.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) +
      session.openingCash;
    const paidTotal = session.payments
      .filter((payment) => payment.status === "SUCCEEDED")
      .reduce((sum, payment) => sum + payment.amount, 0);

    return this.posSessionRepository.closeSession(session.id, {
      closingCash: payload.closingCash,
      expectedTotal,
      actualTotal: paidTotal + payload.closingCash,
    });
  }

  async reconcileSession(
    tenantId: string,
    sessionId: string,
    user: AuthenticatedTerminalUser,
    payload: ReconcilePayload,
  ) {
    const session = await this.posSessionRepository.findById(tenantId, sessionId);
    if (!session) {
      throw new NotFoundException("POS session not found");
    }
    if (session.status !== "CLOSED") {
      throw new BadRequestException("Session must be closed before reconciliation");
    }

    const variance = payload.actualTotal - (session.expectedTotal ?? 0);
    return this.posSessionRepository.reconcileSession(session.id, variance);
  }

  private async getOpenSession(tenantId: string, sessionId: string, user: AuthenticatedTerminalUser) {
    const session = await this.getSession(tenantId, sessionId, user);
    if (session.status !== "OPEN") {
      throw new BadRequestException("Session is not open");
    }
    return session;
  }

  private async requireTerminal(id: string, user: AuthenticatedTerminalUser) {
    const terminal = await this.terminalRepository.findById(id);
    if (!terminal) {
      throw terminalNotFoundError();
    }
    if (terminal.tenantId !== user.tenantId) {
      throw terminalTenantMismatchError();
    }
    return terminal;
  }
}
