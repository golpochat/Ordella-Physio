import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NatsModule } from "@/nats/nats.module";
import { StreamsModule } from "@/streams/streams.module";
import { PublishersModule } from "@/publishers/publishers.module";
import { SubscribersModule } from "@/subscribers/subscribers.module";
import { SchemasModule } from "@/schemas/schemas.module";
import { ReplayModule } from "@/replay/replay.module";
import { DeadLetterModule } from "@/dead-letter/dead-letter.module";
import { configureEventBusMiddleware } from "@/middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    NatsModule,
    StreamsModule,
    SchemasModule,
    PublishersModule,
    DeadLetterModule,
    SubscribersModule,
    ReplayModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    configureEventBusMiddleware(consumer);
  }
}
