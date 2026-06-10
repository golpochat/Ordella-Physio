import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { DatabaseModule } from "@/database/database.module";
import { EnterpriseModule } from "@/enterprise/enterprise.module";
import { configureEnterpriseMiddleware } from "@/middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    HttpModule.register({ timeout: 30000 }),
    DatabaseModule,
    EnterpriseModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    configureEnterpriseMiddleware(consumer);
  }
}
