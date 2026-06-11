import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SecurityGuardsModule } from "@ordella/security";
import { AuthModule } from "@/auth/auth.module";
import { DatabaseModule } from "@/database/database.module";
import { EventsModule } from "@/events/events.module";
import { configureAuthMiddleware } from "@/middleware";
import { AuthJwtPreflightMiddleware } from "@/middleware/jwt-preflight.middleware";
import { AuditContextMiddleware } from "@/middleware/audit.middleware";

@Module({
  providers: [AuthJwtPreflightMiddleware, AuditContextMiddleware],
  imports: [
    SecurityGuardsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    DatabaseModule,
    EventsModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    configureAuthMiddleware(consumer);
  }
}
