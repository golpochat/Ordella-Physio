import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { BillingHealthController, InvoicesController } from "@/invoices/invoices.controller";
import { InternalBillingMetricsController } from "@/invoices/internal-billing-metrics.controller";
import { InvoicesService } from "@/invoices/invoices.service";
import { InvoiceItemsRepository, InvoicesRepository } from "@/invoices/invoices.repository";
import { CreateInvoiceCommand } from "@/invoices/commands/create-invoice.command";
import { UpdateInvoiceCommand } from "@/invoices/commands/update-invoice.command";
import { AddInvoiceItemCommand } from "@/invoices/commands/add-invoice-item.command";
import { UpdateInvoiceItemCommand } from "@/invoices/commands/update-invoice-item.command";
import { JwtStrategy } from "@/invoices/strategies/jwt.strategy";
import { JwtGuard } from "@/invoices/guards/jwt.guard";
import { EventsModule } from "@/events/events.module";
import { PatientServiceClient } from "@/integrations/patient-service.client";
import { StaffServiceClient } from "@/integrations/staff-service.client";
import { AppointmentServiceClient } from "@/integrations/appointment-service.client";
import { InvoiceListService } from "@/services/invoice-list.service";
import { InvoiceStatusService } from "@/services/invoice-status.service";
import { PaymentServiceClient } from "@/integrations/payment-service.client";
import { AuditLogClient } from "@/integrations/audit-log.client";
import { BillingMetricsService } from "@/services/billing-metrics.service";
import { BillingReportService } from "@/services/billing-report.service";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" }), EventsModule],
  controllers: [BillingHealthController, InvoicesController, InternalBillingMetricsController],
  providers: [
    InvoicesService,
    InvoicesRepository,
    InvoiceItemsRepository,
    CreateInvoiceCommand,
    UpdateInvoiceCommand,
    AddInvoiceItemCommand,
    UpdateInvoiceItemCommand,
    PatientServiceClient,
    StaffServiceClient,
    AppointmentServiceClient,
    InvoiceListService,
    InvoiceStatusService,
    PaymentServiceClient,
    AuditLogClient,
    BillingMetricsService,
    BillingReportService,
    JwtStrategy,
    JwtGuard,
  ],
  exports: [InvoicesService, InvoicesRepository, InvoiceItemsRepository, JwtGuard],
})
export class InvoicesModule {}
