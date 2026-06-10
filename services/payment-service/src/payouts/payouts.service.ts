import { Injectable } from "@nestjs/common";
import { CreatePayoutCommand } from "@/payouts/commands/create-payout.command";
import { PayoutsRepository } from "@/payouts/payouts.repository";
import type { CreatePayoutDto } from "@/payouts/dto/create-payout.dto";

@Injectable()
export class PayoutsService {
  constructor(
    private readonly createPayoutCommand: CreatePayoutCommand,
    private readonly payoutsRepository: PayoutsRepository,
  ) {}

  create(tenantId: string, dto: CreatePayoutDto, correlationId?: string) {
    return this.createPayoutCommand.execute({ tenantId, dto, correlationId });
  }

  findById(tenantId: string, payoutId: string) {
    return this.payoutsRepository.findById(tenantId, payoutId);
  }

  list(tenantId: string, providerId?: string) {
    return this.payoutsRepository.list(tenantId, providerId);
  }
}
