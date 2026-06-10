import { Injectable } from "@nestjs/common";
import { ReminderAggregate } from "@ordella/domain";
import { randomString } from "@ordella/utils";
import type { CreateReminderDto } from "@/reminders/dto/create-reminder.dto";
import { RemindersRepository } from "@/reminders/reminders.repository";
import { CommunicationEventPublisher } from "@/events/communication-event.publisher";
import { QueueService } from "@/queue/queue.module";
import { toReminderResponse } from "@/reminders/reminders.mapper";

export type CreateReminderCommandInput = {
  tenantId: string;
  dto: CreateReminderDto;
  correlationId?: string;
};

@Injectable()
export class CreateReminderCommand {
  constructor(
    private readonly remindersRepository: RemindersRepository,
    private readonly eventPublisher: CommunicationEventPublisher,
    private readonly queueService: QueueService,
  ) {}

  async execute(input: CreateReminderCommandInput) {
    const reminderId = randomString(24);

    const aggregateResult = ReminderAggregate.create({
      id: reminderId,
      tenantId: input.tenantId,
      type: input.dto.type,
      channel: input.dto.channel,
      to: input.dto.to,
      message: input.dto.message,
      sendAt: input.dto.sendAt,
      recurring: input.dto.recurring,
      correlationId: input.correlationId,
    });

    if (aggregateResult.isFailure) {
      throw new Error(String(aggregateResult.error));
    }

    const reminder = await this.remindersRepository.create(input.tenantId, {
      id: reminderId,
      type: input.dto.type,
      channel: input.dto.channel,
      patientId: input.dto.patientId,
      appointmentId: input.dto.appointmentId,
      paymentId: input.dto.paymentId,
      to: input.dto.to,
      subject: input.dto.subject,
      message: input.dto.message,
      sendAt: new Date(input.dto.sendAt),
      recurring: input.dto.recurring ?? false,
      status: "SCHEDULED",
    });

    const delayMs = Math.max(new Date(input.dto.sendAt).getTime() - Date.now(), 0);
    const job = await this.queueService.enqueueReminder(
      {
        tenantId: input.tenantId,
        reminderId: reminder.id,
        channel: reminder.channel,
        to: reminder.to,
        message: reminder.message,
      },
      delayMs,
    );

    await this.remindersRepository.update(input.tenantId, reminder.id, {
      jobId: String(job.id),
    });

    await this.eventPublisher.publishReminderCreated(
      {
        tenantId: input.tenantId,
        reminderId: reminder.id,
        type: reminder.type,
        channel: reminder.channel,
        sendAt: reminder.sendAt.toISOString(),
        createdAt: reminder.createdAt.toISOString(),
      },
      input.correlationId,
    );

    return toReminderResponse(reminder);
  }
}
