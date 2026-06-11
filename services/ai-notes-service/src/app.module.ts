import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SecurityGuardsModule } from "@ordella/security";
import { AiNotesModule } from "@/ai/ai-notes.module";
import { DatabaseModule } from "@/database/database.module";
import { configureAiNotesMiddleware } from "@/middleware";

@Module({
  imports: [
    SecurityGuardsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    DatabaseModule,
    AiNotesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    configureAiNotesMiddleware(consumer);
  }
}
