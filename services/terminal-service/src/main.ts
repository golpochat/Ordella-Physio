import { NestFactory } from "@nestjs/core";
import { terminalConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "terminal-service" }));

  const port = terminalConfig.port ?? Number(process.env.PORT ?? 3067);
  await app.listen(port);
  console.log(`Terminal service listening on http://localhost:${port}`);
}

bootstrap();
