import { Injectable } from "@nestjs/common";
import { EventPublisher } from "@/publishers/event.publisher";
import {
  DeadLetterRepository,
  type CreateDeadLetterInput,
  type ListDeadLetterFilter,
} from "@/dead-letter/dead-letter.repository";
import { stripSubjectPrefix } from "@/utils/event-helpers";

@Injectable()
export class DeadLetterService {
  constructor(
    private readonly deadLetterRepository: DeadLetterRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  store(input: CreateDeadLetterInput) {
    return this.deadLetterRepository.create(input);
  }

  list(filter: ListDeadLetterFilter) {
    return this.deadLetterRepository.list(filter);
  }

  async retry(id: string) {
    const record = this.deadLetterRepository.findById(id);
    if (!record) {
      return null;
    }

    const eventName = stripSubjectPrefix(record.subject);
    await this.eventPublisher.publishDomainEvent(
      eventName,
      record.payload,
      { tenantId: record.tenantId },
    );

    return this.deadLetterRepository.markRetried(id);
  }
}
