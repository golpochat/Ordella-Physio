import { Module } from "@nestjs/common";
import { DeadLetterService } from "@/dead-letter/dead-letter.service";
import { DeadLetterRepository } from "@/dead-letter/dead-letter.repository";
import { DeadLetterController } from "@/dead-letter/dead-letter.controller";
import { PublishersModule } from "@/publishers/publishers.module";

@Module({
  imports: [PublishersModule],
  controllers: [DeadLetterController],
  providers: [DeadLetterService, DeadLetterRepository],
  exports: [DeadLetterService, DeadLetterRepository],
})
export class DeadLetterModule {}
