import { Module } from "@nestjs/common";
import { TaxRatesController } from "@/tax-rates/tax-rates.controller";
import { TaxRatesService } from "@/tax-rates/tax-rates.service";
import { TaxRatesRepository } from "@/tax-rates/tax-rates.repository";
import { EventsModule } from "@/events/events.module";
import { InvoicesModule } from "@/invoices/invoices.module";

@Module({
  imports: [EventsModule, InvoicesModule],
  controllers: [TaxRatesController],
  providers: [TaxRatesService, TaxRatesRepository],
  exports: [TaxRatesService, TaxRatesRepository],
})
export class TaxRatesModule {}
