import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { BillingHealthController, InvoicesController } from "@/invoices/invoices.controller";
import { InvoicesService } from "@/invoices/invoices.service";
import { InvoiceItemsRepository, InvoicesRepository } from "@/invoices/invoices.repository";
import { CreateInvoiceCommand } from "@/invoices/commands/create-invoice.command";
import { UpdateInvoiceCommand } from "@/invoices/commands/update-invoice.command";
import { AddInvoiceItemCommand } from "@/invoices/commands/add-invoice-item.command";
import { UpdateInvoiceItemCommand } from "@/invoices/commands/update-invoice-item.command";
import { JwtStrategy } from "@/invoices/strategies/jwt.strategy";
import { JwtGuard } from "@/invoices/guards/jwt.guard";
import { EventsModule } from "@/events/events.module";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" }), EventsModule],
  controllers: [BillingHealthController, InvoicesController],
  providers: [
    InvoicesService,
    InvoicesRepository,
    InvoiceItemsRepository,
    CreateInvoiceCommand,
    UpdateInvoiceCommand,
    AddInvoiceItemCommand,
    UpdateInvoiceItemCommand,
    JwtStrategy,
    JwtGuard,
  ],
  exports: [InvoicesService, InvoicesRepository, InvoiceItemsRepository, JwtGuard],
})
export class InvoicesModule {}
