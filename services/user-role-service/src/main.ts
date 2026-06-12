import { NestFactory } from "@nestjs/core";
import { userRoleConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "user-role-service" }));

  const port = userRoleConfig.port ?? Number(process.env.PORT ?? 3068);
  await app.listen(port);
  console.log(`User role service listening on http://localhost:${port}`);
}

bootstrap();
