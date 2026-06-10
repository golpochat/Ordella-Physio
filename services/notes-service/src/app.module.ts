import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NotesModule } from "@/notes/notes.module";
import { SoapNotesModule } from "@/soap-notes/soap-notes.module";
import { AttachmentsModule } from "@/attachments/attachments.module";
import { DatabaseModule } from "@/database/database.module";
import { EventsModule } from "@/events/events.module";
import { configureNotesMiddleware } from "@/middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    DatabaseModule,
    EventsModule,
    NotesModule,
    SoapNotesModule,
    AttachmentsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    configureNotesMiddleware(consumer);
  }
}
