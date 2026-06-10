import { Module } from "@nestjs/common";
import { SoapNotesService } from "@/soap-notes/soap-notes.service";
import { SoapNotesRepository } from "@/soap-notes/soap-notes.repository";
import { EventsModule } from "@/events/events.module";

@Module({
  imports: [EventsModule],
  providers: [SoapNotesService, SoapNotesRepository],
  exports: [SoapNotesService, SoapNotesRepository],
})
export class SoapNotesModule {}
