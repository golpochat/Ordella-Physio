import { Injectable } from "@nestjs/common";
import { LedgerEntryAggregate } from "@ordella/domain";
import { randomString } from "@ordella/utils";
import type { CreateLedgerEntryDto } from "@/ledger/dto/create-ledger-entry.dto";
import { LedgerRepository } from "@/ledger/ledger.repository";
import { PaymentEventPublisher } from "@/events/payment-event.publisher";
import { DEFAULT_CURRENCY } from "@/constants";
import { toLedgerEntryListResponse, toLedgerEntryResponse } from "@/ledger/ledger.mapper";

@Injectable()
export class LedgerService {
  constructor(
    private readonly ledgerRepository: LedgerRepository,
    private readonly eventPublisher: PaymentEventPublisher,
  ) {}

  async create(tenantId: string, dto: CreateLedgerEntryDto, correlationId?: string) {
    const ledgerEntryId = randomString(24);
    const currency = dto.currency ?? DEFAULT_CURRENCY;

    const aggregateResult = LedgerEntryAggregate.create({
      id: ledgerEntryId,
      tenantId,
      type: dto.type,
      referenceId: dto.referenceId,
      amount: dto.amount,
      currency,
      description: dto.description,
      correlationId,
    });

    if (aggregateResult.isFailure) {
      throw new Error(String(aggregateResult.error));
    }

    const entry = await this.ledgerRepository.create(tenantId, {
      id: ledgerEntryId,
      type: dto.type,
      referenceId: dto.referenceId,
      amount: dto.amount,
      currency,
      description: dto.description,
    });

    await this.eventPublisher.publishLedgerEntryCreated(
      {
        tenantId,
        ledgerEntryId: entry.id,
        type: entry.type,
        referenceId: entry.referenceId,
        amount: dto.amount,
        currency: entry.currency,
        description: dto.description,
        createdAt: entry.createdAt.toISOString(),
      },
      correlationId,
    );

    return toLedgerEntryResponse(entry);
  }

  async findById(tenantId: string, ledgerEntryId: string) {
    const entry = await this.ledgerRepository.findById(tenantId, ledgerEntryId);
    return entry ? toLedgerEntryResponse(entry) : null;
  }

  async list(tenantId: string, type?: string, referenceId?: string) {
    const entries = await this.ledgerRepository.list(tenantId, {
      ...(type ? { type: type as "PAYMENT" | "REFUND" | "PAYOUT" } : {}),
      ...(referenceId ? { referenceId } : {}),
    });
    return toLedgerEntryListResponse(entries);
  }
}
