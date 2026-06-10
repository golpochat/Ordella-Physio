import { Injectable } from "@nestjs/common";
import { CreateReminderCommand } from "@/reminders/commands/create-reminder.command";
import { CancelReminderCommand } from "@/reminders/commands/cancel-reminder.command";
import { RemindersRepository } from "@/reminders/reminders.repository";
import type { CreateReminderDto } from "@/reminders/dto/create-reminder.dto";
import type { CancelReminderDto } from "@/reminders/dto/cancel-reminder.dto";
import { toReminderListResponse, toReminderResponse } from "@/reminders/reminders.mapper";

@Injectable()
export class RemindersService {
  constructor(
    private readonly createReminderCommand: CreateReminderCommand,
    private readonly cancelReminderCommand: CancelReminderCommand,
    private readonly remindersRepository: RemindersRepository,
  ) {}

  create(tenantId: string, dto: CreateReminderDto, correlationId?: string) {
    return this.createReminderCommand.execute({ tenantId, dto, correlationId });
  }

  cancel(tenantId: string, reminderId: string, dto: CancelReminderDto, correlationId?: string) {
    return this.cancelReminderCommand.execute({ tenantId, reminderId, dto, correlationId });
  }

  async findById(tenantId: string, reminderId: string) {
    const reminder = await this.remindersRepository.findById(tenantId, reminderId);
    return reminder ? toReminderResponse(reminder) : null;
  }

  async list(tenantId: string, type?: string) {
    const reminders = await this.remindersRepository.list(
      tenantId,
      type ? { type: type as never } : {},
    );
    return toReminderListResponse(reminders);
  }
}
