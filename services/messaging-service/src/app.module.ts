import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SecurityGuardsModule } from "@ordella/security";
import { DatabaseModule } from "@/database/database.module";
import { EventsModule } from "@/events/events.module";
import { MessagingModule } from "@/messaging/messaging.module";
import { configureMessagingMiddleware } from "@/middleware";

@Module({
  imports: [
    SecurityGuardsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    DatabaseModule,
    EventsModule,
    MessagingModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    configureMessagingMiddleware(consumer);
  }
}
