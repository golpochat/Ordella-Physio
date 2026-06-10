import { Global, Module } from "@nestjs/common";
import { NotesEventPublisher } from "@/events/notes-event.publisher";

@Global()
@Module({
  providers: [NotesEventPublisher],
  exports: [NotesEventPublisher],
})
export class EventsModule {}
