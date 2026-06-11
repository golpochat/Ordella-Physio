import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SecurityGuardsModule } from "@ordella/security";
import { DatabaseModule } from "@/database/database.module";
import { OrganizationModule } from "@/organization.module";
import { configureOrganizationMiddleware } from "@/middleware";

@Module({
  imports: [
    SecurityGuardsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    DatabaseModule,
    OrganizationModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    configureOrganizationMiddleware(consumer);
  }
}
