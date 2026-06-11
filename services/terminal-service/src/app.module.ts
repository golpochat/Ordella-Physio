import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SecurityGuardsModule } from "@ordella/security";
import { DatabaseModule } from "@/database/database.module";
import { TerminalModule } from "@/terminal.module";
import { configureTerminalMiddleware } from "@/middleware";

@Module({
  imports: [
    SecurityGuardsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    DatabaseModule,
    TerminalModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    configureTerminalMiddleware(consumer);
  }
}
