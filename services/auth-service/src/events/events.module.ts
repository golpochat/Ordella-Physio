import { Module } from "@nestjs/common";
import { AuthEventPublisher } from "./auth-event.publisher";

@Module({
  providers: [AuthEventPublisher],
  exports: [AuthEventPublisher],
})
export class EventsModule {}
