import { Module } from "@nestjs/common";
import { EventSubscriber } from "@/subscribers/event.subscriber";
import { RetrySubscriber } from "@/subscribers/retry.subscriber";
import { DeadLetterSubscriber } from "@/subscribers/dead-letter.subscriber";
import { SchemasModule } from "@/schemas/schemas.module";
import { DeadLetterModule } from "@/dead-letter/dead-letter.module";

@Module({
  imports: [SchemasModule, DeadLetterModule],
  providers: [EventSubscriber, RetrySubscriber, DeadLetterSubscriber],
  exports: [EventSubscriber, RetrySubscriber, DeadLetterSubscriber],
})
export class SubscribersModule {}
