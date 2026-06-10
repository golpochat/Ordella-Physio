import { NestFactory } from "@nestjs/core";
import { authConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "auth-service" }));

  const port = authConfig.port ?? Number(process.env.PORT ?? 3051);
  await app.listen(port);
  console.log(`Auth service listening on http://localhost:${port}`);
}

bootstrap();
