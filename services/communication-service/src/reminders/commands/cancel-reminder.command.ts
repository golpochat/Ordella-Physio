import { Injectable } from "@nestjs/common";
import type { CancelReminderDto } from "@/reminders/dto/cancel-reminder.dto";
import { RemindersRepository } from "@/reminders/reminders.repository";
import { CommunicationEventPublisher } from "@/events/communication-event.publisher";
import { toReminderResponse } from "@/reminders/reminders.mapper";

export type CancelReminderCommandInput = {
  tenantId: string;
  reminderId: string;
  dto: CancelReminderDto;
  correlationId?: string;
};

@Injectable()
export class CancelReminderCommand {
  constructor(
    private readonly remindersRepository: RemindersRepository,
    private readonly eventPublisher: CommunicationEventPublisher,
  ) {}

  async execute(input: CancelReminderCommandInput) {
    const reminder = await this.remindersRepository.findById(input.tenantId, input.reminderId);

    if (!reminder) {
      throw new Error("Reminder not found");
    }

    const updated = await this.remindersRepository.update(input.tenantId, reminder.id, {
      status: "CANCELLED",
    });

    await this.eventPublisher.publishReminderCancelled(
      {
        tenantId: input.tenantId,
        reminderId: updated.id,
        reason: input.dto.reason,
        cancelledAt: updated.updatedAt.toISOString(),
      },
      input.correlationId,
    );

    return toReminderResponse(updated);
  }
}
