import { Module } from "@nestjs/common";
import { DiscountsController } from "@/discounts/discounts.controller";
import { DiscountsService } from "@/discounts/discounts.service";
import { DiscountsRepository } from "@/discounts/discounts.repository";
import { InvoicesModule } from "@/invoices/invoices.module";

@Module({
  imports: [InvoicesModule],
  controllers: [DiscountsController],
  providers: [DiscountsService, DiscountsRepository],
  exports: [DiscountsService, DiscountsRepository],
})
export class DiscountsModule {}
