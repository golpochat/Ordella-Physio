import { Module } from "@nestjs/common";
import { LedgerController } from "@/ledger/ledger.controller";
import { LedgerService } from "@/ledger/ledger.service";
import { LedgerRepository } from "@/ledger/ledger.repository";
import { PaymentIntentsModule } from "@/payment-intents/payment-intents.module";
import { EventsModule } from "@/events/events.module";

@Module({
  imports: [PaymentIntentsModule, EventsModule],
  controllers: [LedgerController],
  providers: [LedgerService, LedgerRepository],
  exports: [LedgerService, LedgerRepository],
})
export class LedgerModule {}
