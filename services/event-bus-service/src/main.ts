import { NestFactory } from "@nestjs/core";
import { eventBusConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "event-bus-service" }));

  const port = eventBusConfig.port ?? Number(process.env.PORT ?? 3060);
  await app.listen(port);
  console.log(`Event bus service listening on http://localhost:${port}`);
}

bootstrap();
