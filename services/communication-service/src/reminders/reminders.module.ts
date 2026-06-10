import { Module } from "@nestjs/common";
import { RemindersController } from "@/reminders/reminders.controller";
import { RemindersService } from "@/reminders/reminders.service";
import { RemindersRepository } from "@/reminders/reminders.repository";
import { CreateReminderCommand } from "@/reminders/commands/create-reminder.command";
import { CancelReminderCommand } from "@/reminders/commands/cancel-reminder.command";
import { NotificationsModule } from "@/notifications/notifications.module";
import { EventsModule } from "@/events/events.module";
import { QueueModule } from "@/queue/queue.module";

@Module({
  imports: [NotificationsModule, EventsModule, QueueModule],
  controllers: [RemindersController],
  providers: [
    RemindersService,
    RemindersRepository,
    CreateReminderCommand,
    CancelReminderCommand,
  ],
  exports: [RemindersService, RemindersRepository],
})
export class RemindersModule {}
