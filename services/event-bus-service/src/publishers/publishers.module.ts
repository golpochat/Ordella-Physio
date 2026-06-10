import { Module } from "@nestjs/common";
import { EventPublisher } from "@/publishers/event.publisher";
import { AuditPublisher } from "@/publishers/audit.publisher";

@Module({
  providers: [EventPublisher, AuditPublisher],
  exports: [EventPublisher, AuditPublisher],
})
export class PublishersModule {}
