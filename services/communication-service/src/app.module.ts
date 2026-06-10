import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NotificationsModule } from "@/notifications/notifications.module";
import { RemindersModule } from "@/reminders/reminders.module";
import { TemplatesModule } from "@/templates/templates.module";
import { QueueModule } from "@/queue/queue.module";
import { DatabaseModule } from "@/database/database.module";
import { EventsModule } from "@/events/events.module";
import { configureCommunicationMiddleware } from "@/middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    DatabaseModule,
    EventsModule,
    QueueModule,
    NotificationsModule,
    RemindersModule,
    TemplatesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    configureCommunicationMiddleware(consumer);
  }
}
