import { Module } from "@nestjs/common";
import { IngestionService } from "@/ingestion/ingestion.service";
import { IngestionRepository } from "@/ingestion/ingestion.repository";
import { AppointmentEventsHandler } from "@/ingestion/handlers/appointment-events.handler";
import { BillingEventsHandler } from "@/ingestion/handlers/billing-events.handler";
import { PaymentEventsHandler } from "@/ingestion/handlers/payment-events.handler";
import { NotesEventsHandler } from "@/ingestion/handlers/notes-events.handler";
import { PatientEventsHandler } from "@/ingestion/handlers/patient-events.handler";
import { EventsModule } from "@/events/events.module";

@Module({
  imports: [EventsModule],
  providers: [
    IngestionService,
    IngestionRepository,
    AppointmentEventsHandler,
    BillingEventsHandler,
    PaymentEventsHandler,
    NotesEventsHandler,
    PatientEventsHandler,
  ],
  exports: [IngestionService, IngestionRepository],
})
export class IngestionModule {}
